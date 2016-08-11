;(function(){

    let dataAdapter = require('./data-adapter'),
        uuid = dataAdapter.uuid,
        schemator = dataAdapter.schemator,
        DS = dataAdapter.DS;

    let Species = DS.defineResource({
        name: 'species',
        endpoint: 'species',
        relations: {
            hasMany: {
                sighting: {
                    localField: 'sightings',
                    localKeys: 'sightingIds'
                }
            }
        }
    });

    schemator.defineSchema('Species', {
        id: {type: 'string', nullable: false},
        commonName: {type: 'string', nullable: false},
        latinName: {type: 'string', nullable: true},
        habitat: {type: 'string', nullable: true}, // TODO: Write a rule to restrict this to a specific list of values       
        conservationStatus: {type: 'string', nullable: true},  // TODO: Write a rule to restrict this to a specific list of values
        threats: {type: 'string', nullable: true},
        description: {type: 'string', nullable: true},
        imageUrl: {type: 'string', nullable: true}
        // TODO: add 'type' or 'class' property(ies), (e.g., mammal, bird, reptile / rodent, songbird, snake, etc.)
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
        Species.findAll({}, options).then(cb);
    }

    function getById(id, query, cb){
        options = parseQuery(query);
        Species.find(id, options).then(cb);
    }

    function createSpecies(name, cb){
        let species = {
            id: uuid.v1(),
            commonName: name
        };
        let error = schemator.validateSync('Species', species);
        if (error){
            return cb(error);
        }
        Species.create(species).then(cb);        
    }
    
    module.exports = {
        getAll: getAll,
        getById: getById,
        create: createSpecies,
        Species: Species
    };

}());