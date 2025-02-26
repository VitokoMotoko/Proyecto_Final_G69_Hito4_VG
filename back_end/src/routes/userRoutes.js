const express = require('express');
const { createUser, loginUser, getUserPurchases, getUserDetails, updateUserDetails } = require('../controllers/userController');
const { getProducts, getProductById, addProduct, deleteProduct } = require('../controllers/productController');
const { verifyAdmin } = require('../middlewares/auth');
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

// Rutas de administración
router.post('/products', verifyAdmin, addProduct);
router.delete('/products/:id', verifyAdmin, deleteProduct);

module.exports = router;