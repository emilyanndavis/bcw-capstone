;(function(){

    let uuid = require('node-uuid'),
        JSData = require('js-data'),
        Schemator = require('js-data-schema'),
        schemator = new Schemator(),
        FirebaseAdapter = require('js-data-firebase'),
        adapter = new FirebaseAdapter({
            basePath: process.env.DBCONNECTION || 'https://wildlife-sightings-2444a.firebaseio.com/'
        }),
        DS = new JSData.DS();

    DS.registerAdapter('firebase', adapter, {default: true});

    module.exports = {
        DS,
        uuid,
        schemator
    };

}());