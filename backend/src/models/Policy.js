const mongoose = require('mongoose');

const policySchema = new mongoose.Schema(
  {
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider',
      required: true,
    },
    // Weekly policy period
    weekStart: {
      type: Date,
      required: true,
    },
    weekEnd: {
      type: Date,
      required: true,
    },
    // Pricing
    premium: {
      type: Number,
      required: true,
      min: 0,
    },
    premiumBreakdown: {
      basePremium: { type: Number, default: 25 },
      riskMultiplier: { type: Number, default: 1.0 },
      zoneMultiplier: { type: Number, default: 1.0 },
      issDiscount: { type: Number, default: 1.0 },
    },
    coverageCap: {
      type: Number,
      required: true,
      // ₹800 / ₹1200 / ₹1800
    },
    coverageUsed: {
      type: Number,
      default: 0,
    },
    riskTier: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACTIVE', 'EXPIRED', 'CLAIMED', 'CANCELLED'],
      default: 'PENDING',
    },
    // Payment reference
    paymentId: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'MOCK'],
      default: 'MOCK',
    },
    // Zone snapshot at time of purchase
    zoneSnapshot: {
      zoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
      zoneName: String,
      riskScore: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
policySchema.index({ rider: 1, status: 1 });
policySchema.index({ weekStart: 1, weekEnd: 1 });
policySchema.index({ status: 1 });

module.exports = mongoose.model('Policy', policySchema);
