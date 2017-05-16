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
      after( done => {
        User.remove({})
        .then(() => done())
        .catch(() => done());
      });
      //call exampleUser
      it('should return a new user', done => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          console.log(err);
          if (err) return done(err);
          // expect(res.status).to.be.equal(200);
          // expect(res.text).to.be.a('string');
          expect(res.body.fullName).to.equal(exampleUser.fullName);
          expect(res.body.email).to.equal(exampleUser.email);
          expect(res.body.password).to.equal(exampleUser.password);
          expect(res.body.insurance).to.equal(exampleUser.insurance);
        });
        done();
      });
    });

    describe('Unsuccessful POST', function() {
      it('should provide a 400 status code for invalid User POST', done => {
        request.post(`${url}/api/signup`)
        .send(invalidUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
        });
        done();
      });
    });
  });


  describe('GET Existing User Account', function() {
    //before block with successful POST of exampleUser
    before( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then( user => user.save())
      .then( user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then( token => {
        this.tempToken = token;
        done();
      })
      .catch(() => done());
    });
    before(done => {
      exampleUser.userId = this.tempUser._id.toString();
      new User(exampleUser).save()
      .then( user => {
        this.tempUser = user;
        done();
      })
      .catch(() => done());
    });
    after(() => {
      delete exampleUser.userId;
      // User.remove({})
      // .then( () => done())
      // .catch(() => done());
    });
  //
    it('should return a user', done => {
      //successful GET
      request.get(`${url}/api/signin/${this.tempUser._id}`)
      .set({Authorization: `Bearer ${this.tempToken}`})
      // .auth('exampleuser', '1234')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.fullName).to.equal(exampleUser.fullName);
        expect(res.body.email).to.equal(exampleUser.email);
        expect(res.body.password).to.equal(exampleUser.password);
        expect(res.body.insurance).to.equal(exampleUser.insurance);
        expect(res.status).to.equal(200);
      });
      done();
    });
  });
  //     it('invalid GET request should produce 401', done => {
  //       //invalid GET
  //       request.get(`${url}/api/signin`)
  //       .auth('exampleuser', '123')
  //       .end(res => {
  //         expect(res.status).to.equal(401);
  //         done();
  //       });
  //     });
  //   });
  //
  //   it('unauthorized GET request should produce 404', done => {
  //     //unauthorized GET
  //       expect(res.status).to.equal(404);
  //       done();
  //     })
  //   });
  //
  // describe('DELETE Existing User Account', function() {
  //   //before block with successful POST of exampleUser
  //   it('should provide a 204 status code for a successful user DELETE', done => {
  //     //successful DELETE render
  //     expect(res.status).to.equal(204);
  //     // ??? actually not sure about this
  //     done();
  //   });
  //
  //   it('should provide a 204 status code for a successful user DELETE', done => {
  //     //invalid DELETE render
  //     expect(res.status).to.equal(400);
  //     done();
  //   });
  //
  //   it('should provide a 204 status code for a successful user DELETE', done => {
  //     //unauthorized DELETE render
  //     expect(res.status).to.equal(404);
  //     done();
  //   });
  // });
  //
  // describe('PUT Update Existing User Account', function() {
  //   //successful POST with example user
  //   it('should provide a 200 status code for a successful user PUT', done => {
  //     //successful PUT
  //     expect(res.body.fullName).to.equal(exampleUser.fullName);
  //     expect(res.body.email).to.equal(exampleUser.email);
  //     expect(res.body.password).to.equal(exampleUser.password);
  //     expect(res.body.insurance).to.equal(exampleUser.insurance);
  //     expect(res.status).to.equal(200);
  //     done();
  //   });
  //
  //   it('invalid PUT request should produce 400', done => {
  //     //invalid PUT
  //     expect(res.status).to.be.equal(400);
  //     done();
  //   })
  //   it('unauthorized PUT request should produce 404', done => {
  //     //unauthorized PUT
  //     expect(res.status).to.be.equal(404);
  //     done();
  //   });
  // });

});
