'use strict';

/**
 * @ngdoc overview
 * @name flowNgApp
 * @description
 * # flowNgApp
 *
 * Main module of the application.
 */
angular
  .module('flowNgApp', [
    'ui.router',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'angularMoment',
    'ui.bootstrap',
    'angular-loading-bar',
    'LocalStorageModule'
  ])

  .constant('ConfigData', {
    'apiEndpoint': 'http://flow-webapp.dev/api/'
  })

  .constant('angularMomentConfig', {
    timezone: 'Europe/Paris'
  })

  .run(function ($rootScope, $window, $auth, $location, $state, $log) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      $log.debug('check auth status');
      if (toState.authenticated && (!$auth.isAuthenticated() || $auth.getPayload().exp >= Date.now() || $auth.getPayload() === undefined)) {
        $rootScope = $rootScope.$new(true);
        $window.localStorage.clear();
        $log.debug('cannot be authenticated - destroy localstorage');
        $log.debug('not authenticated - redirect to login');
        $state.go('login');
        event.preventDefault();
      } else {
        if ($rootScope.currentUser === undefined) {
          $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          $log.debug('authenticated - save user data to rootscope');
        }
      }
    });

    $rootScope.goBack = function () {
      $window.history.back();
    };

    $rootScope.jqueryDebugEnabled = false;
  })

  .config(function ($logProvider) {
    $logProvider.debugEnabled(true);
  })

  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setStorageType('localStorage');
  })

  .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 100;
  }])

  .config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, ConfigData) {

    //Auth Login
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })

      //Main Layout
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/app.html',
        controller: 'AppCtrl',
        authenticated: true
      })

      .state('app.home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        authenticated: true
      });

    $urlRouterProvider.otherwise('/app/home');

    $authProvider.loginUrl = ConfigData.apiEndpoint + 'auth/signin';
    $authProvider.tokenRoot = 'data';
    $authProvider.httpInterceptor = true;
    $authProvider.platform = 'browser';

  });
