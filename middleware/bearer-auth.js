'use strict';

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const debug = require('debug')('restInsured:bearer-auth-middleware');

const User = require('../model/user.js');

module.exports = function(req, res, next) {
  debug('bearer-auth-middleware');

  let authHeaders = req.headers.Authorization;
  if (!authHeaders) return createError(401, 'Authroization headers required');

  let token = authHeaders.split('Bearer ')[1];
  if(!token) return next(createError(401, 'Token required'));

  jwt.verify(token, process.env.APP_Secret, (err, decoded) => {
    if(err) return(next(err));

    User.find({findHash: decoded.token})
    .then(user => {
      req.user = user[0];
      next();
    })
    .catch(err => next(createError(err.status, err.message)));
  });
};
