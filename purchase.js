const express = require('express');
const router = express.Router();

const Purchase=require('../controllers/purchase');
const authenticatemiddleware = require('../middleware/auth');


router.get('/purchase/premiummembership',authenticatemiddleware.authenticate ,Purchase.premium);
router.post('/purchase/updatetransaction',authenticatemiddleware.authenticate ,Purchase.updatestatus);


module.exports = router;
