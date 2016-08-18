;(function(){

  angular.module('wildlife')
    .component ('logbookComponent', {
        templateUrl: 'app/components/logbook/logbook.html',
        controller: LogbookController,
        controllerAs: 'lc'
    })

    LogbookController.$inject = ['$http', '$state'];

    function LogbookController($http, $state) {
        var lc = this;
        lc.fieldguide = [];
        lc.logbook = {};

        // lc.$onInit = function() {
        //     $http.get("api/species").then(function(res){
        //       console.log(res.data); 
        //       res.data.forEach(function(species){
        //           lc.logbook.push(species);
        //       })
        //   })
        // }


    // gets & makes a local copy of the fieldguide (w/ all species details)
    // and of a specific user's logbook (using a hardcoded id right now)
    // then uses the logbook to set the 'logged' property of each species
    // which then controls the view (image vs. placeholder) by passing a binding to the animal controller 

    // realistically, this function should use a service to get the fieldguide
    // ...but this will work for now!


        lc.$onInit = function() {
            $http.get('api/logbooks/6tOKhTydfJhXOTwxvgc3Nw8Dzt92').then(function(res){
                for (var speciesId in res.data.species) {
                    var logEntry = Object.assign({}, res.data.species[speciesId]);
                    lc.logbook[speciesId] = logEntry;
                }
                $http.get('api/species').then(function(res){
                    res.data.forEach(function(species){
                        var speciesCopy = Object.assign({}, species);
                        lc.fieldguide.push(speciesCopy);
                        lc.fieldguide.forEach(function(species){
                            species.logged = lc.logbook[species.id].logged;                            
                        });
                    });
                });
            });
        }

      lc.goToFieldGuide = function(){
        $state.go('fieldGuide');
      }

      lc.goToMap = function(){
        $state.go('map');
      }
        


    }



}());