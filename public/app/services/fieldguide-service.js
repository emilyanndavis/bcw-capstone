;(function(){

  angular.module('wildlife')
    .service('WildlifeService', WildlifeService)

    WildlifeService.$inject = ['$http']

    function WildlifeService($http) {
      var ws = this;

      wc.getWildlife = function(cb){
        $http.get('/api/species').then(cb)
      }

      wc.getWildlifeById = function(id, cb){
        $http.get('/api/species/' + id).then(cb)
      }

      wc.getWildlifeByType = function(type, cb){
        //Returns an Array
        $http.get('/api/species/type/' + type).then(cb)
      }

      wc.getWildlifeByName = function(name, cb){
        //Returns an Array
        $http.get('/api/species/name/' + name).then(cb)
      }

      wc.getWildlifeBySize = function(size, cb){
        //Returns an Array
        $http.get('/api/species/size/' + size).then(cb)
      }


    //   var config = {
    //     apiKey: "AIzaSyDtwXi9TtQ31HQtm4Tb3WyLOjFqTNVhE0Q",
    //     authDomain: "wildlife-sightings-2444a.firebaseapp.com",
    //     databaseURL: "https://wildlife-sightings-2444a.firebaseio.com",
    //     storageBucket: "wildlife-sightings-2444a.appspot.com",
    //   };
    //   var myFirebase = firebase.initializeApp(config);
    //   var db = myFirebase.database();
    //   var speciesList = db.ref('/species');
    

    // function getWildlife(cb) {
    //     ws.get(speciesList).then(function (res) {
    //         cb(res.val());
    //     })
    // }

    }

}());