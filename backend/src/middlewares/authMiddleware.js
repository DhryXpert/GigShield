const jwt = require('jsonwebtoken');
const { Rider } = require('../models');

/**
 * Middleware to protect routes by verifying JWT
 */
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in cookies FIRST
  if (req.cookies && req.cookies.gigshield_token) {
    token = req.cookies.gigshield_token;
  } 
  // Fallback to Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod'
      );

      // Get user from the token, excluding password/otp fields
      req.rider = await Rider.findById(decoded.id).select('-otp -otpExpiresAt');

      if (!req.rider) {
        return res.status(401).json({ success: false, error: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error.message);
      return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized, no token' });
  }
};

module.exports = { protect };
