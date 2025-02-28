const pool = require('../db');

const getProducts = async (req, res) => {
  const result = await pool.query('SELECT * FROM productos');
  res.json(result.rows);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'El ID del producto debe ser un número entero' });
  }
  const result = await pool.query('SELECT * FROM productos WHERE id_producto = $1', [parseInt(id)]);
  res.json(result.rows[0]);
};

const getProductComments = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM comentarios WHERE id_producto = $1', [id]);
  res.json(result.rows);
};

const addProductComment = async (req, res) => {
  const { id } = req.params;
  const { comentario, calificacion } = req.body;
  const { userId } = req;

  const result = await pool.query(
    'INSERT INTO comentarios (id_user, id_producto, comentario, calificacion) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, id, comentario, calificacion]
  );

  res.json(result.rows[0]);
};

const addProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, image } = req.body;
    const fecha_creacion = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    // Validaciones
    if (!nombre || !descripcion || !precio || isNaN(precio) || !stock || isNaN(stock) || !image) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios y deben ser válidos' });
    }

    const result = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, fecha_creacion, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, descripcion, precio, stock, fecha_creacion, image]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM productos WHERE id_producto = $1 RETURNING *', [id]);
  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(result.rows[0]);
};

module.exports = { getProducts, getProductById, getProductComments, addProductComment, addProduct, deleteProduct };