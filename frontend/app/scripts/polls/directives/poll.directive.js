/**
 * Created by ishank on 13/2/17.
 */
/**
* poll
* @namespace votificationApp.polls.directives
*/
(function () {
  'use strict';

  angular
    .module('votificationApp.polls.directives')
    .directive('poll', poll);

  /**
  * @namespace poll
  */
  function poll() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf votificationApp.polls.directives.poll
    */
    var directive = {
      controller: 'PollController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        poll: '='
      },
      templateUrl: '/static/templates/polls/poll.html'
    };

    return directive;
  }
})();
