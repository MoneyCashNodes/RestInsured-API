// Tests for CRUD

'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../models/user');

mongoose.Promise = Promise;

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = {
  fullName: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com',
  insurance: 'aetna-aetnadmo',
};

const invalidUser = {
  fullName: 'exampleuser',
  password: '1234',
};

describe('User Routes Test', function() {

  describe('POST New User Account', function() {

  })

  describe('GET Existing User Account', function() {

  })

  describe('DELETE Existing User Account', function() {

  })

  describe('PUT Update Existing User Account', function() {
    
  })
})
