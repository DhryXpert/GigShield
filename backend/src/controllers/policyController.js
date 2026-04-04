const { Policy, Rider, Zone, Claim, Transaction } = require('../models');

// Step 7: Dynamic Premium Calculation 
exports.getQuote = async (req, res) => {
  try {
    const rider = await Rider.findById(req.rider._id).populate('zone');
    if (!rider || !rider.zone) return res.status(400).json({ success: false, error: 'Rider or active zone not found.' });

    // Base Calculation Logic
    const basePremium = 50; 
    
    let issMultiplier = 1.0;
    if (rider.issScore >= 80) issMultiplier = 0.85; 
    else if (rider.issScore < 50) issMultiplier = 1.20; 

    const riskMultiplier = rider.zone.riskMultiplier || 1.0;

    const finalPremium = Math.round(basePremium * issMultiplier * riskMultiplier);
    const coverageAmount = rider.weeklyEarningsEstimate || 4000;

    res.status(200).json({
      success: true,
      data: { premium: finalPremium, coverage: coverageAmount, validUntil: new Date(Date.now() + 86400000) }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Step 8: Insurance Policy Management (Checkout)
exports.purchasePolicy = async (req, res) => {
  try {
    const { premium, coverage } = req.body;
    const rider = await Rider.findById(req.rider._id);

    // Expire existing policies
    await Policy.updateMany({ rider: rider._id, status: 'active' }, { status: 'expired' });

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); 

    const newPolicy = await Policy.create({
      rider: rider._id,
      zone: rider.zone,
      premiumAmount: premium,
      coverageAmount: coverage,
      startDate,
      endDate,
      status: 'active'
    });

    // Create Transaction Record for the premium payment
    await Transaction.create({
      rider: rider._id,
      policy: newPolicy._id,
      amount: premium,
      type: 'PREMIUM_PAYMENT',
      status: 'SUCCESS',
      method: 'MOCK',
      description: `Weekly premium for ${rider.zone ? 'active zone' : 'selected coverage'}`
    });

    res.status(201).json({ success: true, data: newPolicy });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getActivePolicy = async (req, res) => {
  try {
    const policy = await Policy.findOne({ rider: req.rider._id, status: 'active' });
    res.status(200).json({ success: true, data: policy });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
