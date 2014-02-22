'use strict';

angular.module('gutenbergApp')
  .controller('MainController', function ($scope) {
    $scope.test = "Something";

    $scope.type = {
    	leading: {
    		value: 1,
    		increase: function(){
    			this.value +=1
    		},
    		decrease: function(){
    			this.value -=1
    		}
    	},
    	size: {
    		value: 16,
    		unit: "px"
    	}
    };

  });
