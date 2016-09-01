; (function () {

  const router = require('express').Router();
  const User = require('../models/user-model');

  exports.router = router;

  router.route('/users/register')
    .post(function (req, res) {
      User.register(req.body.email, req.body.password, function (user, token) {
        req.session.authToken = token;
        res.send(user);
      });
    })

  router.route('/users/login')
    .post(function (req, res) {
      User.login(req.body.email, req.body.password, function (user, token) {
        req.session.authToken = token;
        res.send(user);
      });
    })

  router.route('/user')
    .get(function (req, res) {
      if(!req.session.authToken){
        res.send({error: 'No Auth'})
      }
      User.login(req.session.authToken.email, req.session.authToken.password, function (user, token) {
        req.session.authToken = token;
        return res.send(user);
      });
    })
} ());