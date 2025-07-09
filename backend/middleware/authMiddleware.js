// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // attach user info to req
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
