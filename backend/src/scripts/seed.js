/**
 * Seed Script — Populates demo zones across Delhi, Mumbai, and Bengaluru
 * Run: node src/scripts/seed.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Zone = require('../models/Zone');

const demoZones = [
  // ============ DELHI / NCR ============
  {
    name: 'South Delhi — Saket',
    city: 'Delhi',
    coordinates: { lat: 28.5244, lng: 77.2066 },
    bounds: { north: 28.54, south: 28.51, east: 77.22, west: 77.19 },
    riskScore: 35,
    riskLevel: 'LOW',
    zoneMultiplier: 1.0,
    historicalData: {
      avgMonthlyDisruptions: 2,
      floodProneScore: 20,
      heatProneScore: 55,
      trafficCongesionScore: 45,
      avgOrderDensity: 120,
    },
  },
  {
    name: 'Rohini Sector 7',
    city: 'Delhi',
    coordinates: { lat: 28.7163, lng: 77.1147 },
    bounds: { north: 28.73, south: 28.70, east: 77.13, west: 77.10 },
    riskScore: 62,
    riskLevel: 'HIGH',
    zoneMultiplier: 1.3,
    historicalData: {
      avgMonthlyDisruptions: 5,
      floodProneScore: 65,
      heatProneScore: 60,
      trafficCongesionScore: 55,
      avgOrderDensity: 85,
    },
  },
  {
    name: 'Dwarka Sector 12',
    city: 'Delhi',
    coordinates: { lat: 28.5921, lng: 77.0378 },
    bounds: { north: 28.60, south: 28.58, east: 77.05, west: 77.02 },
    riskScore: 45,
    riskLevel: 'MEDIUM',
    zoneMultiplier: 1.1,
    historicalData: {
      avgMonthlyDisruptions: 3,
      floodProneScore: 40,
      heatProneScore: 50,
      trafficCongesionScore: 40,
      avgOrderDensity: 95,
    },
  },

  // ============ GURUGRAM ============
  {
    name: 'Gurgaon Sector 56',
    city: 'Gurugram',
    coordinates: { lat: 28.4224, lng: 77.0724 },
    bounds: { north: 28.44, south: 28.40, east: 77.09, west: 77.06 },
    riskScore: 50,
    riskLevel: 'MEDIUM',
    zoneMultiplier: 1.15,
    historicalData: {
      avgMonthlyDisruptions: 4,
      floodProneScore: 55,
      heatProneScore: 58,
      trafficCongesionScore: 70,
      avgOrderDensity: 110,
    },
  },

  // ============ MUMBAI ============
  {
    name: 'Andheri West',
    city: 'Mumbai',
    coordinates: { lat: 19.1364, lng: 72.8296 },
    bounds: { north: 19.15, south: 19.12, east: 72.84, west: 72.82 },
    riskScore: 48,
    riskLevel: 'MEDIUM',
    zoneMultiplier: 1.1,
    historicalData: {
      avgMonthlyDisruptions: 4,
      floodProneScore: 50,
      heatProneScore: 35,
      trafficCongesionScore: 65,
      avgOrderDensity: 130,
    },
  },
  {
    name: 'Kurla East',
    city: 'Mumbai',
    coordinates: { lat: 19.0760, lng: 72.8804 },
    bounds: { north: 19.09, south: 19.06, east: 72.90, west: 72.87 },
    riskScore: 72,
    riskLevel: 'HIGH',
    zoneMultiplier: 1.35,
    historicalData: {
      avgMonthlyDisruptions: 6,
      floodProneScore: 80,
      heatProneScore: 40,
      trafficCongesionScore: 75,
      avgOrderDensity: 75,
    },
  },
  {
    name: 'Powai',
    city: 'Mumbai',
    coordinates: { lat: 19.1176, lng: 72.9060 },
    bounds: { north: 19.13, south: 19.10, east: 72.92, west: 72.89 },
    riskScore: 30,
    riskLevel: 'LOW',
    zoneMultiplier: 0.95,
    historicalData: {
      avgMonthlyDisruptions: 2,
      floodProneScore: 25,
      heatProneScore: 30,
      trafficCongesionScore: 35,
      avgOrderDensity: 140,
    },
  },

  // ============ BENGALURU ============
  {
    name: 'Whitefield',
    city: 'Bengaluru',
    coordinates: { lat: 12.9698, lng: 77.7500 },
    bounds: { north: 12.98, south: 12.96, east: 77.77, west: 77.73 },
    riskScore: 28,
    riskLevel: 'LOW',
    zoneMultiplier: 0.9,
    historicalData: {
      avgMonthlyDisruptions: 2,
      floodProneScore: 15,
      heatProneScore: 20,
      trafficCongesionScore: 50,
      avgOrderDensity: 115,
    },
  },
  {
    name: 'Koramangala',
    city: 'Bengaluru',
    coordinates: { lat: 12.9352, lng: 77.6245 },
    bounds: { north: 12.95, south: 12.92, east: 77.64, west: 77.61 },
    riskScore: 40,
    riskLevel: 'MEDIUM',
    zoneMultiplier: 1.05,
    historicalData: {
      avgMonthlyDisruptions: 3,
      floodProneScore: 35,
      heatProneScore: 25,
      trafficCongesionScore: 60,
      avgOrderDensity: 125,
    },
  },
  {
    name: 'Electronic City',
    city: 'Bengaluru',
    coordinates: { lat: 12.8399, lng: 77.6770 },
    bounds: { north: 12.85, south: 12.83, east: 77.69, west: 77.66 },
    riskScore: 55,
    riskLevel: 'MEDIUM',
    zoneMultiplier: 1.15,
    historicalData: {
      avgMonthlyDisruptions: 4,
      floodProneScore: 45,
      heatProneScore: 30,
      trafficCongesionScore: 55,
      avgOrderDensity: 90,
    },
  },
];

async function seed() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.log('❌ MONGO_URI not set. Create a .env file with your MongoDB connection string.');
      console.log('   Copy .env.example to .env and fill in the values.\n');
      console.log('📋 Demo zone data preview:');
      console.log('─'.repeat(60));
      demoZones.forEach((z) => {
        const risk = z.riskLevel.padEnd(8);
        console.log(`  ${risk} │ ${z.city.padEnd(10)} │ ${z.name} (score: ${z.riskScore})`);
      });
      console.log('─'.repeat(60));
      console.log(`\n   Total: ${demoZones.length} zones ready to seed once MONGO_URI is set.`);
      return;
    }

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    // Clear existing zones
    await Zone.deleteMany({});
    console.log('🗑️  Cleared existing zones');

    // Insert demo zones
    const result = await Zone.insertMany(demoZones);
    console.log(`✅ Seeded ${result.length} demo zones:\n`);

    result.forEach((z) => {
      const risk = z.riskLevel.padEnd(8);
      console.log(`  ${risk} │ ${z.city.padEnd(10)} │ ${z.name} (score: ${z.riskScore}, multiplier: ${z.zoneMultiplier}x)`);
    });

    console.log(`\n🏙️  Cities: Delhi (3), Gurugram (1), Mumbai (3), Bengaluru (3)`);
    console.log('✅ Seed complete!\n');
  } catch (error) {
    console.error('❌ Seed error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
