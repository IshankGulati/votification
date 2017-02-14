(function(){
  'use strict';

  angular
    .module('votificationApp.routes', ['ui.router'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'navbar': {
            templateUrl: '/static/views/layout/navbar.html',
            controller: 'NavbarController',
            controllerAs: 'vm'
          },
          'header': {
            templateUrl: '/static/views/layout/header.html',
          },
          'content' : {
            templateUrl: '/static/views/layout/index.html',
            controller: 'IndexController',
            controllerAs: 'vm'
          }
        }
      })
      .state('home.register', {
        url: 'register',
        views: {
          'content@': {
            templateUrl: '/static/views/authentication/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
          }
        }
      })
      .state('home.login', {
        url: 'login',
        views: {
          'content@' : {
            templateUrl: '/static/views/authentication/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        }
      })
      .state('profile', {
        url : '/:username',
        views : {
          'content' : {
            templateUrl : '/static/views/profiles/profile.html',
            controller : 'ProfileController',
            controllerAs : 'vm'
          }
        }
      })
      ;

    $urlRouterProvider.otherwise('/');
  }
})();
