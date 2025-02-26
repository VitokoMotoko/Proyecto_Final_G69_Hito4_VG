const pool = require('../db');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text) => {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const getProducts = async (req, res) => {
  const result = await pool.query('SELECT * FROM productos');
  const products = result.rows.map(product => ({
    ...product,
    image: decrypt(product.image)
  }));
  res.json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'El ID del producto debe ser un número entero' });
  }
  const result = await pool.query('SELECT * FROM productos WHERE id_producto = $1', [parseInt(id)]);
  const product = result.rows[0];
  if (product) {
    product.image = decrypt(product.image);
  }
  res.json(product);
};

const addProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const image = req.file.filename; // Obtener el nombre del archivo subido
    const fecha_creacion = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    // Validaciones
    if (!nombre || !descripcion || !precio || isNaN(precio) || !stock || isNaN(stock) || !image) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios y deben ser válidos' });
    }

    const imagePath = `/images/${image}`;
    const encryptedImage = encrypt(imagePath);

    const result = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, fecha_creacion, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, descripcion, precio, stock, fecha_creacion, encryptedImage]
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

module.exports = { getProducts, getProductById, addProduct, deleteProduct };