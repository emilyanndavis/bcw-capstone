;(function(){

    angular.module('wildlife')
        .component('sightingComponent', {
            controller: SightingController,
            templateUrl: 'app/components/sighting/sighting.html'
        });

        SightingController.$inject = ['$http'];

        function SightingController($http) {

            let $ctrl = this;
            $ctrl.initializing = true;
            $ctrl.searching = false;
            $ctrl.filtering = false;
            $ctrl.results = [];

            $ctrl.search = function(){
                let baseUrl = 'api/species/name/'
                $http.get(baseUrl + $ctrl.query).then(function(res){
                    res.data.forEach(function(match){
                        $ctrl.results.push(match);
                    });
                });
                $ctrl.query = '';
            }

            $ctrl.filter = function(){
                let type = $ctrl.animalType;
                let size = $ctrl.animalSize;
                let baseUrl = 'api/species/type/';
                $http.get(baseUrl + type).then(function(res){
                    let typeMatches = res.data;
                    let sizeMatches = [];
                    typeMatches.forEach(function(species){
                        if (species.size.toLowerCase() == size.toLowerCase()){
                            sizeMatches.push(species);
                        }                    
                    });
                    sizeMatches.forEach(function(species){
                        $ctrl.results.push(species);    
                    });
                });
                $ctrl.animalType = '';                
                $ctrl.animalSize = '';   
            }

        }

}());