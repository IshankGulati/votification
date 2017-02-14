/**
 * Created by ishank on 7/2/17.
 */
/**
 * PollsController
 * @namespace votificationApp.polls.controllers
 */
(function () {
  'use strict';

  angular
    .module('votificationApp.polls.controllers')
    .controller('PollsController', PollsController);

  PollsController.$inject = ['$scope'];

  /**
   * @namespace PollsController
   */
  function PollsController($scope) {
    var vm = this;

    vm.columns = [];

    activate();

    /**
     * @name activate
     * @desc Actions to be perforemed on instantiation of controller
     * @memberOf votificationApp.polls.controllers.PollsController
     */
    function activate() {
      $scope.$watchCollection(function () {
        return $scope.polls;
      }, render);

      $scope.$watch(function () {
        return $(window).width();
      }, render);
    }

    /**
     * @name calculateNumberOfColumns
     * @desc Calculate number of columns based on screen width
     * @returns {number} Number of columns containing polls
     * @memberOf votificationApp.polls.controllers.PollsController
     */
    function calculateNumberOfColumns() {
      // display only one column right now
      return 1;
    }

    /**
    * @name approximateShortestColumn
    * @desc An algorithm for approximating which column is shortest
    * @returns The index of the shortest column
    * @memberOf votificationApp.polls.controllers.PollsController
    */
    function approximateShortestColumn() {
      var scores = vm.columns.map(columnMapFn);

      return scores.indexOf(Math.min.apply(this, scores));


      /**
       * @name columnMapFn
       * @desc A map function for scoring column heights
       * @returns The approximately normalized height of a given column
       */
      function columnMapFn(column) {
        var lengths = column.map(function (element) {
          return element.content.length;
        });

        return lengths.reduce(sum, 0) * column.length;
      }


      /**
       * @name sum
       * @desc Sums two numbers
       * @params {Number} m The first number to be summed
       * @params {Number} n The second number to be summed
       * @returns The sum of two numbers
       */
      function sum(m, n) {
        return m + n;
      }
    }

    /**
    * @name render
    * @desc Renders Polls into columns of approximately equal height
    * @param {Array} current The current value of `vm.polls`
    * @param {Array} original The value of `vm.polls` before it was updated
    * @memberOf votificationApp.polls.controllers.PollsController
    */
    function render(current, original) {
      if (current !== original) {
        vm.columns = [];

        for (var i = 0; i < calculateNumberOfColumns(); ++i) {
          vm.columns.push([]);
        }

        for (var i = 0; i < current.length; ++i) {
          var column = approximateShortestColumn();

          vm.columns[column].push(current[i]);
        }
      }
    }
  }

})();
