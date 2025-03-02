const express = require('express');
const { createUser, loginUser, getUserPurchases, getUserDetails, updateUserDetails, savePurchase, updateUserRole } = require('../controllers/userController');
const { getProducts, getProductById, addProduct, deleteProduct } = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');
const router = express.Router();

console.log('createUser:', createUser);
console.log('loginUser:', loginUser);
console.log('getUserPurchases:', getUserPurchases);
console.log('getUserDetails:', getUserDetails);
console.log('updateUserDetails:', updateUserDetails);
console.log('addProduct:', addProduct);
console.log('deleteProduct:', deleteProduct);

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/:id/compras', getUserPurchases);
router.get('/:id/details', getUserDetails);
router.post('/:id/details', updateUserDetails);
router.post('/compra', verifyToken, savePurchase); // Añadir la ruta para guardar la transacción
router.put('/:id/role', verifyToken, verifyAdmin, updateUserRole); // Añadir la ruta para actualizar el rol del usuario

// Rutas de administración
router.post('/products', verifyToken, verifyAdmin, addProduct);
router.delete('/products/:id', verifyToken, verifyAdmin, deleteProduct);

module.exports = router;