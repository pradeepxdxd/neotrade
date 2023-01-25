const userModel = require('../models/user.schema');
exports.validUser = async (req, res, next) => {
    try{
        await userModel.findById({_id : req.params.id}).then(res => {
            next();
        }).catch(err => {
            res.status(400).send({
                'statusCode' : 400,
                'err' : 'User not found'
            })
        })
    }
    catch(err){
        res.status(500).send({
            'statusCode' : 500,
            'err' : 'Internal Server Error'
        })
    }
}