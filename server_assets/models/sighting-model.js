;(function(){

    let dataAdapter = require('./data-adapter'),
        uuid = dataAdapter.uuid,
        schemator = dataAdapter.schemator,
        DS = dataAdapter.DS;

    let Species = require('./species-model').Species;

    let Sighting = DS.defineResource({
        name: 'sighting',
        endpoint: 'sightings',
        filepath: __dirname + '/../data/sightings.db',
        relations: {
            hasMany: {
                species: {
                    localField: 'species',
                    localKeys: 'speciesId'
                }
            }
        }
    });

    schemator.defineSchema('Sighting', {
        id: {type: 'string', nullable: false},
        date: {type: 'string', nullable: false},
        location: {type: 'string', nullable: false},
        speciesId: {type: 'string', nullable: false}
    });

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

    function createSighting(date, location, speciesId, cb){
        let sighting = {
            id: uuid.v1(),
            date: date,
            location: location,
            speciesId: speciesId
        };
        let error = schemator.validateSync('Sighting', sighting);
        if (error){
            return cb(error);
        }
        Sighting.create(sighting).then(cb);             
    }

    function logSighting(sightingId, speciesId, cb){
        Sighting.find(sightingId).then(function(sighting){
            Species.find(speciesId).then(function(species){
                species.sightingIds[sightingId] = sightingId;
                Species.update(speciesId, species).then(function(obs){
                    return cb(obs);
                });
            });
        });
    }    
    
    module.exports = {
        getAll: getAll,
        getById: getById,
        create: createSighting,
        log: logSighting
    };

}());