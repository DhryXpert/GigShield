const { Rider } = require('../models');
const { generateToken } = require('../utils/jwtUtils');

/**
 * @desc    Send OTP to phone number (Simulated)
 * @route   POST /api/auth/send-otp
 * @access  Public
 */
const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || !phone.match(/^[6-9]\d{9}$/)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid 10-digit Indian phone number' });
    }

    // Check if rider exists, if not create a stub
    let rider = await Rider.findOne({ phone });
    if (!rider) {
      rider = await Rider.create({
        phone,
        name: 'New Rider', // Default stub name until onboarding
        isActive: true,
      });
    }

    // Generate a 6-digit OTP (Mock approach for hackathon: any 6 digits work, but let's do a hardcoded 123456 or randomly generate)
    // For demo stability, we'll generate it but also log it. Even better: make '123456' the default test OTP for the hackathon.
    const otp = '123456'; 
    const isProd = process.env.NODE_ENV === 'production';
    const actualOtp = isProd ? Math.floor(100000 + Math.random() * 900000).toString() : otp;

    rider.otp = actualOtp;
    // OTP expires in 10 minutes
    rider.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
    await rider.save();

    // In a real app, integrate Twilio/MessageBird here
    console.log(`📱 [SMS MOCK] Sent OTP ${actualOtp} to +91 ${phone}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      isNewUser: !rider.isOnboarded, // Help frontend decide where to redirect later
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ success: false, error: 'Failed to send OTP' });
  }
};

/**
 * @desc    Verify OTP and return JWT
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, error: 'Please provide phone and OTP' });
    }

    const rider = await Rider.findOne({ phone });

    if (!rider) {
      return res.status(404).json({ success: false, error: 'Rider not found' });
    }

    // Check if OTP matches and is not expired
    if (rider.otp !== otp) {
      return res.status(401).json({ success: false, error: 'Invalid OTP' });
    }

    if (rider.otpExpiresAt < new Date()) {
      return res.status(401).json({ success: false, error: 'OTP has expired. Please request a new one.' });
    }

    // Clear OTP upon successful login
    rider.otp = undefined;
    rider.otpExpiresAt = undefined;
    await rider.save();

    // Generate token
    const token = generateToken(rider._id);

    // Set JWT in HttpOnly Cookie
    res.cookie('gigshield_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      success: true,
      rider: {
        id: rider._id,
        name: rider.name,
        phone: rider.phone,
        isOnboarded: rider.isOnboarded,
        issScore: rider.issScore,
      },
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ success: false, error: 'Failed to verify OTP' });
  }
};

/**
 * @desc    Get current logged in rider profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res) => {
  try {
    // req.rider is set by the protect middleware
    res.status(200).json({
      success: true,
      data: req.rider,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error retrieving profile' });
  }
};

/**
 * @desc    Logout user / clear cookie
 * @route   POST /api/auth/logout
 * @access  Public
 */
const logout = (req, res) => {
  res.cookie('gigshield_token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: 'User logged out successfully' });
};

module.exports = {
  sendOtp,
  verifyOtp,
  getMe,
  logout
};
