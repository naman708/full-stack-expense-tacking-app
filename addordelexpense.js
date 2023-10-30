const express = require('express');
const router = express.Router();
const expensesignin = require('../controllers/expensesignin');
const adduserexpense=require('../controllers/Addexpense');
const authenticatemiddleware = require('../middleware/auth');


router.post('/user/login/add-expense',authenticatemiddleware.authenticate ,adduserexpense.addexpense);
router.get('/user/login/show-expense/:id',authenticatemiddleware.authenticate ,adduserexpense.showallexpenses);
router.delete('/user/login/del-expense/:id/:id1',authenticatemiddleware.authenticate ,adduserexpense.delexpense);



module.exports = router;
