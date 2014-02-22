'use strict';

var app = angular.module('atmApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/begin.html',
        controller: 'MainCtrl'
      })
      .when('/home/', {
        templateUrl: 'views/home.html'
      })
      .when('/withdraw/', {
        templateUrl: 'views/withdraw.html',
        controller: 'WithdrawCtrl'
      })
      .when('/withdraw/success', {
        templateUrl: 'views/success.html',
        controller: 'WithdrawCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
