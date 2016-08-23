;(function(){

  angular.module('wildlife')
    .service('WildlifeService', WildlifeService)


    WildlifeService.$inject = ['$http']



    function WildlifeService($http) {
      var ws = this;

      ws.getWildlife = function(cb){
        $http.get('/api/species').then(cb)
      }

      ws.getWildlifeById = function(id, cb){
        
        $http.get('/api/species/' + id).then(cb)
      }

      ws.getWildlifeByType = function(type, cb){
        $http.get('/api/species/type/' + type).then(cb)
      }

      ws.getWildlifeByName = function(name, cb){
        $http.get('/api/species/name/' + name).then(cb)
      }

      ws.getWildlifeBySize = function(size, cb){
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
    


    }

}());