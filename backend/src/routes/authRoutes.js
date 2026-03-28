const express = require('express');
const { sendOtp, verifyOtp, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/me', protect, getMe);
router.post('/logout', logout);

module.exports = router;
