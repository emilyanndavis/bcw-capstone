
;(function(){

    const router = require('express').Router();
    const LogBook = require('../models/logbook-model');

    exports.router = router;

    router.route('/logbooks/:id?')
        .get(function(req, res){
            if (req.params.id){
                LogBook.getById(req.params.id, function(logbook){
                    res.send(logbook);
                });
            } else {
                LogBook.getAll(function(logbooks){
                    res.send(logbooks);
                });
            }
        })
        .put(function(req, res){
            LogBook.logSpecies(req.body.logBookId, req.body.speciesId, function(logbook){
                res.send(logbook.species[req.body.speciesId]);
            });
        });

        
    }());