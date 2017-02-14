(function() {
  'use strict';

  angular
    .module('votificationApp', [
      'votificationApp.routes',
      'votificationApp.authentication',
      'votificationApp.config',
      'votificationApp.layout',
      'votificationApp.polls',
    ]);

  angular
    .module('votificationApp.routes', [
      'ui.router'
    ]);

  angular
    .module('votificationApp.config', []);

  angular
    .module('votificationApp')
    .run(run);

  run.$inject = ['$http'];

  /**
   * @name run
   * @desc Update xsrf $http headers to align with Django's defaults
   */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }
})();
