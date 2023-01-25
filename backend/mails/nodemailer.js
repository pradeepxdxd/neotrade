const nodemailer = require('nodemailer');

const transportor = nodemailer.createTransport({
    service : 'gmail',
    port : 587,
    secure : false,
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASSWORD
    }
})

module.exports = transportor;