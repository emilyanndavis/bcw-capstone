;(function(){

  angular.module('wildlife')
    .component ('logbookComponent', {
        templateUrl: 'app/components/logbook/logbook.html',
        controller: "LogbookComponent",
        controllerAs: 'lc'
    })

    function LogbookComponent() {
        var lc = this;

        lc.$onInit = function() {
            
        }
    }



}());