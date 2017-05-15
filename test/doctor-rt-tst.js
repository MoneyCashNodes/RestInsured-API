'use strict';

const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const server = require('../server.js');

chai.use(http);

let sampleloc = '37.773,-122.413';
let insurance = 'blueshieldofcalifornia-bscadentalppo';
let range = '100';

describe('BetterDoc route', function(){
  let app;
  before( done => {
    app = server.listen(3000);
    done();
  });

  after(done => {
    app.close();
    done();
  });

  describe('GET request', function(){
    before('user creation');

    it('should have a doctor property with valid name and phone number', done => {
      app.get('/doctors')
      .query(
        {
          user_key: process.env.user_key,
          insurance_uid: insurance,
          user_location: sampleloc,
          location: sampleloc,range,
        })
        .set({
          Authorization: `Bearer ${this.temptoken}`,
        })
        .end((err,res) =>{
          if(err) return done(err);
          expect(res.body.doctor.name).to.be.a('String');
          expect(res.body.doctor.phonenumber).to.be.a('String');
          done();
        });
    });
  });

});
