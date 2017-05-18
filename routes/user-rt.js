'use strict';

const debug = require('debug')('restInsured:user-rt');
const userCtlr = require('../controllers/user-ctrl');
const basicAuth = require('../middleware/basic-auth');
const bearerAuth = require('../middleware/bearer-auth');
const createError = require('http-errors');

module.exports = function(router) {

  router.post('/signup', (req, res) => {
    debug('#POST /signup');
    userCtlr.createUser(req, req.body)
    .then(token => res.json(token))
    .catch(() => createError(400, 'POST bad request'));
  });

  router.get('/signin', basicAuth, (req, res) => {
    debug('#GET /signin');

    userCtlr.fetchUser(req, req.auth)
    .then(token => res.json(token))
    .catch(err => res.status(err.status).send('GET bad request'));
  });

  router.delete('/delete/:id', bearerAuth, (req, res) => {
    debug('#DELETE /delete');

    userCtlr.deleteUser(req.params.id)
    .then ( () => res.status(204).send())
    .catch(err => res.status(err.status).send('DELETE bad request'));
  });

  router.put('/update/:id', bearerAuth, (req, res) => {
    debug('#PUT /update');

    userCtlr.updateUser(req.params.id, req.body)
    .then( user => res.json(user))
    .catch(err => res.status(err.status).send('PUT bad request'));
  });
  return router;
};
