'use strict';

const debug = require('debug')('restInsured: doctor-rt');
// const bearerAuth = require('../middleware/bearer-auth');
const rp = require('request-promise');
const doctorCtrl = require('../controllers/doctor-ctrl.js');


module.exports = function(router) {
  router.get('/doctors', (req, res) => {
    debug('GET /doctors');

    let reqUrl = `https://api.betterdoctor.com/2016-03-01/doctors?insurance_uid=${req.query.insurance}&location=${req.query.lat}%2C${req.query.lon}%2C${req.query.range}&limit=10&user_key=${process.env.user_key}`;

    rp(reqUrl)
    .then(data => doctorCtrl.reduce(JSON.parse(data)))
    .then(body => res.json(body))
    .catch(err => res.status(err.status).send(err.message));
  });
  return router;
};
