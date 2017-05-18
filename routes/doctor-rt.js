'use strict';

const debug = require('debug')('restInsured:doctor-rt');
const rp = require('request-promise');
const doctorCtrl = require('../controllers/doctor-ctrl.js');
const createError = require('http-errors');


module.exports = function(router) {
  router.get('/doctors', (req, res) => {
    debug('GET /doctors');


    if(!req.query.lat || !req.query.lon || !req.query.range || !req.query.insurance)  return createError(400, 'Latitude, Longitude, Range, and Insurance_uid are required');

    let reqUrl = `https://api.betterdoctor.com/2016-03-01/doctors?insurance_uid=${req.query.insurance}&location=${req.query.lat}%2C${req.query.lon}%2C${req.query.range}&limit=5&user_key=${process.env.user_key}`;

    rp(reqUrl)
    .then(data => doctorCtrl.reduce(JSON.parse(data)))
    .then(body => {
      res.json(body);
    })
    .catch(err => res.status(err.status).send(err.message));
  });
  return router;
};
