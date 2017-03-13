/**
 * IndexController
 * @namespace votificationApp.layout.controllers
 */
(function(){
  'use strict';
  angular
    .module('votificationApp.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['Authentication', 'Polls', '$scope'];
  /**
   * @namespace IndexController
   */
  function IndexController(Authentication, Polls, $scope) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.polls = [];

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when controller is instantiated
     * @memberOf votificationApp.layout.controllers.IndexController
     */
    function activate() {
      vm.polls = Polls.all()
        .then(pollsSuccessFn, pollsFailureFn);

      /**
       * @name pollsSuccessFn
       * @desc Update polls array
       */
      function pollsSuccessFn(data, status, headers, config) {
        vm.polls = data.data;
      }

      /**
       * @name pollsFailureFn
       * @desc displays error on console
       */
      function pollsFailureFn(data, status, headers, config) {
        console.error(data.error);
      }

      $scope.$on('post.created', function (event, post) {
        vm.polls.unshift(post);
      });

      $scope.$on('post.created.error', function (event, post) {
        vm.polls.shift();
      });
    }

  }
})();
