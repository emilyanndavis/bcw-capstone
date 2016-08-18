     ;(function(){
     
  angular.module('wildlife')
     .component('animalComponent', {
         templateUrl:('app/components/animal/animal.html'),
         controller: AnimalController,
         controllerAs: 'ac',
         bindings: {
             animal: "<",
             logging: '<',
             logged: '<'
         }
     })

     AnimalController.$inject = ["$http", '$state']

     function AnimalController($http, $state) {
         var ac = this;
         ac.showingModal = false;

         ac.viewAnimal = function(id) {
            $http.get("api/species/" + id).then(function(res){
                console.log(res.data);
                ac.showingModal = true;
            })
          
         }

        ac.closeModal = function() {
            ac.showingModal = false;
        }

        // hard-coded logBookId for testing. should be retrieved dynamically based on user data.
        ac.logSighting = function(speciesId) {
            $http.put('api/logbooks', {logBookId: '6tOKhTydfJhXOTwxvgc3Nw8Dzt92', speciesId: speciesId}).then(function(){
                $state.go('logBook');
            });
        }

     }
}());   
        
        
        
        