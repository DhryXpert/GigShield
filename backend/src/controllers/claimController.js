const { Claim, Policy, Rider, Zone, Transaction } = require('../models');

// Step 9: Claims & Fraud Management
exports.triggerDisruption = async (req, res) => {
  try {
    const { zoneId, eventType } = req.body; 

    // Find the zone
    const targetZone = await Zone.findById(zoneId);
    if (!targetZone) return res.status(404).json({ success: false, error: 'Zone not found' });

    // Step 9 Fraud Engine Check:
    const activePolicies = await Policy.find({ zone: zoneId, status: 'active' });

    let processedClaims = [];
    
    // Auto-approve and generate payouts for everyone in the affected zone
    for (let policy of activePolicies) {
      // 1. Create auto-approved claim
      const newClaim = await Claim.create({
        rider: policy.rider,
        policy: policy._id,
        claimType: 'PARAMETRIC',
        triggerEvent: eventType,
        claimedAmount: policy.coverageAmount,
        approvedAmount: policy.coverageAmount, 
        status: 'approved',
        fraudScore: 0, 
        aiAnalysisReason: `Auto-Approved: Simulated ${eventType} confirmed in ${targetZone.name}`
      });

      // 2. Create Transaction Record with CORRECT Enum values
      await Transaction.create({
        rider: policy.rider,
        claim: newClaim._id,
        policy: policy._id,
        amount: policy.coverageAmount,
        type: 'CLAIM_PAYOUT',
        status: 'SUCCESS',
        method: 'UPI',
        description: `Parametric payout for ${eventType} in ${targetZone.name}`
      });

      // 3. Mark policy as claimed
      policy.status = 'claimed';
      await policy.save();

      processedClaims.push({ riderId: policy.rider, claimId: newClaim._id, amount: policy.coverageAmount });
    }

    res.status(200).json({
      success: true,
      message: `Disruption simulated. Processed ${processedClaims.length} automatic payouts.`,
      zonesAffected: targetZone.name,
      payouts: processedClaims
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
