const jwt = require('jsonwebtoken');

const secret = 'tu_secreto';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token requerido.');

  jwt.verify(token.split(' ')[1], secret, (err, decoded) => {
    if (err) return res.status(500).send('Token inválido.');
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
  }
};

module.exports = { generateToken, verifyToken, verifyAdmin };