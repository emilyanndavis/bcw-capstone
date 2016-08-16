     ;(function(){
     
  angular.module('wildlife')
     .component('animalComponent', {
         templateUrl:('app/components/animal/animal.html'),
         controller: AnimalController,
         controllerAs: 'ac',
         bindings: {
             animal: "<"
         }
     })

     AnimalController.$inject = ["$http"]

     function AnimalController($http) {
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

     }
}());   
        
        
        
        