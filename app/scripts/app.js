'use strict';

var app = angular.module('gutenbergApp', ['ngTouch', 'vr.directives.slider'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
