const express = require('express');
const { addUser, getUsers, getUserById, editUser, deleteUser, login, logout } = require('../controllers/authController');
const validate = require('../middlewares/validateUser.middleware');
const {auth, authEdit, authGetUser} = require('../middlewares/auth.middleware');
const router = express.Router();

// registeration routes
router.post('/signup', validate, addUser);
router.get('/getuser', getUsers);
router.get('/getuserbyid/:id', authGetUser, getUserById);
router.put('/edituser/:id', authEdit, editUser);
router.delete('/deleteuser/:id', authGetUser, deleteUser);

// login routes
router.post('/signin', validate, login);
router.get('/logout', auth, logout);

module.exports = router;