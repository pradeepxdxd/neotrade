"use strict";

var walletModel = require('../models/wallet.schema');

var userModel = require('../models/user.schema');

exports.addAmount = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            walletModel.create(req.body).then(function (data) {
              return userModel.findOneAndUpdate({
                _id: req.params.id
              }, {
                $push: {
                  walletinfo: data._id
                }
              }, {
                "new": true
              });
            }).then(function (dbProduct) {
              res.status(201).json(dbProduct);
            })["catch"](function (err) {
              return res.json(err);
            });
          } catch (err) {
            res.status(400).send({
              'statusCode': 400,
              'err': 'Something went wrong'
            });
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.viewAmount = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(userModel.findById({
            _id: req.params.id
          }).populate('walletinfo').then(function (data) {
            res.status(200).send({
              'statusCode': 200,
              'data': data.walletinfo // 'data' : data

            });
          }));

        case 3:
          _context2.next = 8;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send({
            'statusCode': 400,
            'err': 'Something went wrong'
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

exports.depositAmount = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(userModel.findById({
            _id: req.params.id
          }).populate('walletinfo').then(function (data) {
            if (data.walletinfo < 1000) {
              res.status(400).send({
                'statusCode': 400,
                'err': 'Insufficient balance'
              });
            } else {
              var amount = data.walletinfo.amount - req.body.amount;
              walletModel.updateOne({
                _id: data.walletinfo._id
              }, {
                $set: {
                  amount: amount
                }
              }).then(function (result) {
                res.status(201).send({
                  'statusCode': 201,
                  'msg': 'Amount deposited successfully',
                  result: result
                });
              })["catch"](function (err) {
                res.status(400).send({
                  'statusCode': 400,
                  'err': 'Something went wrong, balance is not updated'
                });
              });
            }
          })["catch"](function (err) {
            res.status(400).send({
              'statusCode': 400,
              'err': 'Something went wrong'
            });
          }));

        case 3:
          _context3.next = 8;
          break;

        case 5:
          _context3.prev = 5;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send({
            'statusCode': 400,
            'err': 'Something went wrong'
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 5]]);
};