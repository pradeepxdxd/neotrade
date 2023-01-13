const express = require('express');
const { login } = require('../controllers/loginController');
const router = express.Router();

router.post('/signin', login);
module.exports = router;