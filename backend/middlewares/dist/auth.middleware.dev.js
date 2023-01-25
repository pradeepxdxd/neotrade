"use strict";

var jwt = require('jsonwebtoken');

var userModel = require('../models/user.schema');

var authLogout = function authLogout(req, res, next) {
  var token, verify, user;
  return regeneratorRuntime.async(function authLogout$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.cookies._token;
          verify = jwt.verify(token, process.env.SECRET_KEY);

          if (!verify) {
            res.status(400).send({
              'statusCode': 400,
              'err': 'invalid jwt token'
            });
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(userModel.findOne({
            _id: verify._id
          }));

        case 6:
          user = _context.sent;

          if (!user) {
            res.status(400).send({
              'statusCode': 400,
              'err': 'user not found'
            });
          }

          req.token = token;
          req.user = user;
          next();
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(401).send(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var auth = function auth(req, res, next) {
  var id, user, token, validUser;
  return regeneratorRuntime.async(function auth$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            _id: id
          }));

        case 4:
          user = _context2.sent;

          if (!user) {
            res.status(400).send({
              'err': "User with id ".concat(user, " not found"),
              'statusCode': 400
            });
          }

          token = user.tokens[0].token;
          validUser = jwt.verify(token, process.env.SECRET_KEY);

          if (!validUser) {
            res.status(400).send({
              'statusCode': 400,
              'err': 'invalid jwt token'
            });
          }

          next();
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

var authPass = function authPass(req, res, next) {
  var id, user, token, validUser;
  return regeneratorRuntime.async(function authPass$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(userModel.findById(id));

        case 4:
          user = _context3.sent;

          if (!user) {
            res.status(401).send({
              'statusCode': 401,
              'err': 'user not found'
            });
          }

          token = user.verifytoken;
          validUser = jwt.verify(token, process.env.SECRET_KEY);

          if (!validUser) {
            res.status(400).send({
              'statusCode': 400,
              'err': 'invalid jwt token'
            });
          }

          next();
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send({
            'statusCode': 400,
            'err': 'Something went wrong'
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

module.exports = {
  auth: auth,
  authLogout: authLogout,
  authPass: authPass
};