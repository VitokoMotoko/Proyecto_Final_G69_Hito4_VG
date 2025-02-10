const jwt = require('jsonwebtoken');

const secret = 'tu_secreto';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token requerido.');

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(500).send('Token inválido.');
    req.userId = decoded.id;
    next();
  });
};

module.exports = { generateToken, verifyToken };