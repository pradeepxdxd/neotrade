const { postGoldData, postSilverData, getSilverApi, getGoldApi } = require('../controllers/tradeController');

const router = require('express').Router();

// router.post('/postgolddata', postGoldData);
// router.post('/postsilverdata', postSilverData);

router.get('/get-gold-data', getGoldApi);
router.get('/get-silver-data', getSilverApi);

module.exports = router;