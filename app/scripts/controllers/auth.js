'use strict';

/**
 * @ngdoc function
 * @name flowNgApp.controller:LoginCtrl
 * @description
 * # AboutCtrl
 * Controller of the flowNgApp
 */
angular.module('flowNgApp')
  .controller('LoginCtrl', function ($scope, $auth, $window, $rootScope, $log) {

    $log.debug('LoginCtrl - initialize');

    $scope.messages = [];

    $scope.login = function () {
      $auth.login({email: $scope.email, password: $scope.password}).then(function (response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        $log.debug('LoginCtrl - authentication - success');
      }).catch(function (response) {
        $scope.messages = [];
        angular.forEach(response.data, function (message) {
          $scope.messages.push(message[0]);
          $log.debug('LoginCtrl - authentication - failed - ' + message[0]);
        });
      });
    };

    $scope.isAuthenticated = function () {
      return $auth.isAuthenticated();
    };
  })

  .controller('LogoutCtrl', function ($scope, $auth, $state, $log) {
    if (!$auth.isAuthenticated()) {
      $log.debug('LoginCtrl - logout - not logged');
      return;
    }
    $auth.logout().then(function () {
      $log.debug('LoginCtrl - logout - success');
      $state.go('login', {}, {reload: true});
    });
  });
