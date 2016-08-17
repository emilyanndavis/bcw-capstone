(function () {

  angular.module('wildlife')
    .component('loginComponent', {
      templateUrl: 'app/components/login/login.html',
      controller: LoginController
    })

    LoginController.$inject = ['userAuthService', '$state'];

  function LoginController(userAuthService, $state) {
    var $ctrl = this;
    $ctrl.loggedIn = userAuthService.getOwner();

    this.login = function (email, password) {
      userAuthService.setOwner(email,password);
      $ctrl.loggedIn = true;
      $state.go('map')
    }

    this.logout = function () {
      userAuthService.logout();
      $ctrl.loggedIn = false;
      $state.go('home')
    }
  }

} ())