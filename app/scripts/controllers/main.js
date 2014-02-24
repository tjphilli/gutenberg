'use strict';

angular.module('gutenbergApp')
  .controller('MainController', ['$scope', '$document', 'PlaceholderTextService', 'Property', 'Properties', function($scope, $document, PlaceholderTextService, Property, Properties) {
	
    $scope.controls = false;
    $scope.toggleControls = function() {
    	$scope.controls = !$scope.controls;
    }
    $scope.type = {
        properties: {},
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
        },
        currentProperties: function(){
            var obj = {};
            for (var key in this.properties) {
                obj[key] = this.properties[key]['name'];
            }
            console.log(obj);
            return obj;

        }

    };

    $scope.type.properties["leading"] = Properties.create("leading");
    $scope.type.properties["size"] = Properties.create("size");
    $scope.addProperty = function (name) {
        $scope.type.properties[name] = Properties.create(name);
    }
    $scope.currentProperties = function(){
        var obj = {};
        for (var key in $scope.type.properties) {
            obj[key] = $scope.type.properties[key]['name'];
        }
        console.log(obj);
        return obj;

    }
    $scope.availableProperties = function() {
        return   Properties.getAvailable($scope.currentProperties());
    }
  }]);
