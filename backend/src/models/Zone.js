const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      enum: ['Delhi', 'Mumbai', 'Bengaluru', 'Gurugram', 'Noida', 'Hyderabad', 'Pune', 'Chennai'],
    },
    // Geographic bounds
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    // Boundaries (approximate polygon)
    bounds: {
      north: Number,
      south: Number,
      east: Number,
      west: Number,
    },
    // Current risk assessment
    riskScore: {
      type: Number,
      default: 30,
      min: 0,
      max: 100,
    },
    riskLevel: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'LOW',
    },
    // Historical data for ML
    historicalData: {
      avgMonthlyDisruptions: { type: Number, default: 3 },
      floodProneScore: { type: Number, default: 0, min: 0, max: 100 },
      heatProneScore: { type: Number, default: 0, min: 0, max: 100 },
      trafficCongesionScore: { type: Number, default: 0, min: 0, max: 100 },
      avgOrderDensity: { type: Number, default: 100 }, // orders/hour in zone
    },
    // Real-time state
    currentState: {
      activeRiders: { type: Number, default: 0 },
      totalRiders: { type: Number, default: 0 },
      orderDensity: { type: Number, default: 100 },
      lastUpdated: { type: Date, default: Date.now },
    },
    // Premium multipliers
    zoneMultiplier: {
      type: Number,
      default: 1.0,
      min: 0.5,
      max: 2.0,
    },
    // Active status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
zoneSchema.index({ city: 1 });
zoneSchema.index({ riskLevel: 1 });
zoneSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

module.exports = mongoose.model('Zone', zoneSchema);
