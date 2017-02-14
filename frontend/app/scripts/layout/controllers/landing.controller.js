/**
 * Created by ishank on 7/2/17.
 */
(function(){
  'use strict';
  angular
    .module('votificationApp.layout.controllers')
    .controller('LandingController', LandingController);

  LandingController.$inject = ['$scope', '$rootScope', 'Authentication'];

  function LandingController($scope, $rootScope, Authentication) {
    var vm = this;
    vm.loggedIn = false;

    activate();

    function activate() {
      if(Authentication.isAuthenticated()) {
        vm.loggedIn = true;
      }
    }

    $rootScope.$on('login:successful', function(){
      activate();
    });

    $rootScope.$on('logout:successful', function(){
      vm.loggedIn = false;
    });
  }
})();
