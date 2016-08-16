;(function(){

    angular.module('wildlife')
        .component('sighting', {
            controller: SightingController,
            templateUrl: 'app/components/sighting/sighting.html'
        });

        SightingController.$inject = ['$http'];

        function SightingController($http) {

            let $ctrl = this;
            $ctrl.initializing = true;
            $ctrl.searching = false;
            $ctrl.filtering = false;

            $ctrl.search = function(){
                let baseUrl = 'api/species/name/'
                $http.get(baseUrl + $ctrl.query).then(function(res){
                    console.log(res.data.length);
                    res.data.forEach(function(match){
                        console.log(match.commonName);
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
                    // console.log(typeMatches.length);
                    typeMatches.forEach(function(species){
                        // console.log(species.commonName);
                        if (species.size.toLowerCase() == size.toLowerCase()){
                            sizeMatches.push(species);
                        }                    
                    });
                    console.log(`Number of matches for ${size} ${type}s: ${sizeMatches.length}`);
                    sizeMatches.forEach(function(species){
                        console.log(species.commonName);
                    });
                });
                $ctrl.animalType = '';                
                $ctrl.animalSize = '';   
            }

        }

}());