;(function(){

  angular.module('wildlife')
    .service('WildlifeService', WildlifeService)


    function WildlifeService() {
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
    

    function getWildlife(cb) {
        ws.get(speciesList).then(function (res) {
            cb(res.val());
        })
    }

    }
}())