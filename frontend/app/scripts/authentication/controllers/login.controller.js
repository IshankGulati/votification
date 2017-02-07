(function(){
  'use strict';

  angular
    .module('votificationApp.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'Authentication'];

  function LoginController($location, $scope, Authentication) {
    var vm = this;

    vm.login = login;
    vm.loginFailed = false;

    activate();

    function activate() {
      vm.loginFailed = false;
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    function login() {
      Authentication.login(vm.email, vm.password);
    }

    $scope.$on('login:success', function () {
      vm.loginFailed = false;
    });

    $scope.$on('login:failure', function () {
      vm.loginFailed = true;
    });
  }
})();
