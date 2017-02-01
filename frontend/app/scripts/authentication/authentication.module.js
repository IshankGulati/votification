(function (){
  'use strict';

  angular
    .module('votificationApp.authentication',[
      'votificationApp.authentication.controllers',
      'votificationApp.authentication.services'
    ]);

  angular
    .module('votificationApp.authentication.controllers', []);

  angular
    .module('votificationApp.authentication.services', [
      'ngCookies',
      'ngResource'
    ]);
})();
