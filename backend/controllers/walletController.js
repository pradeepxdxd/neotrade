const walletModel = require('../models/wallet.schema');
const userModel = require('../models/user.schema');

exports.addAmount = async (req, res) => {
    try {
        walletModel.create(req.body)
            .then((data) => {
                return userModel.findOneAndUpdate({ _id: req.params.id }, { $push: { walletinfo: data._id } }, { new: true });
            })
            .then((dbProduct) => {
                res.status(201).json(dbProduct)
            })
            .catch(err => res.json(err))
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
    }
    catch (err) {
        res.status(400).send({
            'statusCode': 400,
            'err': 'Something went wrong'
        })
    }
}

exports.depositAmount = async (req, res) => {
    try {
        await userModel.findById({ _id: req.params.id })
            .populate('walletinfo')
            .then(data => {
                if (data.walletinfo < 1000) {
                    res.status(400).send({
                        'statusCode': 400,
                        'err': 'Insufficient balance'
                    })
                }
                else {
                    const amount = data.walletinfo.amount - req.body.amount;
                    walletModel.updateOne({ _id: data.walletinfo._id }, { $set: { amount } }).then(result => {
                        res.status(201).send({
                            'statusCode': 201,
                            'msg': 'Amount deposited successfully',
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