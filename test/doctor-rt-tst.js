'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const server = require('../server.js');
const User = require('../model/user');

const exampleUser = {
  fullName: 'exampleuser',
  password: '1234',
  email: 'exampleuser@test.com',
  insurance: 'aetna-aetnadmo',
};

let user;

const url = `http://localhost:${process.env.PORT}`;

describe('BetterDoc route', function() {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });

  before(done => {
    request.post(`${url}/api/signup`)
    .send(exampleUser)
    .end((err, res) => {
      if (err) return done(err);
      user = res.body;
      done();
    });
  });

  after(done => {
    app.close();
    done();
  });

  after(done => {
    Promise.all([
      User.remove({}),
    ])
    .then(() => done())
    .catch(() => done());
  });

  describe('GET request /ext/doctors', function() {
    before(done => {
      request.get('localhost:8000/ext/doctors?lat=47.606&lon=-122.332&range=10&insurance=regenceblueshieldofwashinton-regencewapreferredprovidernetwork&limit=6')
        .set({
          Authorization: `Bearer ${user}`,
        })
        .end((err,res) => {
          if(err) return done(err);
          this.res = res;
          done();
        });
    });

    it('should have a doctor property with valid name and specialty', () => {
      expect(this.res.body[0].doctor.doctorfirstname).to.be.a('String');
      expect(this.res.body[0].doctor.doctorlastname).to.be.a('String');
      expect(this.res.body[0].doctor.specialty).to.be.a('String');
    });

    it('should have a doctor property with valid name and phone number', () => {
      expect(this.res.body[0].name).to.be.a('String');
      expect(this.res.body[0].lat).to.be.a('Number');
      expect(this.res.body[0].lon).to.be.a('Number');
      expect(this.res.body[0].street).to.be.a('String');
      expect(this.res.body[0].zip).to.be.a('String');
      expect(this.res.body[0].city).to.be.a('String');
      expect(this.res.body[0].state).to.be.a('String');
      expect(this.res.body[0].phone).to.be.a('String');
    });

    it('should be an array of 6 objects', () => {
      expect(this.res.body).to.be.an('Array');
      expect(this.res.body).length(6);
      expect(this.res.body[0]).to.be.an('Object');
      expect(this.res.body[0].doctor).to.be.an('Object');
    });

    it('should have a status of 200 on a proper request', () => {
      expect(this.res.status).to.equal(200);
    });
  });

  describe('GET request no params', function() {
    before(done => {
      request.get('localhost:8000/ext/doctors')
        .set({
          Authorization: `Bearer ${user}`,
        })
        .end((err,res) => {
          this.res = res;
          done();
        });
    });

    it('should return a 400 error on a bad request', () => {
      expect(this.res.status).to.equal(400);
      expect(this.res.text).to.equal('Latitude, Longitude, Range, Limit, and Insurance_uid are required');
    });
  });
});
