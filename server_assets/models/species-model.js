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

    // TODO: Get this rule working (not super high priority though)
    schemator.defineRule('isValidOption', function (value, optionsArr, cb) {
    // artificial asynchronicity
        setTimeout(function () {
            if (optionsArr.indexOf(value) === -1) {
                cb({
                    rule: 'isValidOption',
                    actual: '' + value + ', which is not a valid option',
                    expected: 'one of the following: ' + optionsArr
                });
            }
            cb(null);
        }, 1);
    }, true);     

    schemator.defineSchema('Species', {
        id: {type: 'string', nullable: false},
        commonName: {type: 'string', nullable: false},
        scientificName: {type: 'string', nullable: false},
        category: {
            type: 'string', 
            isValidOption: ['bird', 'mammal', 'reptile', 'bug'],
            nullable: false
        },
        size: {
            type: 'string', 
            isValidOption: ['small', 'medium', 'large'], 
            nullable: false
        },
        conservationStatus: {type: 'string', nullable: true},  // TODO: Write a rule to restrict this to a specific list of values
        stateProtected: {type: 'boolean', nullable: true},
        description: {type: 'string', nullable: false},
        imageUrl: {type: 'string', nullable: false}
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

    function createSpecies(commonName, scientificName, category, size, conservationStatus, stateProtected, description, imageUrl, cb){
        let species = {
            id: uuid.v1(),
            commonName: commonName,
            scientificName: scientificName, 
            category: category,
            size: size,
            conservationStatus: conservationStatus,
            stateProtected: stateProtected,
            description: description,
            imageUrl: imageUrl
        };
        let count = 0;
        schemator.getSchema('Species').validate(species, function(errors){
            // while loop executes only once, to avoid sending the response twice
            while (count === 0) {
                count++;
                if (errors){
                    cb(errors);
                } else {
                    Species.create(species).then(cb);
                }
            }
        });       
    }
    
    module.exports = {
        getAll: getAll,
        getById: getById,
        create: createSpecies,
        Species: Species
    };

}());