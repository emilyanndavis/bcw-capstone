;(function(){

  angular.module('wildlife')
    .service('WildlifeService', WildlifeService)

WildlifeService.$inject['$http'];

    function WildlifeService($http) {
      var ws = this;


      var config = {
        apiKey: "AIzaSyDtwXi9TtQ31HQtm4Tb3WyLOjFqTNVhE0Q",
        authDomain: "wildlife-sightings-2444a.firebaseapp.com",
        databaseURL: "https://wildlife-sightings-2444a.firebaseio.com",
        storageBucket: "wildlife-sightings-2444a.appspot.com",
    };
      var myFirebase = firebase.initializeApp(config);
      var db = myFirebase.database();
      var speciesList = db.ref('/species');
    

    function getWildlife() {
        $http.get(speciesList).then(function (res) {
            
        })
    }

    }
}())