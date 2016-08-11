;(function(){

    const router = require('express').Router();
    const Location = require('../models/location-model');

    exports.router = router;

    router.route('/locations/:id?')
        .get(function(req, res){
            if (req.params.id){
                Location.getById(req.params.id, req.query.include, function(location){
                    res.send(location);
                });
            } else {
                Location.getAll(req.query.include, function(location){
                    res.send(location);
                });
            }
        })
        .post(function(req, res){
            Location.create(req.body.name, function(location){
                res.send(location);
            });
        })
        .put(function(req, res){
            return {error: 'You cannot update a location at this time.'};            
        })
        .delete(function(req, res){
            return {error: 'You cannot delete a location.'};
        })

    }());