; (function () {

angular.module('wildlife')
    .factory('Initializer', function($window, $q){

        // maps loader deferred object
        var mapsDefer = $q.defer();

        // Google's url for async maps initialization accepting callback function
        var asyncUrl = 'https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyBYGiQ2yoXxY6DleZHtxei0XSBqEABqOn8&v=3&callback=';

        // async loader
        var asyncLoad = function(asyncUrl, callbackName) {
          var script = document.createElement('script');
          //script.type = 'text/javascript';
          script.src = asyncUrl + callbackName;
          document.body.appendChild(script);
        };

        // callback function - resolving promise after maps successfully loaded
        $window.googleMapsInitialized = function () {
            mapsDefer.resolve();
        };

        // loading google maps
        asyncLoad(asyncUrl, 'googleMapsInitialized');

        return {

            // usage: Initializer.mapsInitialized.then(callback)
            mapsInitialized : mapsDefer.promise
        };
    })


} ());