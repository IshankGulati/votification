/**
 * Created by ishank on 13/2/17.
 */
/**
 * Polls
 * @namespace votificationApp.polls.directives
 */
(function () {
  'use strict';

  angular
    .module('votificationApp.polls.directives')
    .directive('polls', polls);

  /**
   * @namespace polls
   */
  function polls() {
    var directive = {
      controller: 'PollsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        'polls': '='
      },
      templateUrl: '/static/templates/polls/polls.html'
    };

    return directive;
  }
})();
