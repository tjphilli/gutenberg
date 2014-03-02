'use strict';
var app = angular.module('gutenbergApp', [
    'ngTouch',
    'vr.directives.slider',
    'ngClipboard',
    'ngRoute',
    'config',
    'colorpicker.module'
  ]).config([
    '$httpProvider',
    function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]).config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider.when('/', { templateUrl: 'views/main.html' }).otherwise({ redirectTo: '/' });
      $locationProvider.html5Mode(false).hashPrefix('!');
    }
  ]);