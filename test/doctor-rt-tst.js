'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const server = require('../server.js');


describe.only('BetterDoc route', function(){
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });

  after(done => {
    app.close();
    done();
  });

  describe('GET request', function(){

    it('should have a doctor property with valid name and phone number', done => {
      request.get('localhost:8000/ext/doctors?lat=47.606&lon=-122.332&range=10&insurance=regenceblueshieldofwashinton-regencewapreferredprovidernetwork')
      // .query(
      //   {
      //     user_key: process.env.user_key,
      //     insurance_uid: insurance,
      //     user_location: sampleloc,
      //     location: sampleloc,range,
      //   })
        // .set({
        //   Authorization: `Bearer ${this.temptoken}`,
        // })
        .end((err,res) =>{
          if(err) return done(err);
          console.log(res.body);
          expect(res.body.doctor.name).to.be.a('String');
          expect(res.body.doctor.phonenumber).to.be.a('String');
          done();
        });
    });

    // it('should have a practice property with valid name, specialty, phone number,insurance provider, location', done => {
    //   app.get('/doctors')
    //   .query(
    //     {
    //       user_key: process.env.user_key,
    //       insurance_uid: insurance,
    //       user_location: sampleloc,
    //       location: sampleloc,range,
    //     })
    //     .set({
    //       Authorization: `Bearer ${this.temptoken}`,
    //     })
    //     .end((err,res) =>{
    //       if(err) return done(err);
    //       expect(res.body.practice.name).to.be.a('String');
    //       expect(res.body.practice.phonenumber).to.be.a('String');
    //       expect(res.body.practice.insuranceproviderid).to.be.a('String');
    //       expect(res.body.practice.specialty).to.be.a('String');
    //       expect(res.body.practice.location).to.be.a('String');
    //       done();
    //     });
    // });

  });

});
