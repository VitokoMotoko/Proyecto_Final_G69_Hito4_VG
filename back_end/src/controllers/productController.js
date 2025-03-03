const pool = require('../db');

const getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
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

  if (!userId) {
    return res.status(403).json({ error: 'Usuario no autenticado' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO comentarios (id_user, id_producto, comentario, calificacion) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, id, comentario, calificacion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const addProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, image, fecha_creacion } = req.body;

    // Validaciones
    if (!nombre || !descripcion || !precio || isNaN(precio) || !stock || isNaN(stock) || !image || !fecha_creacion) {
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

const getRecentProducts = async (req, res) => {
  try {
    console.log('Solicitud recibida en /api/products/recent');
    const result = await pool.query('SELECT * FROM productos ORDER BY fecha_creacion DESC LIMIT 6');
    console.log('Resultado de la consulta:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos recientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getBestSellingProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, SUM(cp.cantidad) AS total_vendidos
      FROM productos p
      JOIN carrito_productos cp ON p.id_producto = cp.id_producto
      GROUP BY p.id_producto
      ORDER BY total_vendidos DESC
      LIMIT 6
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos más vendidos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getTopRatedProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, COUNT(c.id_comentario) AS total_comentarios
      FROM productos p
      JOIN comentarios c ON p.id_producto = c.id_producto
      GROUP BY p.id_producto
      ORDER BY total_comentarios DESC
      LIMIT 6
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos mejor valorados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { getProducts, getProductById, getProductComments, addProductComment, addProduct, deleteProduct, getRecentProducts, getBestSellingProducts, getTopRatedProducts };