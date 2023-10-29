const express = require('express');
const router = express.Router();
const Downloadreport= require('../controllers/downloadreport');

const authenticatemiddleware = require('../middleware/auth');


//router.post('/user/login/add-expense',authenticatemiddleware.authenticate ,adduserexpense.addexpense);
router.get('/user/downloadreport',authenticatemiddleware.authenticate ,Downloadreport.expensereport);
//router.delete('/user/login/del-expense/:id/:id1',authenticatemiddleware.authenticate ,adduserexpense.delexpense);



module.exports = router;
