;(function(){

    let dataAdapter = require('./data-adapter'),
        uuid = dataAdapter.uuid,
        schemator = dataAdapter.schemator,
        DS = dataAdapter.DS;

    let Species = require('./species-model').Species;

    let LogBook = DS.defineResource({
        name: 'logbook',
        endpoint: 'logbooks',
        relations: {
            belongsTo: {
                user: {
                    localField: 'user',
                    foreignKey: 'userId'
                }
            }
        }
    });

    function createLogBook(userId, cb) {
        let logBook = {
            species: {}
        };
        Species.findAll().then(function(speciesList){
            speciesList.forEach(function(species){
                var logEntry = {
                    speciesId: species.id,
                    logged: false
                }
                logBook.species[species.id] = logEntry;
            });
            logBook.id = userId;
            LogBook.create(logBook).then(cb);
        });
    }

    function getAll(cb){
        LogBook.findAll().then(cb);
    }

    function getById(id, cb){
        LogBook.find(id).then(cb);
    }    

    function logSpecies(logBookId, speciesId,location, cb) {
        LogBook.find(logBookId).then(function(logbook){
            logbook.species[speciesId].logged = true;
            logbook.species[speciesId].location = location;
            LogBook.update(logBookId, logbook).then(cb);
        });
    }

    module.exports = {
        LogBook: LogBook,
        create: createLogBook,
        getAll: getAll,
        getById: getById,
        logSpecies: logSpecies
    };

}());