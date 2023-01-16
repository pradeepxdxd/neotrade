const { getGoldData, getSilverData } = require('../controllers/tradeController');

const router = require('express').Router();

router.get('/getgoldinfo', getGoldData);
router.get('/getsilverinfo', getSilverData);

module.exports = router;