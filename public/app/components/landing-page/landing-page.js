(function () {

  angular.module('wildlife')
    .component('landingPageComponent', {
      templateUrl: 'app/components/landing-page/landing-page.html',
      controller: LandingPageController
    })

    LandingPageController.$inject = ['$state'];

  function LandingPageController($state) {
    var $ctrl = this;
    
  }

} ())