;(function(){

    const router = require('express').Router();
    const Sighting = require('../models/sighting-model');

    exports.router = router;

    router.route('/sightings/:id?')
        .get(function(req, res){
            if (req.params.id){
                Sighting.getById(req.params.id, req.query.include, function(sighting){
                    res.send(sighting);
                });
            } else {
                Sighting.getAll(req.query.include, function(sightings){
                    res.send(sightings);
                });
            }
        })
        .post(function(req, res){
            Sighting.create(req.body.locationId, req.body.speciesId, function(sighting){
                Sighting.log(sighting.id, function(loggedSighting){
                    res.send(loggedSighting);
                });
            });
        })
        .put(function(req, res){
            return {error: 'You cannot update a sighting at this time.'};            
        })
        .delete(function(req, res){
            return {error: 'You cannot delete a sighting at this time.'};
        });
        
    }());