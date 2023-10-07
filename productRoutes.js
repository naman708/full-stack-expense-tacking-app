// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/add-product', productController.getProducts);
router.post('/get-product', productController.postAddProduct);
router.delete('/del-product/:id',productController.delproduct);

//router.get('/products', productController.getProducts);

module.exports = router;
