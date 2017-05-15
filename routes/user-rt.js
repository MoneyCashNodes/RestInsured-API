'use strict';

const debug = require('debug')('');
const User = require('../model/user');
const basicAuth = require('../middleware/basic-auth');

module.exports = function(router) {
  router.post('/signup', (req, res) => {
    debug('#POST /signup');

    let tempPassword = req.body.password;
    req.body.password = null;
    delete req.body.password;

    let newUser = new User(req.body);

    return newUser.generatePasswordHash(tempPassword)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('#GET /signin');

    return User.findOne({email: req.auth.email})
    .then(user => user.comparePasswordHash(req.auth.email))
    .then(user => user.generateToken())
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  router.delete('/deleteaccount', basicAuth, (req, res) => {
    debug('#DELETE /deleteaccount');

    return User.findOne({email: req.auth.email}, function(err, user) {
      user.remove()
      .res.status(204)
      .send('Item deleted')
      .catch(err => res.status(err.status).send(err));
    });
  });

  router.put('/updateaccount', basicAuth, (req, res) => {
    debug('#PUT /updateaccount');

    return User.findOneAndUpdate()
  })
  return router;
};
