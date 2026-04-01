const express = require('express');
const { getQuote, purchasePolicy, getActivePolicy } = require('../controllers/policyController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/quote', getQuote);
router.post('/purchase', purchasePolicy);
router.get('/active', getActivePolicy);

module.exports = router;
