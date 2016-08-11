;(function(){

    let dataAdapter = require('./data-adapter'),
        uuid = dataAdapter.uuid,
        schemator = dataAdapter.schemator,
        DS = dataAdapter.DS;

    let Location = DS.defineResource({
        name: 'location',
        endpoint: 'location',
        relations: {
            hasMany: {
                sighting: {
                    localField: 'sightings',
                    localKeys: 'sightingIds'
                }
            }
        }
    });

    schemator.defineSchema('Location', {
        id: {type: 'string', nullable: false},
        name: {type: 'string', nullable: false}   
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
        Location.findAll({}, options).then(cb);
    }

    function getById(id, query, cb){
        options = parseQuery(query);
        Location.find(id, options).then(cb);
    }

    function createLocation(name, cb){
        let location = {
            id: uuid.v1(),
            name: name
        };
        let error = schemator.validateSync('Location', location);
        if (error){
            return cb(error);
        }
        Location.create(location).then(cb);        
    }
    
    module.exports = {
        getAll: getAll,
        getById: getById,
        create: createLocation,
        Location: Location
    };

}());