const pool = require('../db');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middlewares/auth');

const createUser = async (req, res) => {
    const { nombre, apellido, nickname, fechaNacimiento, email, password, role } = req.body;
  
    if (!fechaNacimiento) {
      return res.status(400).json({ fechaNacimiento: 'La fecha de nacimiento es requerida' });
    }
  
    const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const nicknameCheck = await pool.query('SELECT * FROM users WHERE nickname = $1', [nickname]);
  
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ email: 'El email ya está en uso' });
    }
  
    if (nicknameCheck.rows.length > 0) {
      return res.status(400).json({ nickname: 'El nickname ya está en uso' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (nombre, apellido, nickname, fechanacimiento, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nombre, apellido, nickname, fechaNacimiento, email, hashedPassword, role || 'user']
    );
  
    res.json(result.rows[0]);
  };

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
  
      if (user && await bcrypt.compare(password, user.password)) {
        const token = generateToken(user);
        user.fechanacimiento = user.fechanacimiento.toISOString().split('T')[0];
        user.fecha_creacion = user.fecha_creacion.toISOString().split('T')[0];
        res.json({ token, user });
      } else {
        res.status(401).json({ error: 'Email o contraseña incorrectos' });
      }
    } catch (error) {
      console.error('Error en loginUser:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

const getUserPurchases = async (req, res) => {
  const { id } = req.params;
  try {
      const result = await pool.query(`
        SELECT t.id_transaccion, t.fecha_transaccion, SUM(cp.cantidad * cp.precio_unitario) AS total, 
               json_agg(json_build_object('id_producto', p.id_producto, 'nombre', p.nombre, 'precio_unitario', cp.precio_unitario, 'cantidad', cp.cantidad)) AS productos
        FROM transacciones t
        JOIN carrito c ON t.id_carrito = c.id_carrito
        JOIN carrito_productos cp ON c.id_carrito = cp.id_carrito
        JOIN productos p ON cp.id_producto = p.id_producto
        WHERE t.id_user = $1
        GROUP BY t.id_transaccion
      `, [id]);
    
      res.json(result.rows);
  } catch (error) {
      console.error('Error en getUserPurchases:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getUserDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM detalles_usuarios WHERE id_user = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Detalles del usuario no encontrados' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error en getUserDetails:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { direccion, telefono } = req.body;
  try {
      const result = await pool.query(
        'INSERT INTO detalles_usuarios (id_user, direccion, telefono) VALUES ($1, $2, $3) ON CONFLICT (id_user) DO UPDATE SET direccion = $2, telefono = $3 RETURNING *',
        [id, direccion, telefono]
      );
    
      res.json(result.rows[0]);
  } catch (error) {
      console.error('Error en updateUserDetails:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { createUser, loginUser, getUserPurchases, getUserDetails, updateUserDetails };