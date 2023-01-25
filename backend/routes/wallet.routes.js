const router = require('express').Router();
const { addAmount, viewAmount, depositAmount } = require('../controllers/walletController');
const { validUser, validUserAmount } = require('../middlewares/validUser.middleware');

router.post('/addamount/:id', validUser, addAmount);
router.get('/viewamount/:id', validUser, viewAmount);
router.post('/depositamount/:id', validUser, depositAmount);

module.exports = router;