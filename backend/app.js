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
const userRoute = require('./routes/authRouter');
const tradeapiRoute = require('./routes/trade.api.router');

app.use('/api/user', userRoute);
app.use('/api/trade', tradeapiRoute);

module.exports = app;