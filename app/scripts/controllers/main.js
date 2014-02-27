'use strict';

angular.module('gutenbergApp')
  .controller('MainController', ['$scope', '$document', 'PlaceholderTextService', 'DownloadService','Property', 'Properties', function($scope, $document, PlaceholderTextService, DownloadService, Property, Properties) {
	
    $scope.controls = false;
    $scope.toggleControls = function() {
    	$scope.controls = !$scope.controls;
    }
    $scope.paras = "";
    $scope.getText =  function(num) {
        PlaceholderTextService.getLocalText(num).success(function(data){
            $scope.paras = data;
        });
    }
    $scope.getText(2);

    $scope.obj = {test: "hello!"};
    $scope.getDownload =  function(obj) {
        DownloadService.getDownload(obj).success(function(data){
            console.log(data);
        });
    }
    $scope.getDl =  function(num) {
        DownloadService.getDownload(num).success(function(data){
            console.log(data);
        });
    }

    $scope.type = {
        properties: {},
        typeface: {
            value: "garamond",
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
        css: function() {
            var style = this.style();
            var str = "";
            for(var property in style) {
                str += property + ": "+ style[property] + ";\n"  ;
            }
            return str;
        },
        currentProperties: function(){
            var obj = {};
            for (var key in this.properties) {
                obj[key] = this.properties[key]['name'];
            }
            return obj;

        }

    };
    $scope.testString = "something";
    $scope.type.properties["leading"] = Properties.create("leading");
    $scope.type.properties["size"] = Properties.create("size");
    $scope.addProperty = function (name) {
        $scope.type.properties[name] = Properties.create(name);
    }
    $scope.removeProperty = function (name) {
        console.log("called");
        delete $scope.type.properties[name]
    }
    $scope.availableProperties = function() {
        return   Properties.getAvailable($scope.type.currentProperties());
    }
    $scope.test = function() {
        console.log('message');
    }
  }]);
