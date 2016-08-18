;(function(){

    let dataAdapter = require('./data-adapter'),
        uuid = dataAdapter.uuid,
        schemator = dataAdapter.schemator,
        DS = dataAdapter.DS;

    let Species = require('./species-model').Species;
    let Location = require('./location-model').Location;

    let Sighting = DS.defineResource({
        name: 'sighting',
        endpoint: 'sightings',
        relations: {
            hasMany: {
                species: {
                    localField: 'species',
                    localKey: 'speciesId'
                },
                location: {
                    localField: 'location',
                    localKey: 'locationId'
                }
            }
        }
    });

    // schemator.defineSchema('Sighting', {
    //     id: {type: 'string', nullable: false},
    //     date: {type: 'number', nullable: false},
    //     locationId: {type: 'string', nullable: false},
    //     speciesId: {type: 'string', nullable: false}
    // });

    function parseQuery(query){
        if(query){
            query = query.split(',');
        }
        let options = {
            with: query
        };
        return options;
    }

    function getAll(query, cb){
        options = parseQuery(query);
        Sighting.findAll({}, options).then(cb);
    }

    function getById(id, query, cb){
        options = parseQuery(query);
        Sighting.find(id, options).then(cb);
    }

    function createSighting(location, date, speciesId, cb){
        let sighting = {
            id: uuid.v1(),
            date: date,
            sightingLocation: location,
            speciesId: speciesId
        };
        // let error = schemator.validateSync('Sighting', sighting);
        // if (error){
        //     return cb(error);
        // }
        Sighting.create(sighting).then(cb);             
    }

    function handleError(err){
        console.log(err);
    }

    function logSighting(sightingId, cb){
        Sighting.find(sightingId).then(function(sighting){
            Species.find(sighting.speciesId).then(function(species){
                species.sightingIds = species.sightingIds || {};
                species.sightingIds[sightingId] = sightingId;
                Location.find(sighting.locationId).then(function(location){
                    location.sightingIds = location.sightingIds || {};
                    location.sightingIds[sightingId] = sightingId;                 
                    Species.update(sighting.speciesId, species).then(function(obs){
                        Location.update(sighting.locationId, location).then(function(){
                            return cb(obs);
                        });
                    });
                }, handleError);
            },handleError);
        }, handleError);
    }    
    
    module.exports = {
        getAll: getAll,
        getById: getById,
        create: createSighting,
        log: logSighting
    };

}());