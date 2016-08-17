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
            species: []
        };
        Species.findAll().then(function(speciesList){
            speciesList.forEach(function(species){
                var logEntry = {
                    speciesId: species.id,
                    logged: false
                }
                logBook.species.push(logEntry);
            });
            logBook.id = userId;
            LogBook.create(logBook).then(cb);
        });
    }

    
    module.exports = {
        LogBook: LogBook,
        create: createLogBook
    };

}());