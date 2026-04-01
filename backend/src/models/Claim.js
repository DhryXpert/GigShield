const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider', required: true },
    policy: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
    claimType: { type: String, enum: ['PARAMETRIC', 'MANUAL'], default: 'PARAMETRIC' },
    triggerEvent: { type: String, required: true },
    claimedAmount: { type: Number, required: true },
    approvedAmount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'paid', 'fraud-detected'],
      default: 'pending',
    },
    fraudScore: { type: Number, default: 0 },
    aiAnalysisReason: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Claim', claimSchema);
