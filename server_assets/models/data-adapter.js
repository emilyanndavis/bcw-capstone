;(function(){

    let uuid = require('node-uuid'),
        JSData = require('js-data'),
        Schemator = require('js-data-schema'),
        schemator = new Schemator(),
        DSNedbAdapter = require('js-data-nedb'),
        adapter = new DSNedbAdapter(),
        DS = new JSData.DS();

    DS.registerAdapter('nedb', adapter, {default: true});

    module.exports = {
        DS,
        uuid,
        schemator
    };

}());