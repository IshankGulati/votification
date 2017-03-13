/**
 * Created by ishank on 8/2/17.
 */
/**
 * Polls
 * @namespace votificationApp.polls.services
 */
(function () {
  'use strict';

  angular.module('votificationApp.polls.services')
    .factory('Polls', Polls);

  Polls.$inject = ['$http'];

  /**
   * @namespace Polls
   * @param $http
   * @returns {Factory}
   */
  function Polls($http) {
    var Polls = {
      all: all,
      get: get,
      create: create
    }

    return Polls;


    /**
     * @name all
     * @desc get all polls
     * @returns {Promise}
     * @memberOf votificationApp.polls.services.Polls
     */
    function all() {
      return $http.get('/api/v1/polls/');
    }


    /**
     * @name get
     * @desc get polls created by a particular user
     * @param {string} username The username to get posts for
     * @returns {Promise}
     * @memberOf votificationApp.polls.services.Polls
     */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/polls/');
    }


    /**
     * @name create
     * @desc create a new poll
     * @param {string} content The content of new poll
     * @returns {Promise}
     * @memberOf votificationApp.polls.services.Polls
     */
    function create(content) {
      return $http.post('/api/v1/polls/', {
        content: content
      });
    }

    /**
     * @name vote
     * @desc submit a new vote
     * @param {string} content The content of new poll
     * @returns {Promise}
     * @memberOf votificationApp.polls.services.Polls
     */
    function vote() {

    }
  }
})();
