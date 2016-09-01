; (function () {

  angular.module('wildlife')
    .service('UserAuthService', UserAuthService)


  UserAuthService.$inject = ['$http']



  function UserAuthService($http) {
    var as = this;
    var user;

    function handleResponse(res) {
      user = res.data;
    }

    as.getUser = function (cb) {
      if (user) {
        return cb(user);
      } else {
        as.getUserAuth().then(function () {
          as.getUser(cb);
        });
      }
    }

    as.getUserAuth = function () {
      return $http.get('/api/user').then(handleResponse)
    }

    as.login = function (user) {
      return $http.post('/api/users/login', user).then(handleResponse)
    }

    as.register = function (user) {
      return $http.post('/api/users/register', user).then(handleResponse)
    }

  }

} ());