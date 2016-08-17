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

    FieldguideController.$inject = ["$http", "WildlifeService"]

    function FieldguideController($http, WildlifeService){
      var fc = this;
      fc.fieldguide = [];

      // fc.$onInit = function() {
      //       $http.get("api/species").then(function(res){
      //         console.log(res.data); 
      //         res.data.forEach(function(species){
      //             fc.fieldguide.push(species);
      //         })
      //     })
      // }

      fc.$onInit = WildlifeService.getWildlife(function(res){
        fc.fieldguide = res.data
      })
    }

}())