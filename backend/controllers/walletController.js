const walletModel = require('../models/wallet.schema');
const userModel = require('../models/user.schema');

exports.addAmount = async (req, res) => {                           
    try {
        await userModel.findById({ _id: req.params.id }).then(data => {
            if (data.walletinfo) {
                data.populate('walletinfo').then(result => {
                    const updatedAmount = parseInt(result.walletinfo.amount) + parseInt(req.body.amount);
                    walletModel.updateOne({ _id: result.walletinfo._id }, { $set: { amount: updatedAmount } })
                        .then(resp => {
                            res.status(201).send({
                                'statusCode': 201,
                                'msg': 'your amount deposited successfully',
                                resp
                            })
                        })
                        .catch(err => {
                            res.status(400).send({
                                'statusCode': 400,
                                'err': 'something went wrong, please try again'
                            })
                        })
                })
            }
            else {
                walletModel.create(req.body)
                    .then((data) => {
                        return userModel.findOneAndUpdate({ _id: req.params.id }, { $push: { walletinfo: data._id } }, { new: true });
                    })
                    .then((dbProduct) => {
                        res.status(201).json({
                            'statusCode': 201,
                            'msg': 'Your amount deposited successfully',
                            dbProduct
                        })
                    })
                    .catch(err => {
                        res.status(400).send({
                            'statusCode': 400,
                            'err': 'something went wrong, please try again'
                        })
                    })
            }
        })
    }
    catch (err) {
        res.status(400).send({
            'statusCode': 400,
            'err': 'Something went wrong'
        })
    }
}

exports.viewAmount = async (req, res) => {
    try {
        await userModel.findById({ _id: req.params.id })
            .populate('walletinfo')
            .then(data => {
                res.status(200).send({
                    'statusCode': 200,
                    'data': data.walletinfo
                    // 'data' : data
                })
            })
            .catch(err => {
                res.status(400).send({
                    'statusCode': 400,
                    'err': 'User wallet is empty'
                })
            })
    }
    catch (err) {
        res.status(400).send({
            'statusCode': 400,
            'err': 'Something went wrong'
        })
    }
}

exports.withdrawAmount = async (req, res) => {
    try {
        await userModel.findById({ _id: req.params.id })
            .populate('walletinfo')
            .then(data => {
                if ((parseInt(data.walletinfo.amount) - parseInt(req.body.amount)) < 1000) {
                    res.status(400).send({
                        'statusCode': 400,
                        'err': 'Insufficient balance'
                    })
                }
                else {
                    const amount = parseInt(data.walletinfo.amount) - parseInt(req.body.amount);
                    walletModel.updateOne({ _id: data.walletinfo._id }, { $set: { amount } }).then(result => {
                        res.status(201).send({
                            'statusCode': 201,
                            'msg': `You withdrawn ${req.body.amount} successfully`,
                            result
                        })
                    }).catch(err => {
                        res.status(400).send({
                            'statusCode': 400,
                            'err': 'Something went wrong, balance is not updated'
                        })
                    })
                }
            }).catch(err => {
                res.status(400).send({
                    'statusCode': 400,
                    'err': 'Something went wrong'
                })
            })
    }
    catch (err) {
        res.status(400).send({
            'statusCode': 400,
            'err': 'Something went wrong'
        })
    }
}