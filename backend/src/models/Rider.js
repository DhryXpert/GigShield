const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    upiId: {
      type: String,
      trim: true,
      // e.g., "rahul@paytm" or "9876543210@upi"
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Zone',
    },
    city: {
      type: String,
      enum: ['Delhi', 'Mumbai', 'Bengaluru', 'Gurugram', 'Noida', 'Hyderabad', 'Pune', 'Chennai'],
    },
    // Income Stability Score (300–900)
    issScore: {
      type: Number,
      default: 550,
      min: 300,
      max: 900,
    },
    issFactors: {
      activeHoursPerWeek: { type: Number, default: 35 },     // avg hours worked
      zoneRiskHistory: { type: Number, default: 50 },          // 0-100
      disruptionResilience: { type: Number, default: 50 },     // 0-100
      platformTenureMonths: { type: Number, default: 6 },      // months on Blinkit
      claimHistory: { type: Number, default: 100 },             // starts at 100, decreases with fraud
    },
    weeklyEarningsEstimate: {
      type: Number,
      default: 4000,
      min: 0,
    },
    dailyAvgEarnings: {
      type: Number,
      default: 600,
    },
    role: {
      type: String,
      enum: ['rider', 'admin'],
      default: 'rider',
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastKnownLocation: {
      lat: { type: Number },
      lng: { type: Number },
      updatedAt: { type: Date },
    },
    // OTP fields (for auth)
    otp: { type: String },
    otpExpiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Indexes for query performance
riderSchema.index({ phone: 1 });
riderSchema.index({ zone: 1 });
riderSchema.index({ city: 1 });
riderSchema.index({ isActive: 1 });

module.exports = mongoose.model('Rider', riderSchema);
