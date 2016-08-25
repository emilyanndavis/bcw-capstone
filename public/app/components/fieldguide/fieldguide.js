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

    FieldguideController.$inject = ["$http", '$state', "WildlifeService"]

    function FieldguideController($http, $state, WildlifeService){
      var fc = this;
      fc.fieldguide = [];
      fc.results = [];

      // fc.$onInit = function() {
      //       $http.get("api/species").then(function(res){
      //         console.log(res.data); 
      //         res.data.forEach(function(species){
      //             fc.fieldguide.push(species);
      //         })
      //     })
      // }

         fc.search = function(){
                let baseUrl = 'api/species/name/'
                $http.get(baseUrl + fc.query).then(function(res){
                    res.data.forEach(function(match){
                        fc.results.push(match);
                    });
                });
                fc.query = '';
            }  

      fc.goToLogBook = function(){
        $state.go('logBook');
      }

      fc.goToMap = function(){
        $state.go('map');
      }

      fc.$onInit = WildlifeService.getWildlife(function(res){
        fc.fieldguide = res.data
      })
    }

}())