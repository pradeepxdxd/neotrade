const express = require('express');
const { addUser, getUserById, editUser, deleteUser, login, logout, sendpasswordlink, forgotPassword, deleteAllUsers, changePassword } = require('../controllers/authController');
const validate = require('../middlewares/validateUser.middleware');
const {auth, authLogout, authPass} = require('../middlewares/auth.middleware');
const router = express.Router();

// registeration routes
router.post('/signup', validate, addUser);
router.get('/getuserbyid/:id', auth, getUserById);
router.put('/edituser/:id', auth, editUser);
router.delete('/deleteuser/:id', auth, deleteUser);
// router.delete('/deleteall', deleteAllUsers);

// login routes
router.post('/signin', validate, login);
router.get('/logout', authLogout, logout);

// forget-password routes
router.post('/sendpasswordlink', validate, sendpasswordlink);
router.get("/forgotpassword/:id/:token", authPass, forgotPassword);
router.post('/changepassword/:id', changePassword);

module.exports = router;