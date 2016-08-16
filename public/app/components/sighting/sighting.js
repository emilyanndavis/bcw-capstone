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
            $ctrl.query = '';
            $ctrl.animalType = '';
            $ctrl.animalSize = '';

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

            // $ctrl.filterByType = function(){
            //     let baseUrl = 'api/species/type/'
            //     $http.get(baseUrl + $ctrl.animalType).then(function(res){
            //         console.log(res.data.length);
            //         res.data.forEach(function(match){
            //             console.log(match.commonName);
            //         });
            //     });
            //     $ctrl.animalType = '';                
            // }

            // $ctrl.filterBySize = function(){
            //     let baseUrl = 'api/species/size/'
            //     $http.get(baseUrl + $ctrl.animalSize).then(function(res){
            //         console.log(res.data.length);
            //         res.data.forEach(function(match){
            //             console.log(match.commonName);
            //         });
            //     });
            //     $ctrl.animalSize = '';   
            // }

            $ctrl.filter = function(){
                debugger;
                let baseUrl = 'api/species/type/'
                $http.get(baseUrl + $ctrl.animalType).then(function(res){
                    let typeMatches = res.data;
                    let sizeMatches = [];
                    console.log(typeMatches.length);
                    typeMatches.forEach(function(species){
                        console.log(species.commonName);
                        if (species.size.toLowerCase() == $ctrl.animalSize.toLowerCase()){
                            sizeMatches.push(species);
                        }                    
                    });
                    console.log(sizeMatches.length);
                    sizeMatches.forEach(function(species){
                        console.log(species.commonName);
                    });
                });
                $ctrl.animalType = '';                
                $ctrl.animalSize = '';   
            }

        }

}());