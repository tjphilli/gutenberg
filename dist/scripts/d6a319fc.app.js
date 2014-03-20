'use strict';
var app = angular.module('gutenbergApp', [
    'ui.router',
    'ngTouch',
    'vr.directives.slider',
    'ngClipboard',
    'ngRoute',
    'config',
    'colorpicker.module',
    'ngAnimate'
  ]).config([
    '$httpProvider',
    function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]).config([
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider) {
      $stateProvider.state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainController'
      }).state('main.about', {
        url: 'about',
        templateUrl: 'views/about.html',
        controller: 'MainController'
      });
      $locationProvider.html5Mode(false).hashPrefix('!');
      $urlRouterProvider.otherwise('/');
    }
  ]);