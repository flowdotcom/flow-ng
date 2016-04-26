'use strict';

/**
 * @ngdoc service
 * @name flowNgApp.users
 * @description
 * # users
 * Service in the flowNgApp.
 */
angular.module('flowNgApp')
  .service('Users', function (ConfigData, $log, $http) {

    this.getOneUser = function (id) {
      $log.debug('users service - getOneUser');
      return $http.get(ConfigData.apiEndpoint + 'users/' + id);
    };

    this.checkAuthorizations = function (mail) {
      $log.debug('users service - checkAuthorizations');
      return $http.get(ConfigData.apiEndpoint + 'users/authorization/check/' + mail);
    };

  });
