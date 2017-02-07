(function (){
  'use strict';

  angular
    .module('votificationApp.authentication',[
      'votificationApp.authentication.controllers',
      'votificationApp.authentication.services',
      'votificationApp.authentication.directives',
    ]);

  angular
    .module('votificationApp.authentication.controllers', []);

  angular
    .module('votificationApp.authentication.services', [
      'ngCookies',
      'ngResource'
    ]);

  angular
    .module('votificationApp.authentication.directives', []);
})();
