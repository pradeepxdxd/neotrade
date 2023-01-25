"use strict";

var express = require('express');

var _require = require('../controllers/authController'),
    addUser = _require.addUser,
    getUserById = _require.getUserById,
    editUser = _require.editUser,
    deleteUser = _require.deleteUser,
    login = _require.login,
    logout = _require.logout,
    sendpasswordlink = _require.sendpasswordlink,
    forgotPassword = _require.forgotPassword,
    deleteAllUsers = _require.deleteAllUsers,
    changePassword = _require.changePassword,
    loginByEmail = _require.loginByEmail;

var validate = require('../middlewares/validateUser.middleware');

var _require2 = require('../middlewares/auth.middleware'),
    auth = _require2.auth,
    authLogout = _require2.authLogout,
    authPass = _require2.authPass;

var router = express.Router(); // registeration routes

router.post('/signup', validate, addUser);
router.get('/getuserbyid/:id', auth, getUserById);
router.put('/edituser/:id', auth, editUser);
router["delete"]('/deleteuser/:id', auth, deleteUser); // router.delete('/deleteall', deleteAllUsers);
// login routes

router.post('/signin', validate, login);
router.get('/logout', authLogout, logout);
router.post('/loginbymail', validate, loginByEmail); // forget-password routes

router.post('/sendpasswordlink', validate, sendpasswordlink);
router.get("/forgotpassword/:id/:token", authPass, forgotPassword);
router.post('/changepassword/:id', changePassword);
module.exports = router;