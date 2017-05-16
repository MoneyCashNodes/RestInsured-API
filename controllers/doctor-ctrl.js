'use strict';

const debug = require('debug')('restInsured:doctor-ctrl');

module.exports = exports = {};

exports.reduce = function(data) {
  debug('#REDUCE doctor-ctrl');
  data.data.forEach(practice => {
    practice.practices.forEach((location, i) => {
      console.log(i);
      console.log(location.name);
    });
  });
  return data;
};
