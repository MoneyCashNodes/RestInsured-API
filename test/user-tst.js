// 'use strict';
//
// const expect = require('chai').expect;
// const request = require('superagent');
// const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const User = require('../model/user');
//
// mongoose.Promise = Promise;
//
// require('../server');
//
//
// describe('User Constructor testing', function() {
//   describe('when creating a new user', function() {
//     this.newUser = new User('exampleUser', 'example@email.com', 'password', 'example-insurance');
//
//     it('should create a new user', done => {
//       expect(this.newUser.fullname).to.equal('exampleUser');
//       done();
//     });
//
//     it('should have an email of example@email.com', done => {
//       expect(this.newUser.email).to.equal('example@email.com');
//       done();
//     });
//
//     it('should have a password of password', done => {
//       expect(this.newUser.password).to.equal('password');
//       done();
//     });
//
//     it('should have a insurance of example-insurance', done => {
//       expect(this.newUser.password).to.equal('password');
//       done();
//     });
//   });
// });
