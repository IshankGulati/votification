(function(){
  'use strict';
  angular
    .module('votificationApp.layout.controllers')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$rootScope', 'Authentication'];

  function HeaderController($scope, $rootScope, Authentication) {
    var vm = this;
    vm.loggedIn = false;
    vm.logout = logout;
    vm.username = '';

    activate();

    function activate() {
      console.log(Authentication.isAuthenticated());
      if(Authentication.isAuthenticated()) {
        vm.loggedIn = true;
        vm.username = Authentication.getUserName();
        console.log(vm.username);
      }
    }

    function logout() {
      Authentication.logout();
      vm.loggedIn = false;
      vm.username = '';
    }

    $rootScope.$on('registration:successful', function() {
      activate();
    });

    $rootScope.$on('login:successful', function() {
      activate();
    });

  }
})();
