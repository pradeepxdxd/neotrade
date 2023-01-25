"use strict";

var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var saltRounds = 10;
var userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    "default": false
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  verifytoken: {
    type: String
  },
  walletinfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet'
  }
});
userSchema.pre("save", function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified('password')) {
            this.password = bcrypt.hashSync(this.password, saltRounds);
          }

          next();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

userSchema.methods.generateUserToken = function _callee2() {
  var token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = jwt.sign({
            _id: this._id.toString()
          }, process.env.SECRET_KEY, {
            expiresIn: '2h'
          });
          this.tokens = this.tokens.concat({
            token: token
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(this.save());

        case 5:
          return _context2.abrupt("return", token);

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this, [[0, 8]]);
};

module.exports = mongoose.model('User', userSchema);