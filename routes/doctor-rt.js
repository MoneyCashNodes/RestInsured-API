'use strict';

const debug = require('debug')('restInsured: doctor-rt');
// const bearerAuth = require('../middleware/bearer-auth');
const rp = require('request-promise');

// /ext/doctors?location=${req.query.location},${req.query.range}&insurance_uid=${req.query.insurance}&user_key${process.env.user_key}

module.exports = function(router) {
  router.get('/doctors', (req, res) => {
    debug('GET /doctors');

    let reqUrl = `https://api.betterdoctor.com/2016-03-01/doctors?insurance_uid=${req.query.insurance}&location=${req.query.lat}%2C${req.query.lon}%2C${req.query.range}&limit=10&user_key=${process.env.user_key}`;

    console.log(reqUrl);
    rp(reqUrl)
    .then(data => res.json(JSON.parse(data)))
    .catch(err => err);
  });
  return router;
};
