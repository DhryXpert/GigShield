const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for a given rider ID
 */
const generateToken = (riderId) => {
  return jwt.sign(
    { id: riderId },
    process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

module.exports = {
  generateToken,
};
