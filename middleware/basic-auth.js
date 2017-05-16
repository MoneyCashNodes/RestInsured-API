'use strict';

const debug = require('debug')('restInsured:basic-auth-middleware');
const createError = require('http-errors');

module.exports = function(req, res, next) {
  debug('#basic-auth-middleware');

  let authHeaders = req.headers.authorization;
  if(!authHeaders) return next(createError(401, 'Authorization headers required'));

  let base64Str = authHeaders.split('Basic ')[1];
  if(!base64Str) return next(createError(401, 'Email and Password required'));

  let [email, password] = new Buffer(base64Str, 'base64').toString().split(':');
  req.auth = {email, password};

  if(!req.auth.email) return next(createError(401, 'Email required'));
  if(!req.auth.password) return next(createError(401, 'Password required'));

  next();
};
