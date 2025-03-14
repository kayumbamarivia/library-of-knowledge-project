require('dotenv').config();
const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
     const authHeader = req.headers['authorization'];
     const token = authHeader?.split(' ')[1];

     if (!token) { return res.status(401).json({ error: 'Access denied: missing token' }); }

     jwt.verify(token, process.env.JWT, (err, user) => {
          if (err) { return res.status(403).json({ error: 'Access denied: invalid token' }); } 
          req.user = user;
          next();
     });
}

module.exports = authenticateToken