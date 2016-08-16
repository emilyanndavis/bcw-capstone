;(function(){

    const router = require('express').Router();
    const User = require('../models/user-model');

    exports.router = router;

    router.route('/users/register')
        .post(function(req, res){
          User.register(req.body.email, req.body.password, function(user){
            res.send(user);
          });
        })
    
    router.route('/users/login')
        .post(function(req, res){
          User.login(req.body.email, req.body.password, function(user){
            res.send(user);
          });
        })
    }());