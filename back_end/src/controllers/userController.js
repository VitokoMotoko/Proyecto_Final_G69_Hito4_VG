const pool = require('../db');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/auth');

const createUser = async (req, res) => {
  const { nombre, apellido, nickname, fechaNacimiento, email, password } = req.body;

  console.log('Datos recibidos:', req.body);

  // Verificar si el email o el nickname ya existen
  const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const nicknameCheck = await pool.query('SELECT * FROM users WHERE nickname = $1', [nickname]);

  console.log('Verificación de email:', emailCheck.rows);
  console.log('Verificación de nickname:', nicknameCheck.rows);

  if (emailCheck.rows.length > 0) {
    return res.status(400).json({ email: 'El email ya está en uso' });
  }

  if (nicknameCheck.rows.length > 0) {
    return res.status(400).json({ nickname: 'El nickname ya está en uso' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (nombre, apellido, nickname, fechaNacimiento, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [nombre, apellido, nickname, fechaNacimiento, email, hashedPassword]
  );

  console.log('Resultado de la inserción:', result.rows);

  res.json(result.rows[0]);
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
  
    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      res.json({ token, user }); // Enviar también los datos del usuario
    } else {
      res.status(401).send('Email o contraseña incorrectos');
    }
  };

module.exports = { createUser, loginUser };