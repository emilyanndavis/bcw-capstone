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
        });

    router.route('/species/type/:type')
        .get(function(req, res){
            Species.getByCategory(req.params.type, function(species){
                res.send(species);
            })
        });

    router.route('/species/size/:size')
        .get(function(req, res){
            Species.getBySize(req.params.size, function(species){
                res.send(species);
            })
        });  

    router.route('/species/name/:name')
        .get(function(req, res){
            Species.getByName(req.params.name, function(species){
                res.send(species);
            })
        });
        

    }());