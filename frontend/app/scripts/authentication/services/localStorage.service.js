(function(){
  'use strict';
  angular
    .module('votificationApp.authentication.services')
    .factory('$localStorage', $localStorage);

  $localStorage.$inject = ['$window'];

  function $localStorage($window) {
    var $localStorage = {
      store : store,
      get : get,
      storeObject : storeObject,
      getObject : getObject,
      remove : remove
    };

    return $localStorage;

    function store(key, value) {
      $window.localStorage[key] = value;
    }

    function get(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    }

    function storeObject(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    }

    function getObject(key, defaultValue) {
      return JSON.parse($window.localStorage[key] || defaultValue);
    }

    function remove(key) {
      $window.localStorage.removeItem(key);
    }
  }
})();