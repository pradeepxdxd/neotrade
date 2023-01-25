"use strict";

var router = require('express').Router();

var _require = require('../controllers/walletController'),
    addAmount = _require.addAmount,
    viewAmount = _require.viewAmount,
    depositAmount = _require.depositAmount;

var _require2 = require('../middlewares/validUser.middleware'),
    validUser = _require2.validUser,
    validUserAmount = _require2.validUserAmount;

router.post('/addamount/:id', validUser, addAmount);
router.get('/viewamount/:id', validUser, viewAmount);
router.post('/depositamount/:id', validUser, depositAmount);
module.exports = router;