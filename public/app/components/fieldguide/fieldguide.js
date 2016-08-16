(function(){

  angular.module('wildlife')
    .component('fieldguideComponent', {
      templateUrl: 'app/components/fieldguide/fieldguide.html',
      controller: FieldguideController,
      controllerAs: 'fc',
      bindings: {
        logging: '<'
      }
    })

    FieldguideController.$inject = ["$http"]

    function FieldguideController($http){
      var fc = this;
      fc.fieldguide = [];

      fc.$onInit = function() {
            $http.get("api/species").then(function(res){
              console.log(res.data); 
              res.data.forEach(function(species){
                  fc.fieldguide.push(species);
              })
          })
      }
    }

}())