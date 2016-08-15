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
            Species.create(req.body.commonName, req.body.scientificName, req.body.category, req.body.size, req.body.conservationStatus, req.body.stateProtected, req.body.description, req.body.imageUrl, function(species){
                res.send(species);
            });
        })
        .put(function(req, res){
            return {error: 'You cannot update a species at this time. Nice try, Darwin.'};            
        })
        .delete(function(req, res){
            return {error: 'You cannot delete a species. What are you, a monster?'};
        });

    router.route('/species/type/:type')
        .get(function(req, res){
            Species.getByCategory(req.params.type, function(species){
                res.send(species);
            })
        })
        .post(function(req, res){
            return {error: 'You cannot add to this list.'};            

        })
        .put(function(req, res){
            return {error: 'You cannot update this list.'};            
        })
        .delete(function(req, res){
            return {error: 'You cannot delete this list.'};
        });

    router.route('/species/size/:size')
        .get(function(req, res){
            Species.getBySize(req.params.size, function(species){
                res.send(species);
            })
        })
        .post(function(req, res){
            return {error: 'You cannot add to this list.'};            

        })
        .put(function(req, res){
            return {error: 'You cannot update this list.'};            
        })
        .delete(function(req, res){
            return {error: 'You cannot delete this list.'};
        });  

    router.route('/species/name/:name')
        .get(function(req, res){
            Species.getByName(req.params.name, function(species){
                res.send(species);
            })
        })
        .post(function(req, res){
            return {error: 'You cannot add to this list.'};            

        })
        .put(function(req, res){
            return {error: 'You cannot update this list.'};            
        })
        .delete(function(req, res){
            return {error: 'You cannot delete this list.'};
        });
        

    }());