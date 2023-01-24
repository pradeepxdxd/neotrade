"use strict";

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var userModel = require('../models/user');

var transporter = require('../mails/nodemailer');

var otpGenerator = require('random-number');

var saltRounds = 10;

var deleteAllUsers = function deleteAllUsers(req, res) {
  return regeneratorRuntime.async(function deleteAllUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(userModel.remove().then(function (data) {
            res.status(200).send('all the users are deleted...');
          })["catch"](function (err) {
            return res.status(400).then('something went wrong');
          }));

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          res.status(500).send('Internal server error');

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

var addUser = function addUser(req, res) {
  var _req$body, fname, lname, email, password, phone, user, newUser, userRegistered;

  return regeneratorRuntime.async(function addUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, fname = _req$body.fname, lname = _req$body.lname, email = _req$body.email, password = _req$body.password, phone = _req$body.phone;
          _context2.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (!user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).send({
            'statusCode': 400,
            'err': 'user email already exist'
          }));

        case 7:
          newUser = new userModel({
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            phone: phone
          });
          _context2.next = 10;
          return regeneratorRuntime.awrap(newUser.save());

        case 10:
          userRegistered = _context2.sent;
          res.status(201).send({
            "statusCode": 201,
            "msg": "user registered successfully",
            "data": userRegistered
          });
          _context2.next = 17;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send({
            'status': 400,
            'err': 'Something went wrong'
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var getUsers = function getUsers(req, res) {
  return regeneratorRuntime.async(function getUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(userModel.find().then(function (data) {
            res.status(200).send({
              // ok
              data: data,
              'statusCode': 200
            });
          })["catch"](function (err) {
            return res.status(400).send({
              'err': 'User Not Found',
              'statusCode': 400
            });
          }));

        case 3:
          _context3.next = 8;
          break;

        case 5:
          _context3.prev = 5;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send({
            'err': 'Users not found',
            'statusCode': 400
          });

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

var getUserById = function getUserById(req, res) {
  var id;
  return regeneratorRuntime.async(function getUserById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(userModel.findById({
            _id: id
          }).then(function (data) {
            res.status(200).send({
              data: data,
              'statusCode': 200
            });
          })["catch"](function (err) {
            return res.status(400).send({
              'err': 'User not found',
              'statusCode': 400
            });
          }));

        case 4:
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          res.status(400).send({
            'err': 'User not found',
            'statusCode': 400
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

var editUser = function editUser(req, res) {
  var id, _req$body2, fname, lname, email, password, phone, hash;

  return regeneratorRuntime.async(function editUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, fname = _req$body2.fname, lname = _req$body2.lname, email = _req$body2.email, password = _req$body2.password, phone = _req$body2.phone;
          hash = bcrypt.hashSync(password, saltRounds);
          _context5.next = 6;
          return regeneratorRuntime.awrap(userModel.findByIdAndUpdate(id, {
            fname: fname,
            lname: lname,
            email: email,
            password: hash,
            phone: phone
          }).then(function (data) {
            res.status(200).send({
              // no-content
              'message': 'User details updated successfully',
              'statusCode': 200,
              data: data
            });
          })["catch"](function (err) {
            res.status(400).send({
              'err': 'User not found',
              'statusCode': 400
            });
          }));

        case 6:
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(400).send({
            'err': 'User not found',
            'statusCode': 400
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var deleteUser = function deleteUser(req, res) {
  var id, user;
  return regeneratorRuntime.async(function deleteUser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(userModel.findById(id));

        case 4:
          user = _context6.sent;

          if (!user) {
            res.status(400).send({
              'err': 'User not found'
            });
          }

          _context6.next = 8;
          return regeneratorRuntime.awrap(userModel.findByIdAndDelete(id).then(function (data) {
            res.status(202).send({
              // accepted
              'message': 'User Deleted',
              'statusCode': 202
            });
          })["catch"](function (err) {
            res.status(400).send({
              'err': 'Something went wrong'
            });
          }));

        case 8:
          _context6.next = 13;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          res.status(400).send({
            'err': 'User not found'
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var login = function login(req, res) {
  var _req$body3, email, password, user, verify, token;

  return regeneratorRuntime.async(function login$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
          _context7.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: email
          }));

        case 4:
          user = _context7.sent;

          if (!user) {
            _context7.next = 20;
            break;
          }

          _context7.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compareSync(password, user.password));

        case 8:
          verify = _context7.sent;

          if (!verify) {
            _context7.next = 17;
            break;
          }

          _context7.next = 12;
          return regeneratorRuntime.awrap(user.generateUserToken());

        case 12:
          token = _context7.sent;
          res.cookie('_token', token);
          res.status(200).send({
            'statusCode': 200,
            'msg': 'user logged-In successfully',
            'data': user,
            'token': token
          });
          _context7.next = 18;
          break;

        case 17:
          res.status(400).send({
            'statusCode': 400,
            'err': 'incorrect email & password'
          });

        case 18:
          _context7.next = 21;
          break;

        case 20:
          res.status(400).send({
            'statusCode': 400,
            'err': 'invalid email and password'
          });

        case 21:
          _context7.next = 26;
          break;

        case 23:
          _context7.prev = 23;
          _context7.t0 = _context7["catch"](0);
          res.status(400).send({
            'status': 400,
            'err': 'Internal Server Error'
          });

        case 26:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

var logout = function logout(req, res) {
  return regeneratorRuntime.async(function logout$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          req.user.tokens = req.user.tokens.filter(function (token) {
            return token.token !== req.token;
          });
          res.clearCookie('_token');
          _context8.next = 5;
          return regeneratorRuntime.awrap(req.user.save());

        case 5:
          res.status(200).send({
            'statusCode': 200,
            'msg': 'Logout Successfully'
          });
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          res.status(500).send({
            'statusCode': 500,
            'err': 'Internal Server Error'
          });

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var sendpasswordlink = function sendpasswordlink(req, res) {
  var email, userEmail, token, setUserToken, mailOptions;
  return regeneratorRuntime.async(function sendpasswordlink$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          email = req.body.email;

          if (email) {
            _context9.next = 4;
            break;
          }

          return _context9.abrupt("return", res.status(401).send({
            'statusCode': 401,
            'err': 'Enter your email address'
          }));

        case 4:
          _context9.next = 6;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: email
          }));

        case 6:
          userEmail = _context9.sent;

          if (!userEmail) {
            _context9.next = 15;
            break;
          }

          token = jwt.sign({
            _id: userEmail._id
          }, process.env.SECRET_KEY, {
            expiresIn: "120s"
          });
          _context9.next = 11;
          return regeneratorRuntime.awrap(userModel.findByIdAndUpdate({
            _id: userEmail._id
          }, {
            verifytoken: token
          }, {
            "new": true
          }));

        case 11:
          setUserToken = _context9.sent;

          if (setUserToken) {
            mailOptions = {
              from: process.env.EMAIL,
              to: email,
              subject: "Sending Email For password Reset",
              text: "This Link Valid For 2 MINUTES http://localhost:3000/changepassword/".concat(userEmail.id, "/").concat(setUserToken.verifytoken)
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log("error", error);
                res.status(401).json({
                  status: 401,
                  message: "email not send"
                });
              } else {
                console.log("Email sent", info.response);
                res.status(201).json({
                  status: 201,
                  message: "Email sent Succsfully"
                });
              }
            });
          } else {
            res.status(200).send({
              'statusCode': 200,
              'msg': 'sending login mail',
              userEmail: userEmail,
              'token': token
            });
          }

          _context9.next = 16;
          break;

        case 15:
          res.status(404).send({
            'statusCode': 404,
            'err': 'user not found'
          });

        case 16:
          _context9.next = 21;
          break;

        case 18:
          _context9.prev = 18;
          _context9.t0 = _context9["catch"](0);
          res.status(500).send({
            'statusCode': 500,
            'err': 'Internal server error'
          });

        case 21:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

var forgotPassword = function forgotPassword(req, res) {
  var _req$params, id, token, validuser, verifyToken;

  return regeneratorRuntime.async(function forgotPassword$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _req$params = req.params, id = _req$params.id, token = _req$params.token;
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            _id: id,
            verifytoken: token
          }));

        case 4:
          validuser = _context10.sent;
          verifyToken = jwt.verify(token, process.env.SECRET_KEY);

          if (validuser && verifyToken._id) {
            res.status(201).send({
              'statusCode': 201,
              'msg': 'user can change password'
            });
          } else {
            res.status(401).send({
              'statusCode': 401,
              'msg': "user not exist"
            });
          }

          _context10.next = 12;
          break;

        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](1);
          res.status(401).json({
            status: 401,
            error: _context10.t0
          });

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

var changePassword = function changePassword(req, res) {
  var id, password, user, token, validUser, newpassword;
  return regeneratorRuntime.async(function changePassword$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          id = req.params.id;
          password = req.body.password;
          _context11.next = 5;
          return regeneratorRuntime.awrap(userModel.findById(id));

        case 5:
          user = _context11.sent;

          if (user) {
            _context11.next = 8;
            break;
          }

          return _context11.abrupt("return", res.status(401).send({
            'statusCode': 401,
            'err': 'user not found'
          }));

        case 8:
          token = user.verifytoken;
          validUser = jwt.verify(token, process.env.SECRET_KEY);

          if (!validUser) {
            _context11.next = 16;
            break;
          }

          newpassword = bcrypt.hashSync(password, saltRounds);
          _context11.next = 14;
          return regeneratorRuntime.awrap(userModel.findByIdAndUpdate({
            _id: id
          }, {
            password: newpassword
          }).then(function (data) {
            res.status(200).send({
              'statusCode': 200,
              'msg': 'user password updated',
              data: data
            });
          })["catch"](function (err) {
            res.status(400).send({
              'statusCode': 400,
              'err': 'user not exist'
            });
          }));

        case 14:
          _context11.next = 17;
          break;

        case 16:
          return _context11.abrupt("return", res.status(400).send({
            'statusCode': 400,
            'err': 'invalid jwt token'
          }));

        case 17:
          _context11.next = 22;
          break;

        case 19:
          _context11.prev = 19;
          _context11.t0 = _context11["catch"](0);
          res.status(500).send({
            'statusCode': 500,
            'err': 'Internal server error'
          });

        case 22:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

var loginByEmail = function loginByEmail(req, res) {
  var email, user, otp, mailOptions, token;
  return regeneratorRuntime.async(function loginByEmail$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          email = req.body.email;
          _context12.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: email
          }));

        case 4:
          user = _context12.sent;

          if (!user) {
            res.status(400).send({
              'statusCode': 400,
              'err': 'user not found, please try again'
            });
          }

          otp = otpGenerator({
            min: 1000,
            max: 9999,
            integer: true
          });
          mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP for logging in to your account ".concat(email),
            text: "Here is your otp : ".concat(otp)
          };
          _context12.next = 10;
          return regeneratorRuntime.awrap(user.generateUserToken());

        case 10:
          token = _context12.sent;

          if (token) {
            transporter.sendMail(mailOptions, function (err, info) {
              if (err) {
                res.status(400).send({
                  'statusCode': 400,
                  'err': 'something went wrong, please enter your email'
                });
              } else {
                res.status(200).send({
                  'statusCode': 200,
                  'msg': 'Otp send successfully',
                  'data': user,
                  'token': token
                });
              }
            });
          } else {
            res.status(400).send({
              'statusCode': 400,
              'msg': 'something went wrong, please try again'
            });
          }

          _context12.next = 17;
          break;

        case 14:
          _context12.prev = 14;
          _context12.t0 = _context12["catch"](0);
          res.status(400).send({
            'statusCode': 500,
            'err': 'Something went wrong'
          });

        case 17:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports = {
  addUser: addUser,
  getUsers: getUsers,
  getUserById: getUserById,
  editUser: editUser,
  deleteUser: deleteUser,
  login: login,
  logout: logout,
  sendpasswordlink: sendpasswordlink,
  forgotPassword: forgotPassword,
  deleteAllUsers: deleteAllUsers,
  changePassword: changePassword,
  loginByEmail: loginByEmail
};