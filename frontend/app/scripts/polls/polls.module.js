/**
 * Created by ishank on 7/2/17.
 */
(function(){
  'use strict';
  angular
    .module('votificationApp.votes', [
      'votificationApp.polls.controllers',
      'votificationApp.polls.services',

  ]);

  angular
    .module('votificationApp.votes.controllers', []);

  angular
    .module('votificationApp.votes.services', [
      'ngCookies',
      'ngResource'
    ]);
})();
