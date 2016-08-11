;(function(){

    const router = require('express').Router();
    const Species = require('../models/species-model');

    exports.router = router;

    router.route('/species/:id?')
        .get(function(req, res){
            if (req.params.id){
                Species.getById(req.params.id, req.query.include, function(species){
                    res.send(species);
                });
            } else {
                Species.getAll(req.query.include, function(species){
                    res.send(species);
                });
            }
        })
        .post(function(req, res){
            Species.create(req.body.commonName, function(species){
                res.send(species);
            });
        })
        .put(function(req, res){
            return {error: 'You cannot update a species at this time. Nice try, Darwin.'};            
        })
        .delete(function(req, res){
            return {error: 'You cannot delete a species. What are you, a monster?'};
        })

    }());