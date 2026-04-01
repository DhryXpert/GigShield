const { Claim, Policy, Rider, Zone } = require('../models');

// Step 9: Claims & Fraud Management
exports.triggerDisruption = async (req, res) => {
  try {
    const { zoneId, eventType } = req.body; // e.g., 'Heavy Rain', 'Traffic Strike'

    // Find the zone
    const targetZone = await Zone.findById(zoneId);
    if (!targetZone) return res.status(404).json({ success: false, error: 'Zone not found' });

    // Step 9 Fraud Engine Check:
    // Only pay active policies in THIS specific affected zone.
    // If a rider claims they were affected but their primary zone isn't this one, it's rejected by inherently filtering by zone!
    const activePolicies = await Policy.find({ zone: zoneId, status: 'active' });

    let processedClaims = [];
    
    // Auto-approve and generate payouts for everyone in the "strike zone"
    for (let policy of activePolicies) {
      // Create auto-approved claim
      const newClaim = await Claim.create({
        rider: policy.rider,
        policy: policy._id,
        claimType: 'PARAMETRIC',
        triggerEvent: eventType,
        claimedAmount: policy.coverageAmount,
        approvedAmount: policy.coverageAmount, // Instant 100% approval
        status: 'approved',
        fraudScore: 0, // Genuine, auto-triggered
        aiAnalysisReason: `Auto-Approved: Simulated ${eventType} confirmed in ${targetZone.name}`
      });

      // Mark policy as claimed so they don't double dip
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
