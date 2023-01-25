"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginbymail = exports.sendpasswordlink = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API = 'http://localhost:3002/api/auth/';

var sendpasswordlink = function sendpasswordlink(data) {
  return _axios["default"].post("".concat(API, "sendpasswordlink"), data);
};

exports.sendpasswordlink = sendpasswordlink;

var loginbymail = function loginbymail(data) {
  return _axios["default"].post("".concat(API, "loginbymail"), data);
};

exports.loginbymail = loginbymail;