const express = require('express');
const multer = require('multer');
const path = require('path');
const { getProducts, getProductById, addProduct, deleteProduct } = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../front_end/public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken, verifyAdmin, upload.single('image'), addProduct);
router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

module.exports = router;