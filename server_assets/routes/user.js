; (function () {

  const router = require('express').Router();
  const User = require('../models/user-model');

  exports.router = router;

  router.route('/users/register')
    .post(function (req, res) {
      User.register(req.body.email, req.body.password, function (user) {
        req.session.authToken = user.authToken;
        res.send(user);
      });
    })

  router.route('/users/login')
    .post(function (req, res) {
      User.login(req.body.email, req.body.password, function (user) {
        req.session.authToken = user.authToken;
        res.send(user);
      });
    })

  router.route('/user')
    .get(function (req, res) {
      if(!req.session.authToken){
        return res.redirect('/#/login');
      }

    })
} ());