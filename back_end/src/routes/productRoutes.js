const express = require('express');
const { getProducts, getProductById, getProductComments, addProductComment, addProduct, deleteProduct, getRecentProducts, getBestSellingProducts, getTopRatedProducts } = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', getProducts);
router.get('/recent', getRecentProducts); // Ruta para obtener productos recientes
router.get('/best-selling', getBestSellingProducts); // Ruta para obtener productos más vendidos
router.get('/top-rated', getTopRatedProducts); // Ruta para obtener productos mejor valorados
router.get('/:id', getProductById);
router.get('/:id/comments', getProductComments); // Ruta para obtener comentarios de un producto
router.post('/:id/comments', verifyToken, addProductComment); // Ruta para agregar un comentario a un producto
router.post('/', verifyToken, verifyAdmin, addProduct);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

module.exports = router;