const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended : false
}))

app.use(cors());
app.use(cookieParser());

// routes
const userRoute = require('./routes/auth.routes');
const tradeRoute = require('./routes/trade.routes');
const walletRoute = require('./routes/wallet.routes');

app.use('/api/auth', userRoute);
app.use('/api/trade', tradeRoute);
app.use('/api/wallet', walletRoute)

module.exports = app;