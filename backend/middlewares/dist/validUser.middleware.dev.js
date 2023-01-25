"use strict";

var userModel = require('../models/user.schema');

exports.validUser = function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(userModel.findById({
            _id: req.params.id
          }).then(function (res) {
            next();
          })["catch"](function (err) {
            res.status(400).send({
              'statusCode': 400,
              'err': 'User not found'
            });
          }));

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          res.status(500).send({
            'statusCode': 500,
            'err': 'Internal Server Error'
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
};