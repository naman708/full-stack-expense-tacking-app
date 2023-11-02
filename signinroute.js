const express = require('express');
const router = express.Router();
const expensesignin = require('../controllers/expensesignin');
const adduserexpense=require('../controllers/Addexpense');
const authenticatemiddleware = require('../middleware/auth');
router.get('/user/alreadyexist/:id', expensesignin.alreadyauser);
router.post('/user/signin',expensesignin.registeruser);
//router.delete('/del-product/:id',productController.delproduct);

router.post('/user/login', expensesignin.finduser);




module.exports = router;
