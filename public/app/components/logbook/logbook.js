;(function(){

  angular.module('wildlife')
    .component ('logbookComponent', {
        templateUrl: 'app/components/logbook/logbook.html',
        controller: LogbookController,
        controllerAs: 'lc'
    })

    LogbookController.$inject = ['$http'];

    function LogbookController($http) {
        var lc = this;
        lc.logbook = [];

        lc.$onInit = function() {
            $http.get("api/species").then(function(res){
              console.log(res.data); 
              res.data.forEach(function(species){
                  lc.logbook.push(species);
              })
          })
        }
    }



}());