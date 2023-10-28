const express = require('express');
const router = express.Router();
const reset = require('../controllers/ResetPassword');

const authenticatemiddleware = require('../middleware/auth');


router.post('/password/forgotpassword',reset.forgotpass);
router.get('/password/resetpassword/:id',reset.resetpassword);
router.get('/password/updatepassword/:id',reset.updatepassword);



module.exports = router;