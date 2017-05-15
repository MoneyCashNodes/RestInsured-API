//Checks for datapoints in object
'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../model/user');

mongoose.Promise = Promise;

require('../model/user');

const url = `http://localhost:${process.env.PORT}`;

describe('User Constructor testing', function() {
  describe('user testing', function() {
    let app;
    before(done => {
      app.server.listen(3000);
      done();
    });
  });


});
