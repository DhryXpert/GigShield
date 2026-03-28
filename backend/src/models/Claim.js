const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Policy',
      required: true,
    },
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider',
      required: true,
    },
    // Trigger details
    triggerType: {
      type: String,
      enum: ['HEAVY_RAIN', 'EXTREME_HEAT', 'DENSE_FOG', 'FLASH_FLOOD', 'STRIKE_CURFEW'],
      required: true,
    },
    triggerData: {
      rain_mm: Number,
      temp_celsius: Number,
      visibility_m: Number,
      aqi_index: Number,
      traffic_congestion: Number,
      order_density_drop_pct: Number,
      active_rider_pct: Number,
      community_offline_count: Number,
    },
    // Payout
    payoutAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    payoutPercentage: {
      type: Number,
      // 60%, 65%, 70%, 75%, 80% based on trigger type
    },
    dailyAvgEarnings: {
      type: Number,
    },
    // Fraud detection
    anomalyScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
    },
    fraudFlags: [
      {
        type: { type: String, enum: ['GPS_SPOOF', 'FAKE_WEATHER', 'FAKE_INACTIVITY', 'DUPLICATE'] },
        severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'] },
        detail: String,
      },
    ],
    // Status lifecycle
    status: {
      type: String,
      enum: ['TRIGGERED', 'FRAUD_CHECK', 'APPROVED', 'PAID', 'REJECTED', 'FLAGGED'],
      default: 'TRIGGERED',
    },
    statusHistory: [
      {
        status: String,
        timestamp: { type: Date, default: Date.now },
        note: String,
      },
    ],
    // Payout reference
    payoutRef: {
      type: String,
    },
    payoutMethod: {
      type: String,
      enum: ['UPI', 'BANK_TRANSFER', 'MOCK'],
      default: 'MOCK',
    },
    paidAt: {
      type: Date,
    },
    // Zone info at claim time
    zoneSnapshot: {
      zoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone' },
      zoneName: String,
      riskScore: Number,
      riskLevel: String,
    },
    // Trigger event hash (for duplicate detection)
    triggerHash: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
claimSchema.index({ rider: 1, createdAt: -1 });
claimSchema.index({ policy: 1 });
claimSchema.index({ status: 1 });
claimSchema.index({ anomalyScore: -1 });

module.exports = mongoose.model('Claim', claimSchema);
