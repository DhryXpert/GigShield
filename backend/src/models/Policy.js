const mongoose = require('mongoose');

const policySchema = new mongoose.Schema(
  {
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider', required: true },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
    premiumAmount: { type: Number, required: true },
    coverageAmount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['active', 'expired', 'claimed', 'canceled'],
      default: 'active',
    },
  },
  { timestamps: true }
);

policySchema.index({ rider: 1, status: 1 });
policySchema.index({ zone: 1, status: 1 });

module.exports = mongoose.model('Policy', policySchema);
