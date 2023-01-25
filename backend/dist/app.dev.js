"use strict";

var express = require('express');

var cors = require('cors');

var cookieParser = require('cookie-parser');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
app.use(cookieParser()); // routes

var userRoute = require('./routes/auth.routes');

var tradeRoute = require('./routes/trade.routes');

var walletRoute = require('./routes/wallet.routes');

app.use('/api/auth', userRoute);
app.use('/api/trade', tradeRoute);
app.use('/api/wallet', walletRoute);
module.exports = app;