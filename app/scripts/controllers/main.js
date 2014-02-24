'use strict';

angular.module('gutenbergApp')
  .controller('MainController', ['$scope', '$document', 'PlaceholderTextService', 'Property', function($scope, $document, PlaceholderTextService, Property) {
	$scope.my_data = "";
    $scope.getText = function() {
    	PlaceholderTextService.getLocalText().success(function(data){
    		console.log(data);
    		$scope.my_data = data;
    	});
    }
    $scope.getText()
    $scope.test = 7;
    $scope.controls = false;
    $scope.toggleControls = function() {
    	$scope.controls = !$scope.controls;
    }
    
    $scope.type = {
 		properties: {
	    // 	leading: {
	    // 		name: 'Leading',
	    // 		value: 1,
	    // 		slider: {
	    // 			floor: 0,
	    // 			ceiling: 4,
	    // 			precision: 2,
	    // 			step: 0.05
	    // 		},
	    // 		increase: function(){
	    // 			this.value +=1
	    // 		},
	    // 		decrease: function(){
	    // 			this.value -=1
	    // 		},
	    // 		microIncrease: function() {
					// this.value = parseFloat((this.value +=0.05).toFixed(2));
					// console.log(this);
	    // 		},
	    // 		microDecrease: function() {
	    // 			this.value = parseFloat((this.value -=0.05).toFixed(2))
	    // 		}
	    // 	},
	    // 	size: {
	    // 		value: 16,
	    // 		unit: "px",
	    // 		name: 'Size',
	    // 		slider: {
	    // 			floor: 4,
	    // 			ceiling: 72,
	    // 			precision: 0,
	    // 			step: 1
	    // 		},
	    // 		increase: function(){
	    // 			this.value +=5
	    // 		},
	    // 		decrease: function(){
	    // 			this.value -=5
	    // 		},
	    // 		microIncrease: function() {
					// this.value +=1
					// console.log(this);
	    // 		},
	    // 		microDecrease: function() {
	    // 			this.value -=1
	    // 		}
	    // 	}
	    },
    	typeface: {
    		value: "times-new-roman",
    		options: [
    			{name: "Times New Roman", 'class':'times-new-roman'},
    			{name: "Helvetica Neue" , 'class': 'helvetica-neue'}, 
    			{name: "Garamond", 'class': 'garamond'}
    		]
    	},
    	style: function() {
    		var obj = {};
    		for(var key in this.properties) {
    			obj[this.properties[key]['property-name']] = this.properties[key]['propertyValue']()
    		}
    		return obj
    	}

    };
    $scope.type.properties.width = new Property({name: 'Container Width', 'property-name':'width',value: '600', unit:'px', inc: 50, micro_inc: 1, slider: {
    			floor: 300,
    			ceiling: 900,
    			precision: 0,
    			step: 1
    		}})
     $scope.type.properties.size = new Property({name: 'Size', 'property-name':'font-size',value: '16', unit:'px', inc: 5 ,micro_inc: 1,slider: {
    			floor: 4,
    			ceiling: 72,
    			precision: 0,
    			step: 1
    		}})
    $scope.type.properties.leading = new Property({name: 'Leading', 'property-name':'line-hight',value: '1', inc: 1, micro_inc: 0.05, slider: {
    			floor: 0,
    			ceiling: 4,
    			precision: 2,
    			step: 0.05
    		}})

  }]);
