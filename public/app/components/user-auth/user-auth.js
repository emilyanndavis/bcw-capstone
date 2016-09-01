(function () {

  angular.module('wildlife')
    .component('userAuthComponent', {
      templateUrl: 'app/components/user-auth/user-auth.html',
      controller: UserAuthController
    })

    UserAuthController.$inject = ['$state', 'UserAuthService'];
    

  function UserAuthController($state, UserAuthService) {
    var $ctrl = this;
    UserAuthService.getUser(function(user){
      $ctrl.loggedIn = true;
      $ctrl.user = user;

    });
    
    $ctrl.landingPage = true;
    $ctrl.login = true;
    $ctrl.registering = false;

    $ctrl.login = function (user) {
      UserAuthService.login(user).then(function(){
        $state.go('map')
      });;
    }
    
    $ctrl.logout = function () {
      UserAuthService.logout();
      $ctrl.loggedIn = false;
      $state.go('home')
    }


    $ctrl.register = function (user) {
      UserAuthService.register(user).then(function(){
        $state.go('map')
      });
    }
  }

} ())