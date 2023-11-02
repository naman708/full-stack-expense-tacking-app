const express = require('express');
const router = express.Router();
const Premium = require('../controllers/PremiumFeature');
//const adduserexpense=require('../controllers/Addexpense');
const authenticatemiddleware = require('../middleware/auth');


router.get('/premiumuser/leaderboard', authenticatemiddleware.authenticate,Premium.getUserLeaderBoard);


module.exports = router;
