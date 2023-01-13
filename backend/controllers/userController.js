const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const saltRounds = 10;

const addUser = async (req, res) => {
    try {
        const { fname, lname, email, password, phone } = req.body;
        const hash = bcrypt.hashSync(password, saltRounds);
        userModel.create({
            fname: fname,
            lname: lname,
            email: email,
            password: hash,
            phone: phone
        }).then(data => {
            res.status(201).send({      // created
                'message': 'user registered successfully',
                'statusCode': 201,
                data
            });
        }).catch(err => res.status(400).json({
            'err': 'Something went wrong, please try again',
            'status': 400
        }));
    }
    catch (err) {
        res.status(400).json({
            'err': 'something went wrong, please try again',
            'statusCode': 400
        })
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
        const user = await userModel.findById(id);
        if (!user) {
            res.status(400).send({
                'err': `User with id ${user} not found`,
                'statusCode': 400
            })
        }

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

module.exports = { addUser, getUsers, getUserById, editUser, deleteUser };