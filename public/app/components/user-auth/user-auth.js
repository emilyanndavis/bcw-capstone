(function () {

  angular.module('wildlife')
    .component('userAuthComponent', {
      templateUrl: 'app/components/user-auth/user-auth.html',
      controller: UserAuthController
    })

    UserAuthController.$inject = ['$state'];
    

  function UserAuthController($state) {
    var $ctrl = this;
    // $ctrl.loggedIn = UserAuthService.getUser();
    
    $ctrl.landingPage = true;
    $ctrl.registering = false;

    $ctrl.login = function (email, password) {
    //   UserAuthService.setUser(email,password);
      $ctrl.loggedIn = true;
      $state.go('map')
    }
    
    $ctrl.logout = function () {
    //   UserAuthService.logout();
      $ctrl.loggedIn = false;
      $state.go('home')
    }


    $ctrl.register = function (email, password) {
    //   UserAuthService.saveUser(email,password);
      $state.go('map')
    }
  }

} ())