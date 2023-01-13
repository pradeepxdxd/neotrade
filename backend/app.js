const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended : false
}))

app.use(cors());

// routes
const userRoute = require('./routes/userRouter');
const loginRoute = require('./routes/loginRouter');

app.use('/api/user', userRoute);
app.use('/api/user', loginRoute);

module.exports = app;