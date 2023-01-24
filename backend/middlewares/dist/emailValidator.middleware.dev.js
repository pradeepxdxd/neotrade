"use strict";

var validate = require('../middlewares/validation.middleware');

var _require = require('express-validator'),
    body = _require.body;

console.log('lllllllllllllllllllllllllll');
module.exports = validate([body('email').isEmail().withMessage('invalid email address')]);