'use strict';
var app = angular.module('gutenbergApp', [
    'ngTouch',
    'vr.directives.slider',
    'ngClipboard',
    'ngRoute',
    'config'
  ]).config([
    '$httpProvider',
    function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]).config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      }).otherwise({ redirectTo: '/' });
    }
  ]);