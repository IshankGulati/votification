(function(){
  'use strict';
  angular
    .module('votificationApp.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$rootScope', 'Authentication'];

  function IndexController($scope, $rootScope, Authentication) {
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
