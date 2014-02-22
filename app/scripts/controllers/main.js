'use strict';

angular.module('gutenbergApp')
  .controller('MainController', function ($scope) {
    $scope.test = "Something";
    $scope.controls = false;
    $scope.toggleControls = function() {
    	$scope.controls = !$scope.controls;
    }
    $scope.type = {
    	test: 5,
    	leading: {
    		value: 1,
    		test: $scope.type,
    		increase: function(){
    			this.value +=1
    		},
    		decrease: function(){
    			this.value -=1
    		},
    		microIncrease: function() {
				this.value = parseFloat((this.value +=0.05).toFixed(2));
				console.log(this);
    		},
    		microDecrease: function() {
    			this.value = parseFloat((this.value -=0.05).toFixed(2))
    		}
    	},
    	size: {
    		value: 16,
    		unit: "px",
    		increase: function(){
    			this.value +=5
    		},
    		decrease: function(){
    			this.value -=5
    		},
    		microIncrease: function() {
				this.value +=1
				console.log(this);
    		},
    		microDecrease: function() {
    			this.value -=1
    		}
    	},
    	typeface: {
    		value: "times-new-roman",
    		options: [
    			{name: "Times New Roman", 'class':'times-new-roman'},
    			{name: "Helvetica Neue" , 'class': 'helvetica-neue'}, 
    			{name: "Garamond", 'class': 'garamond'}
    		]
    	}
    };

  });
