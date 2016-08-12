;(function(){

    angular.module('wildlife', [])
        .component('wildlife', {
            controller: WildlifeController,
            templateUrl: 'app/wildlife.html'
        });

        function WildlifeController($http){
            let $ctrl = this;

            $ctrl.getSpecies = function(){
                $http.get('/api/species').then(function(res){
                    console.log('Number of species in DB: ' + res.data.length);
                });
                // console.log('Species coming soon. Check back later!');
            }

            $ctrl.species = {};
            $ctrl.species.stateProtected = false;

            $ctrl.addSpecies = function(){
                console.log('Creating species...');
                console.log($ctrl.species);
                $http.post('/api/species', $ctrl.species).then(function(res){
                    console.log(res.data);
                    $ctrl.species = {};
                    $ctrl.species.stateProtected = false;
                    console.log('Species created!');
                });
            }
        }

}());