const { Rider, Zone } = require('../models');

/**
 * @desc    Update Rider Profile / Complete Onboarding
 * @route   PUT /api/riders/profile
 * @access  Private
 */
const updateProfile = async (req, res) => {
  try {
    const { name, city, primaryZone, averageWeeklyEarnings, vehicleType } = req.body;

    // Validate required fields
    if (!name || !city || !primaryZone || !averageWeeklyEarnings) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide all required fields (Name, City, Zone, Earnings)' 
      });
    }

    // Verify zone exists
    const zoneExists = await Zone.findById(primaryZone);
    if (!zoneExists) {
      return res.status(404).json({ success: false, error: 'Selected Delivery Zone not found' });
    }

    // Baseline Income Stability Score for a new rider is 75
    const baselineISS = 75;

    // Update the rider Document
    const rider = await Rider.findByIdAndUpdate(
      req.rider._id,
      {
        name,
        city,
        zone: primaryZone,
        weeklyEarningsEstimate: Number(averageWeeklyEarnings),
        isOnboarded: true,
        issScore: baselineISS, // Initialize ISS
      },
      { new: true, runValidators: true }
    ).select('-otp -otpExpiresAt'); // Exclude sensitive details

    if (!rider) {
      return res.status(404).json({ success: false, error: 'Rider not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated and onboarding complete',
      data: rider
    });

  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ success: false, error: 'Server Error during profile update' });
  }
};

/**
 * @desc    Get Rider Profile Stats (Dashboard data)
 * @route   GET /api/riders/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
  try {
    // Populate the primary zone nicely
    const rider = await Rider.findById(req.rider._id)
      .populate('zone', 'name city riskLevel riskMultiplier boundary')
      .select('-otp -otpExpiresAt');

    if (!rider) {
      return res.status(404).json({ success: false, error: 'Rider not found' });
    }

    // Map `zone` back to `primaryZone` for frontend compatibility if needed, 
    // but our frontend expects `primaryZone`. We'll just append it to response.
    const responseData = rider.toObject();
    responseData.primaryZone = responseData.zone;

    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ success: false, error: 'Server Error fetching profile' });
  }
};

module.exports = {
  updateProfile,
  getProfile
};
