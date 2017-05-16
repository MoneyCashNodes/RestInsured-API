'use strict';

const debug = require('debug')('restInsured:user-rt');
const userCtlr = require('../controllers/user-ctrl');
const basicAuth = require('../middleware/basic-auth');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    debug('#POST /signup');

    userCtlr.createUser(req, req.body)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('#GET /signin');

    userCtlr.fetchUser(req, req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send(err));
  });

  router.delete('/deleteaccount', basicAuth, (req, res) => {
    debug('#DELETE /deleteaccount');

    userCtlr.deleteUser(req)
    .then( () => {
      res.status(204);
    })
    .send('Item deleted')
    .catch(err => res.status(err.status).send(err));
  });

  router.put('/update', basicAuth, (req, res) => {
    debug('#PUT /update');

    userCtlr.updateUser(req, {new: true})
    .then( user => {
      res.json(user);
    })
    .catch(err => res.status(400).send(err.message));
  });
  return router;
};
