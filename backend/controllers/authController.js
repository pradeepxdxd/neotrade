const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const transportor = require('../mails/nodemailer');
const saltRounds = 10;
const otpGenerator = require('random-number');

const deleteAllUsers = async (req, res) => {
    try {
        await userModel.remove()
            .then(data => {
                res.status(200).send('all the users are deleted...')
            })
            .catch(err => res.status(400).then('something went wrong'));
    }
    catch (err) {
        res.status(500).send('Internal server error');
    }
}

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
            const verify = await bcrypt.compareSync(password, user.password);
            if (verify) {
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

const sendpasswordlink = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(401).send({
                'statusCode': 401,
                'err': 'Enter your email address',
            })
        }

        const userEmail = await userModel.findOne({ email });

        if (userEmail) {
            const token = jwt.sign({ _id: userEmail._id }, process.env.SECRET_KEY, { expiresIn: "120s" });
            const setUserToken = await userModel.findByIdAndUpdate({ _id: userEmail._id }, { verifytoken: token }, { new: true });
            if (setUserToken) {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Email For password Reset",
                    text: `This Link Valid For 2 MINUTES http://localhost:3000/changepassword/${userEmail.id}/${setUserToken.verifytoken}`
                }
                transportor.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error", error);
                        res.status(401).json({ status: 401, message: "email not send" })
                    } else {
                        console.log("Email sent", info.response);
                        res.status(201).json({ status: 201, message: "Email sent Succsfully" })
                    }
                })
            }
            else {
                res.status(200).send({
                    'statusCode': 200,
                    'msg': 'sending login mail',
                    userEmail,
                    'token': token
                })
            }
        }
        else {
            res.status(404).send({
                'statusCode': 404,
                'err': 'user not found',
            })
        }
    }
    catch (err) {
        res.status(500).send({
            'statusCode': 500,
            'err': 'Internal server error'
        })
    }

}

const forgotPassword = async (req, res) => {
    const { id, token } = req.params;

    try {
        const validuser = await userModel.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        if (validuser && verifyToken._id) {
            res.status(201).send({
                'statusCode': 201,
                'msg': 'user can change password'
            })
        }
        else {
            res.status(401).send({
                'statusCode': 401,
                'msg': "user not exist"
            })
        }

    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}

const changePassword = async (req, res) => {
    try {
        const id = req.params.id;
        const { password } = req.body;

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(401).send({
                'statusCode': 401,
                'err': 'user not found'
            })
        }

        const token = user.verifytoken;

        const validUser = jwt.verify(token, process.env.SECRET_KEY);

        if (validUser) {
            const newpassword = bcrypt.hashSync(password, saltRounds);
            await userModel.findByIdAndUpdate({ _id: id }, { password: newpassword })
                .then(data => {
                    res.status(200).send({
                        'statusCode': 200,
                        'msg': 'user password updated',
                        data
                    })
                }).catch(err => {
                    res.status(400).send({
                        'statusCode': 400,
                        'err': 'user not exist'
                    })
                })
        }
        else {
            return res.status(400).send({
                'statusCode': 400,
                'err': 'invalid jwt token'
            })
        }

    }
    catch (err) {
        res.status(500).send({
            'statusCode': 500,
            'err': 'Internal server error'
        })
    }
}

const loginByEmail = async (req, res) => {
    try {
        const email = req.body.email;

        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(400).send({
                'statusCode': 400,
                'err': 'user not found, please try again'
            })
        }

        const otp = otpGenerator({
            min: 1000,
            max: 9999,
            integer: true
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `OTP for logging in to your account ${email}`,
            text: `Here is your otp : ${otp}`
        }

        const token = await user.generateUserToken();

        if (token) {
            transportor.sendMail(mailOptions, (err, info) => {
                if (err) {
                    res.status(400).send({
                        'statusCode': 400,
                        'err': 'something went wrong, please enter your email',
                    })
                }
                else {
                    res.status(200).send({
                        'statusCode': 200,
                        'msg': 'Otp send successfully',
                        'data': user,
                        'token': token
                    })
                }
            })
        }

        else {
            res.status(400).send({
                'statusCode': 400,
                'msg': 'something went wrong, please try again'
            })
        }

    }
    catch (err) {
        res.status(400).send({
            'statusCode': 500,
            'err': 'Something went wrong'
        })
    }
}

module.exports = { addUser, getUsers, getUserById, editUser, deleteUser, login, logout, sendpasswordlink, forgotPassword, deleteAllUsers, changePassword, loginByEmail };