const express = require('express');
const { triggerDisruption } = require('../controllers/claimController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin or Mock Hackathon Endpoint
router.post('/trigger', protect, triggerDisruption);

module.exports = router;
