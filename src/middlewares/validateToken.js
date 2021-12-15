const { verifyToken } = require('../api/auth/jwt');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    verifyToken(authorization);
  } catch ({ error: message }) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = {
  validateToken,
};
