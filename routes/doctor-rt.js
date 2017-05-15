'use strict';

const debug = require('debug')('restInsured: doctor-rt');
// const bearerAuth = require('../middleware/bearer-auth');
const express = require('express');
const app = express();

// /ext/doctors?location=${req.query.location},${req.query.range}&insurance_uid=${req.query.insurance}&user_key${process.env.user_key}

module.exports = function(router) {
  router.get('/doctors', (req, res) => {
    debug('GET /doctors');

    let reqUrl = `'https://api.betterdoctor.com/2016-03-10/doctors?location=${req.query.location},${req.query.range}&insurance_uid=${req.query.insurance}&user_key=${process.env.user_key}&limit=10'`;
    console.log(reqUrl);
    app.get(reqUrl, data => {
      console.log(data);
      // let body = {
      //   property: data.property,
      // };
      //
      // res.json(body);
    });
  });
  return router;
};
