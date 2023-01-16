const { default: axios } = require("axios");

const getGoldData = async (req, res) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", "goldapi-l6rl2tlcyh3v47-io");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://www.goldapi.io/api/XAU/INR", requestOptions)
            .then(response => response.text())
            .then(result => {
                res.status(200).send({
                    'statusCode': 200,
                    'msg': 'data fetch successfully',
                    result
                })
            })
            .catch(err => {
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

const getSilverData = async (req, res) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", "goldapi-l6rl2tlcyh3v47-io");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://www.goldapi.io/api/XAG/INR", requestOptions)
            .then(response => response.text())
            .then(result => {
                res.status(200).send({
                    'statusCode': 200,
                    'msg': 'data fetch successfully',
                    result
                })
            })
            .catch(err => {
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

module.exports = { getGoldData, getSilverData }