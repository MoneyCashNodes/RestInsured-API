'use strict';

const debug = require('debug')('restInsured:doctor-ctrl');

module.exports = exports = {};

exports.reduce = function(data) {
  debug('#REDUCE doctor-ctrl');
  console.dir(data);
  let doctorHouse = [];

  data.data.forEach(practice => {

    let medicalPractice = {
      name: practice.practices[0].name,
      lat: practice.practices[0].visit_address.lat,
      lon: practice.practices[0].visit_address.lon,
      street: practice.practices[0].visit_address.street,
      zip: practice.practices[0].visit_address.zip,
      city:practice.practices[0].visit_address.city,
      state: practice.practices[0].visit_address.state,
      phone: practice.practices[0].phones[0].number,
      doctor: {
        doctorfirstname: practice.profile.first_name,
        doctorlastname: practice.profile.last_name,
        specialty: practice.specialties[0].name,
      },
    };

    doctorHouse.push(medicalPractice);

  });

  return doctorHouse;
};
