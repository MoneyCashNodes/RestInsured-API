// Tests for CRUD

'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../model/user');

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
  afterEach(done => {
    Promise.all([
      User.remove({}),
    ])
    .then(() => done())
    .catch(() => done());
  });

  describe('POST /api/signup', function() {
    describe('succesful user POST', function () {
      before(done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempUser = user;
          // console.log('tempUser', this.tempUser);
          return user.generateToken();
        })
        .then(token => {
          this.tempToken = token;
          done();
        })
        .catch(() => done());
      });
      // after( done => {
      //   User.remove({})
      //   .then(() => done())
      //   .catch(() => done());
      // });
      //call exampleUser
      it('should return a new user', done => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          console.log(err);
          if (err) return done(err);
          expect(res.status).to.be.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
    });

    describe('Unsuccessful POST', function() {
      it('should provide a 400 status code for invalid User POST', done => {
        request.post(`${url}/api/signup`)
        .send(invalidUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });


  describe('GET Existing User Account', function() {
    describe('with a valid body', function() {
      before( done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then( user => {
          console.log('made it');
          return user.save();
        })
        .then( user => {
          console.log('user', user);
          this.tempUser = user;
          return user.generateToken();
          // done();
        })
        .then( token => {
          this.tempToken = token;
          done();
        })
        .catch(err => {
          console.log(err)
          done()
        });
      });

      it('should return a token', done => {
        request.get(`${url}/api/signin`)
        .auth('exampleuser@test.com', '1234')
        .end((err, res) => {
          if (err) return done(err);
          console.log('res', res.status);
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should return a user', done => {
        console.log(this.tempUser._id, 'here');
        request.get(`${url}/api/signin/${this.tempUser._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .auth('exampleuser@test.com', '1234')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text.fullName).to.equal(exampleUser.fullName);
          expect(res.text.email).to.equal(exampleUser.email);
          expect(res.text.password).to.equal(exampleUser.password);
          expect(res.text.insurance).to.equal(exampleUser.insurance);
          expect(res.status).to.equal(200);
        });
        done();
      });

      it('invalid GET: should produce 404', done => {
        request.get(`${url}/api/signin/${this.tempUser_id}`)
        .auth('exampleuser@test.com', '123')
        .end(res => {
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('unauthorized GET: should produce 401', done => {
        request.get(`${url}/api/signin`)
        .end(res => {
          expect(res.status).to.equal(401);
          done();
        });
      });
      // after( done => {
      //   User.remove({})
      //   .then( () => done())
      //   .catch(done);
      // });
    });
  });
});
