;(function(){

  angular.module('wildlife')
    .service('UserAuthService', UserAuthService)


    UserAuthService.$inject = ['$http']



    function UserAuthService($http) {
      var as = this;

      as.getUser = function(){
        $http.get('/api/user')
      }

      as.login = function(user){
        $http.post('/api/user', user)
      }

      as.register = function(user){
        http.post('/users/register', user)
      }

    }

}());