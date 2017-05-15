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


describe('User Routes Test', function() {
  describe('Server Testing', function() {
    let app;
    before(done => {
      app.server.listen(3000);
      done();
    })
  })

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

  describe('POST New User Account', function() {
    describe('succesful user POST', function () {
      after( done => {
        User.remove({})
        .then( () => done())
        .catch(done);
      });
      //call exampleUser
      it('should provide a 200 status code for a successful user POST', function(done) {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.be.equal(200);
          expect(res.text).to.be.a('string');
          expect(res.body.email).to.be.equal(exampleUser.email);
          expect(res.body.password).to.be.equal(exampleUser.password);
          expect(res.body.insurance).to.be.equal(exampleUser.insurance);
          expect(res.body.fullName).to.be.equal(exampleUser.fullName);
          done();
        })
      })
    });

    describe('Unsuccessful POST', function() {
      it('should provide a 400 status code for invalid User POST', done => {
        request.post(`${url}/api/signup`)
        .send(invalidUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.be.equal(400);
        done();
      });
    })
  })

  describe('GET Existing User Account', function() {
    //before block with successful POST of exampleUser
    it('should provide a 200 status code for a successful user GET', done => {
      //successful GET
      expect(res.body.fullName).to.be.equal(exampleUser.fullName);
      expect(res.body.email).to.be.equal(exampleUser.email);
      expect(res.body.password).to.be.equal(exampleUser.password);
      expect(res.body.insurance).to.be.equal(exampleUser.insurance);
      expect(res.status).to.be.equal(200);
      done();
    });
    it('invalid GET request should produce 400', done => {
      //invalid GET
      expect(res.status).to.be.equal(400);
      done();
    })

    it('unauthorized GET request should produce 404', done => {
      //unauthorized GET
      expect(res.status).to.be.equal(404);
      done();
    })
  })

  describe('DELETE Existing User Account', function() {
    //before block with successful POST of exampleUser
    it('should provide a 204 status code for a successful user DELETE', done => {
      //successful DELETE render
      expect(res.status).to.be.equal(204);
      // ??? actually not sure about this
      done();
    });

    it('should provide a 204 status code for a successful user DELETE', done => {
      //invalid DELETE render
      expect(res.status).to.be.equal(400);
      done();
    });

    it('should provide a 204 status code for a successful user DELETE', done => {
      //unauthorized DELETE render
      expect(res.status).to.be.equal(404);
      done();
    });
  })

  describe('PUT Update Existing User Account', function() {
    //successful POST with example user
    it('should provide a 200 status code for a successful user PUT', done => {
      //successful PUT
      expect(res.body.fullName).to.be.equal(exampleUser.fullName);
      expect(res.body.email).to.be.equal(exampleUser.email);
      expect(res.body.password).to.be.equal(exampleUser.password);
      expect(res.body.insurance).to.be.equal(exampleUser.insurance);
      expect(res.status).to.be.equal(200);
      done();
    });

    it('invalid PUT request should produce 400', done => {
      //invalid PUT
      expect(res.status).to.be.equal(400);
      done();
    })
    it('unauthorized PUT request should produce 404', done => {
      //unauthorized PUT
      expect(res.status).to.be.equal(404);
      done();
    })
  })

  after(done => {
    app.close();
    done();
  })
})
