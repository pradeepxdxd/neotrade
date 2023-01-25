const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    amount : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Wallet', walletSchema);