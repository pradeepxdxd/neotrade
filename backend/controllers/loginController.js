const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        await userModel.findOne({email})
            .then(data => {
                if(bcrypt.compareSync(password, data.password)){
                    const token = jwt.sign({userId : data._id, username : data.fname, isAdmin : data.isAdmin}, process.env.SECRET_KEY, {expiresIn : '2h'});
                    req.token = token;
                    res.status(200).send({
                        'statusCode' : 200,
                        data,
                        'message' : 'user logged in successfully',
                        '_token' : token
                    })
                }
                else{
                    res.status(400).send({
                        'statusCode' : 400,
                        'err' : 'invalid email and password'
                    })
                }
            }).catch(err => {
                res.status(400).send({
                    'statusCode' : 400,
                    'err' : 'invalid email and password'
                })
            })
    }
    catch(err){
        res.status(400).send({
            'statusCode' : 400,
            'err' : 'invalid email and password'
        })
    }
}