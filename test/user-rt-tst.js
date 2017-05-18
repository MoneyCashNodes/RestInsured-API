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

const updateUser = {
  fullName: 'updateuser',
  password: '1234',
  email: 'updateuser@test.com',
  insurance: 'aetna-aetnadmo',
};

const invalidUser = {
  fullName: 'invalideuser',
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

      it('should return a new user', done => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          console.log(err);
          if (err) return done(err);
          expect(res.status).to.be.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
    });

    it('should provide a 400 status code for invalid User POST', done => {
      request.post(`${url}/api/signup`)
      // .auth(invalidUser)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();

      });
    });
  });


  describe('GET Existing User Account', function() {
    describe('with a valid body', function() {
      before(done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempUser = user;
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
        .then( () => done())
        .catch(done);
      });

      it('should return a user', done => {
        request.get(`${url}/api/signin/`)
        .auth('exampleuser@test.com', '1234')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('string');
          done();
        });
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
    });
  });

  describe('DELETE Existing User Account', function() {
    //before block with successful POST of exampleUser
    before(done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then(user => user.save())
      .then(user => {
        this.tempUser = user;
        return user.generateToken();
      })
      .then(token => {
        this.tempToken = token;
        done();
      })
      .catch(() => done());
    });

    it('should provide a 204 status code for a successful user DELETE', done => {
      request.delete(`${url}/api/delete/${this.tempUser._id}`)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body).to.not.be.a('string');
        done();
      });
    });

    it('should throw an error if given the wrong credentials', done => {
      request.delete(`${url}/api/delete/${this.tempUser._id}`)
      .set({
        Authorization: `Bearer `,
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.error.path).to.deep.equal(`/api/delete/${this.tempUser._id}`);
        expect(res.error.method).to.deep.equal('DELETE');
        done();
      });
    });

    it('Should return a 404 Error if User ID is invalid', done => {
      request.delete(`${url}/api/delete/`)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.method).to.deep.equal('DELETE');
        expect(res.error.path).to.deep.equal('/api/delete/');
        done();
      });
    });

  });

  describe('PUT Update Existing User Account', function() {
    //successful POST with example user
    before(done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
      .then(user => user.save())
      .then(user => {
        this.tempUser = user;
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
      .then( () => done())
      .catch(done);
    });

    it('should update a user', done => {
      request.put(`${url}/api/update/${this.tempUser._id}`)
      .send(updateUser)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.fullName).to.be.equal(updateUser.fullName);
        expect(res.body.password).to.be.equal(updateUser.password);
        expect(res.body.email).to.be.equal(updateUser.email);
        expect(res.body.insurance).to.be.equal(updateUser.insurance);
        done();
      });
    });

    it('should throw an error if given the wrong credentials', done => {
      request.put(`${url}/api/update/${this.tempUser._id}`)
      .set({
        Authorization: `Bearer `,
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.error.method).to.deep.equal('PUT');
        expect(res.error.path).to.deep.equal(`/api/update/${this.tempUser._id}`);
        done();
      });
    });

    it('Should return a 404 error if User ID is invalid', done => {
      request.put(`${url}/api/update/`)
      .set({
        Authorization: `Bearer ${this.tempToken}`,
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.method).to.deep.equal('PUT');
        expect(res.error.path).to.deep.equal('/api/update/');
        done();
      });
    });
  });


});
