const userModel = require('../models/user.schema');
exports.validUser = async (req, res, next) => {
    try{
        const user = await userModel.findById({_id : req.params.id});

        if(!user){
            res.status(400).send({
                'statusCode' : 400,
                'err' : 'User not found'
            })
        }
        else {
            next();
        }
    }
    catch(err){
        res.status(500).send({
            'statusCode' : 500,
            'err' : 'Internal Server Error'
        })
    }
}