const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const saltRounds = 10;

const addUser = async (req, res) => {
    try {
        const { fname, lname, email, password, phone } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).send({
                'statusCode': 400,
                'err': 'user email already exist'
            })
        }
        const newUser = new userModel({
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            phone: phone
        });

        const userRegistered = await newUser.save();

        res.status(201).send({
            "statusCode": 201,
            "msg": "user registered successfully",
            "data": userRegistered
        })
    }
    catch (err) {
        res.status(400).send({ 'status': 400, 'err': 'Something went wrong' });
    }
}

const getUsers = async (req, res) => {
    try {
        await userModel.find()
            .then(data => {
                res.status(200).send({      // ok
                    data,
                    'statusCode': 200
                });
            })
            .catch(err => res.status(400).send({
                'err': 'User Not Found',
                'statusCode': 400
            }));
    }
    catch (err) {
        res.status(400).send({
            'err': 'Users not found',
            'statusCode': 400
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findById({ _id: id })
            .then(data => {
                res.status(200).send({
                    data,
                    'statusCode': 200
                });
            })
            .catch(err => res.status(400).send({
                'err': 'User not found',
                'statusCode': 400
            }));
    }
    catch (err) {
        res.status(400).send({
            'err': 'User not found',
            'statusCode': 400
        });
    }
}

const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { fname, lname, email, password, phone } = req.body;
        const hash = bcrypt.hashSync(password, saltRounds);
        await userModel.findByIdAndUpdate(id, { fname: fname, lname: lname, email: email, password: hash, phone: phone })
            .then(data => {
                res.status(200).send({      // no-content
                    'message': 'User details updated successfully',
                    'statusCode': 200,
                    data
                });
            }).catch(err => {
                res.status(400).send({
                    'err': 'User not found',
                    'statusCode': 400
                });
            })
    }
    catch (err) {
        res.status(400).send({
            'err': 'User not found',
            'statusCode': 400
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if (!user) {
            res.status(400).send({ 'err': 'User not found' });
        }
        await userModel.findByIdAndDelete(id)
            .then(data => {
                res.status(202).send({      // accepted
                    'message': 'User Deleted',
                    'statusCode': 202
                });
            }).catch(err => {
                res.status(400).send({ 'err': 'Something went wrong' });
            })
    }
    catch (err) {
        res.status(400).send({ 'err': 'User not found' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            if (bcrypt.compare(password, user.password)) {
                const token = await user.generateUserToken();
                res.cookie('_token', token);
                res.status(200).send({
                    'statusCode': 200,
                    'msg': 'user logged-In successfully',
                    'data': user,
                    'token': token
                })
            }
            else {
                res.status(400).send({
                    'statusCode': 400,
                    'err': 'incorrect email & password'
                })
            }
        }
        else {
            res.status(400).send({
                'statusCode': 400,
                'err': 'invalid email and password'
            })
        }
    }
    catch (err) {
        res.status(400).send({ 'status': 400, 'err': 'Internal Server Error' });
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token => {
            return token.token !== req.token;
        }))

        res.clearCookie('_token');
        await req.user.save();
        res.status(200).send({
            'statusCode': 200,
            'msg': 'Logout Successfully'
        });
    }
    catch (err) {
        res.status(500)
            .send({
                'statusCode': 500,
                'err': 'Internal Server Error'
            })
    }
}

module.exports = { addUser, getUsers, getUserById, editUser, deleteUser, login, logout };