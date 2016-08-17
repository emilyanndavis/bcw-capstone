(function () {

  angular.module('wildlife')
    .component('registerComponent', {
      templateUrl: 'app/components/register/register.html',
      controller: RegisterController
    })

    RegisterController.$inject = ['userAuthService','$state'];

  function RegisterController(userAuthService, $state) {
    var $ctrl = this;
    $ctrl.landingPage = true;
    $ctrl.registering = false;

    $ctrl.register = function (email, password) {
      userAuthService.setOwner(email,password);
      $ctrl.registering = true;
      $state.go('map')
    }

  }

} ())