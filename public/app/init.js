;(function(){

    angular.module('wildlife', ['ui.router'])
    
        //ROUTING CONFIG
        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    component: 'wildlife'
                })
                .state('map', {
                    url: '/map',
                    component: 'mapComponent'
                })
                .state('fieldGuide', {
                    url: '/fieldGuide',
                    component: 'fieldGuideComponent'
                })
                    .state('fieldGuide.detail', {
                        url: '/fieldGuide/:id',
                        component: 'fieldGuideComponent'
                    })

                .state('logBook', {
                    url: '/logBook',
                    component: 'logBookComponent'
                })
                    .state('logBook.detail', {
                        url: '/logBook/:id',
                        component: 'logBookComponent'
                    })

                .state('sighting', {
                    url: '/sighting',
                    component: 'sightingComponent'
                })
                    .state('sighting.search', {
                        url: '/sighting/search',
                        component: 'sightingComponent'
                    })                
                    .state('sighting.filter', {
                        url: '/sighting/filter',
                        component: 'sightingComponent'
                    })   
                    .state('sighting.results', {
                        url: '/sighting/results',
                        component: 'sightingComponent'
                    }) 
                    .state('sighting.logIt', {
                        url: '/sighting/logIt',
                        component: 'sightingComponent'
                    }) 

		})



// WILDLIFE COMPONENT: just an html form used to initially populate the species database
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
// END WILDLIFE COMPONENT        

        

}());