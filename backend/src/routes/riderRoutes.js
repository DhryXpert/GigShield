const express = require('express');
const { updateProfile, getProfile } = require('../controllers/riderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply auth protection to all rider routes
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;
