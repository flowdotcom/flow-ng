'use strict';

/**
 * @ngdoc function
 * @name flowNgApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the flowNgApp
 */
angular.module('flowNgApp')
  .controller('AppCtrl', function ($rootScope, $scope, $log, $window, JqueryCoreService) {
    $log.debug('AppCtrl - initialize');

    $log.debug('AppCtrl - check cached data');

    //clear cache

    $log.debug('AppCtrl - data not present in cache');

    //call service + store local storage

    $log.debug('AppCtrl - data stored successfully');


    $log.debug('AppCtrl - JqueryCoreService initialize');
    JqueryCoreService.initialize();
  });
