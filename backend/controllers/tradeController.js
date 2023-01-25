const goldModel = require('../models/gold.schema');
const silverModel = require('../models/silver.schema');

exports.getGoldApi = async (req, res) => {
    try {
        await goldModel.find()
            .then(data => {
                res.status(200).send({
                    'statusCode': 200,
                    'msg': 'gold api successfully fetched',
                    data
                })
            }).catch(err => {
                res.status(400).send({
                    'statusCode': 400,
                    'err': 'something went wrong',
                })
            })
    }
    catch (err) {
        res.status(500).send({
            'statusCode': 500,
            'err': 'Internal server error',
        })
    }
}

exports.getSilverApi = async (req, res) => {
    try {
        await silverModel.find()
            .then(data => {
                res.status(200).send({
                    'statusCode': 200,
                    'msg': 'silver api successfully fetched',
                    data
                })
            }).catch(err => {
                res.status(400).send({
                    'statusCode': 400,
                    'err': 'something went wrong',
                })
            })
    }
    catch (err) {
        res.status(500).send({
            'statusCode': 500,
            'err': 'Internal server error',
        })
    }
}

exports.getGoldDataByDay = async (req, res) => {
    try {
        const day = req.params.day;
        const goldData = await goldModel.find();
        console.log(goldData[0].Jan);
        if (day == 0) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of january month',
                'data': goldData[0].Jan
            })
        }
        else if (day == 1) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of february month',
                'data': goldData[0].Feb
            })
        }
        else if (day == 2) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of march month',
                'data': goldData[0].Mar
            })
        }
        else if (day == 3) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of april month',
                'data': goldData[0].Apr
            })
        }
        else if (day == 4) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of may month',
                'data': goldData[0].May
            })
        }
        else if (day == 5) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of june month',
                'data' : goldData[0].Jun
            })
        }
        else if (day == 6) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of july month',
                'data' : goldData[0].Jul
            })
        }
        else if (day == 7) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of augest month',
                'data' : goldData[0].Aug
            })
        }
        else if (day == 8) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of september month',
                'data' : goldData[0].Sep
            })
        }
        else if (day == 9) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of october month',
                'data' : goldData[0].Oct
            })
        }
        else if (day == 10) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of november month',
                'data' : goldData[0].Nov
            })
        }
        else if (day == 11) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of december month',
                'data' : goldData[0].Dec
            })
        }
        else {
            res.status(404).send({
                'statusCode': 404,
                'err': 'data not found, please try again'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            'statusCode': 500,
            'err': 'something went wrong'
        })
    }
}

exports.getSilverDataByDay = async (req, res) => {
    try {
        const day = req.params.day;
        const silverData = await silverModel.find();
        // console.log(silverData[0].Jan);
        if (day == 0) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of january month',
                'data': silverData[0].Jan
            })
        }
        else if (day == 1) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of february month',
                'data': silverData[0].Feb
            })
        }
        else if (day == 2) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of march month',
                'data': silverData[0].Mar
            })
        }
        else if (day == 3) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of april month',
                'data': silverData[0].Apr
            })
        }
        else if (day == 4) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of may month',
                'data': silverData[0].May
            })
        }
        else if (day == 5) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of june month',
                'data' : silverData[0].Jun
            })
        }
        else if (day == 6) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of july month',
                'data' : silverData[0].Jul
            })
        }
        else if (day == 7) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of augest month',
                'data' : silverData[0].Aug
            })
        }
        else if (day == 8) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of september month',
                'data' : silverData[0].Sep
            })
        }
        else if (day == 9) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of october month',
                'data' : silverData[0].Oct
            })
        }
        else if (day == 10) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of november month',
                'data' : silverData[0].Nov
            })
        }
        else if (day == 11) {
            res.status(200).send({
                'statusCode': 200,
                'msg': 'data of december month',
                'data' : silverData[0].Dec
            })
        }
        else {
            res.status(404).send({
                'statusCode': 404,
                'err': 'data not found, please try again'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            'statusCode': 500,
            'err': 'something went wrong'
        })
    }
}