const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', process.env.FRONTEND_URL],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'gigshield-backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: '🛡️ AI GigShield Backend API',
    endpoints: {
      health: '/api/health',
      zones: '/api/zones',
      auth: '/api/auth/send-otp'
    },
  });
});

// ── Auth Routes ──
app.use('/api/auth', require('./routes/authRoutes'));

// ── Zone routes (public for now) ──
const { Zone } = require('./models');

app.get('/api/zones', async (req, res) => {
  try {
    const { city, riskLevel } = req.query;
    const filter = { isActive: true };
    if (city) filter.city = city;
    if (riskLevel) filter.riskLevel = riskLevel;

    const zones = await Zone.find(filter).sort({ city: 1, name: 1 });
    res.json({ success: true, count: zones.length, data: zones });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/zones/:id', async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) return res.status(404).json({ success: false, error: 'Zone not found' });
    res.json({ success: true, data: zone });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const startServer = async () => {
  // Connect to MongoDB (optional — server runs without it)
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🛡️  GigShield Backend running on http://localhost:${PORT}`);
  });
};

startServer();

module.exports = app;
