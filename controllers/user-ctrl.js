'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const User = require('../model/user');

module.exports = exports = {};

exports.createUser = function(req, user) {

  if(!user) Promise.reject(createError(400, 'POST bad Request'));

  let tempPassword = user.password;
  user.password = null;
  delete user.password;

  let newUser = new User(user);

  return newUser.generatePasswordHash(tempPassword)
  .then(user => user.save())
  .then(user => user.generateToken())
  .catch(err => createError(400, 'POST bad request'));
};

exports.fetchUser = function(req, auth) {
  if(!auth) return Promise.reject(createError(400, 'GET lacking authorization. Bad request'));

  return User.findOne({email: auth.email})

  .then(user => user.comparePasswordHash(auth.password))
  .then(user => user.generateToken());
};

exports.deleteUser = function(id) {
  if(!id) return Promise.reject(createError(400, 'DELETE lacking ID. Bad request'));

  return User.findByIdAndRemove(id);
};

exports.updateUser = function(id, update) {
  if(!id) return Promise.reject(createError(400, 'PUT lacking ID. Bad request'));
  if(!update) return Promise.reject(createError(400, 'PUT lacking body. Bad request'));

  return User.findByIdAndUpdate(id, update, {new: true});
};
