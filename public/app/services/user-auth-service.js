;(function(){

  angular.module('wildlife')
    .service('UserAuthService', UserAuthService)


    UserAuthService.$inject = ['$http']



    function UserAuthService($http) {
      var $ctrl = this;

    }

}());