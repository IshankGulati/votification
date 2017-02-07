(function(){
  'use strict';

  angular
    .module('votificationApp.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$http', '$cookies', '$rootScope', '$localStorage'];

  function Authentication($http, $cookies, $rootScope, $localStorage) {

    var TOKEN_KEY = 'Token';
    var authToken = undefined;
    var isauthenticated = false;
    var username = '';

    var Authentication = {
      register: register,
      login: login,
      logout: logout,
      isAuthenticated: isAuthenticated,
      storeUserCredentials: storeUserCredentials,
      unauthenticate: unauthenticate,
      getUserName: getUserName,
      checkUniqueValue: checkUniqueValue,
    };

    loadUserCredentials();

    return Authentication;

    function useCredentials(credentials) {
      console.log('use called');
      isauthenticated = true;
      username = credentials.username;
      authToken = 'Token ' + credentials.token;

      // Set the token as header for your requests!
      $http.defaults.headers.common['Authorization'] = authToken;
    }

    function loadUserCredentials() {
      var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
      if (credentials.username !== undefined) {
          useCredentials(credentials);
      }
    }

    function storeUserCredentials(credentials) {
      console.log('store called');
      $localStorage.storeObject(TOKEN_KEY, credentials);
      useCredentials(credentials);
    }

    function destroyUserCredentials() {
      authToken = undefined;
      username = '';
      isauthenticated = false;
      $http.defaults.headers.common['Authorization'] = authToken;
      $localStorage.remove(TOKEN_KEY);
    }

    function register(email, password, username) {
      console.log(username);
      console.log(password);
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      }).then(registerSuccessFn, registerErrorFn);

      function registerSuccessFn(data, status, headers, config) {
        $rootScope.$broadcast('registration:successful');
        Authentication.login(email, password);
      }

      function registerErrorFn(data, status, login, config) {
        console.error(data);
        console.error('Registration failure!!');
        $rootScope.$broadcast('registration:failure');
      }
    }

    function login(email, password) {
      console.log('login called');
      return $http.post('/api/v1/auth/login/', {
        email: email,
        password: password
      }).then(loginSuccessFn, loginErrorFn);

      function loginSuccessFn(data, status, headers, config) {
        $rootScope.$broadcast('login:successful');
        console.log('login success');
        console.log(data.data);
        console.log(data.data.email);
        console.log(data.data.token);
        Authentication.storeUserCredentials({
          email : data.data.email,
          username : data.data.username,
          token : data.data.token,
        });
        window.location = '/';
      }

      function loginErrorFn(data, status, headers, config) {
        console.error('Login failure!');
        $rootScope.$broadcast('login:failure');
      }
    }

    function isAuthenticated() {
      return isauthenticated;
    }

    function unauthenticate() {
      destroyUserCredentials();
    }

    function logout() {
      return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

      function logoutSuccessFn(data, status, headers, config) {
        $rootScope.$broadcast('logout:successful');
        Authentication.unauthenticate();
        window.location = '/';
      }

      function logoutErrorFn(data, status, headers, config) {
        console.error('Logout failure!!');
      }
    }

    function getUserName() {
      return username;
    }

    function checkUniqueValue(id, property, value) {
      return $http.post('/api/v1/auth/check-unique-val/', {
        id: id,
        property: property,
        value: value
      }).then(function (response) {
        return response.data.isUnique;
      });
    }
  }
})();
