const router = require('express').Router();
const { addAmount, viewAmount, withdrawAmount } = require('../controllers/walletController');
const { validUser, validUserAmount } = require('../middlewares/validUser.middleware');

router.post('/addamount/:id', validUser, addAmount);
router.get('/viewamount/:id', validUser, viewAmount);
router.post('/withdrawamount/:id', validUser, withdrawAmount);

module.exports = router;