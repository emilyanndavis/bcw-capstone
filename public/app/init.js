;(function(){

    angular.module('wildlife', [])
        .component('wildlife', {
            controller: WildlifeController,
            template: `
                <h2>Squeak squeaker squeak squeaken.</h2>
                <button ng-click="$ctrl.getSpecies()">Click me!</button>
                `
        });

        function WildlifeController(){
            let $ctrl = this;

            $ctrl.getSpecies = function(){
                console.log('Species coming soon. Check back later!')
            }

        }

}());