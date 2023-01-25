"use strict";

var mongoose = require('mongoose');

var walletSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Wallet', walletSchema);