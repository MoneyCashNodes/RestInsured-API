'use strict';

const debug = require('debug')('restInsured: doctor-rt');
const bearerAuth = require('../middleware/bearer-auth');
const express = require('express');
const app = express();


module.exports = function (router) {

  router.get('/doctors', (req,res) => {
    debug('GET /resource_url');


    let reqUrl = `https://api.betterdoctor.com/${new Date.parse()}/doctors?location=${req.query.location},${req.query.range}&insurance_uid=${req.query.insurance}&user_key${process.env.user_key}`;
    app.use(reqUrl, data => {
      console.log(data);
      // let body = {
      //   property: data.property,
      // };

      // res.json(body);
    });

    console.log('this is req ' + req);
    console.log('this is res ' +res);

  });

};
