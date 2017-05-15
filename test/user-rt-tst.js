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
      //call exampleUser
      it('should provide a 200 status code for a successful user POST', function(done) {
        expect(res.status).to.be.equal(200);
        done();
      });
      it('should provide email of user', done => {
        expect(res.body.email).to.be.equal(exampleUser.email);
        done();
      });
      it('should provide password of user', done => {
        expect(res.body.password).to.be.equal(exampleUser.password);
        done();
      })
      it('should provide insurance of user', done => {
        expect(res.body.insurance).to.be.equal(exampleUser.insurance);
        done();
      });
      it('should provide full name of user', done => {
        expect(res.body.fullName).to.be.equal(exampleUser.fullName);
        done();
      })
    });

    describe('Unsuccessful POST', function() {
      it('should provide a 400 status code for invalid User POST', done => {
        //call invalidUser
        expect(res.status).to.be.equal(400);
        done();
      });

      it('invalid authorization should provide 404 Error', done => {
        //don't call authorization
        expect(res.status).to.be.equal(404);
        done();
      })
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
      })
      it('unauthorized GET request should produce 404', done => {
        //unauthorized GET
        expect(res.status).to.be.equal(404);
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
    it('should provide a 200 status code for a successful user PUT', done => {
      done();
    });
  })

  after(done => {
    app.close();
    done();
  })
})
