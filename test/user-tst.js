'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../model/user');

mongoose.Promise = Promise;

<<<<<<< HEAD
require('../server.js');

describe('User Constructor testing', function() {

=======
require('../server');


describe('User Constructor testing', function() {
>>>>>>> 623888c314ed08b663bc92f29ada4a62e7afcf7b
  describe('when creating a new user', function() {
    this.newUser = new User('exampleUser', 'example@email.com', 'password', 'example-insurance');

    it('should create a new user', done => {
<<<<<<< HEAD
      expect(this.newUser.fullname).to.equal('exampleUser');
=======
      expect(this.newUser.fullName).to.equal('exampleUser');
>>>>>>> 623888c314ed08b663bc92f29ada4a62e7afcf7b
      done();
    });

    it('should have an email of example@email.com', done => {
      expect(this.newUser.email).to.equal('example@email.com');
      done();
    });

    it('should have a password of password', done => {
      expect(this.newUser.password).to.equal('password');
      done();
    });

    it('should have a insurance of example-insurance', done => {
      expect(this.newUser.password).to.equal('password');
      done();
    });
  });
});
