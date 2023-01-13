const express = require('express');
const { body } = require('express-validator');
const { addUser, getUsers, getUserById, editUser, deleteUser } = require('../controllers/userController');

const validate = require('../middlewares/validation');

const router = express.Router();

router.post('/signup', validate([
    body('fname').isLength({ min: 3, max: 10 }).isAlpha().withMessage('first name should be alphabet'),
    body('lname').isLength({ min: 3, max: 10 }).isAlpha().withMessage('last name should be alphabet'),
    body('email').isEmail().withMessage('invalid email address'),
    body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 }).withMessage('password is must be above 8 letters'),
    body('phone').isMobilePhone().withMessage('invalid mobile number')
]),
    addUser);

router.get('/getuser', getUsers);
router.get('/getuserbyid/:id', getUserById);
router.put('/edituser/:id', editUser);
router.delete('/deleteuser/:id', deleteUser);

module.exports = router;