'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const User = require('../model/user');

module.exports = exports = {};

exports.createUser = function(req, user) {

  if(!user) return Promise.reject(createError(400, 'Bad Request'));

  let tempPassword = user.password;
  user.password = null;
  delete user.password;

  let newUser = new User(user);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken());
};

exports.fetchUser = function(req, auth) {
  if(!auth) return Promise.reject(createError(400, 'bad request'));

  return User.findOne({email: auth.email})
  .then(user => user.comparePasswordHash(auth.email))
  .then(user => user.generateToken());
};

exports.deleteUser = function(req) {
  if(!req.auth) return Promise.reject(createError(400, 'bad request'));

  return User.findOneAndRemove({email: req.auth.email})
  .then(user => user.comparePasswordHash(req.auth.email));
};

exports.updateUser = function(req) {
  // TODO fix this

  if(!req.auth) return Promise.reject(createError(400, 'bad request'));
  if(!req.body) return Promise.reject(createError(400, 'bad request'));

  return User.findOneAndUpdate({email: req.auth.email});
};
