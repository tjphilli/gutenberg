'use strict';

app
  .controller('MainController', ['$scope', '$document', 'PlaceholderTextService', 'DownloadService','Container', 'Property', 'Properties', '$routeParams', function($scope, $document, PlaceholderTextService, DownloadService, Container, Property, Properties, $routeParams) {
    $scope.controls = false;
    $scope.live_code = false;
    $scope.toggleControls = function() {
        $scope.controls = !$scope.controls;
    }
    $scope.toggleLiveCode = function() {
        $scope.live_code = !$scope.live_code;
    }

    $scope.placeholder = {
        number: 2,
        type: 'paras',
        source: 'lorem'
    };

    $scope.paras =  "";
    $scope.content = {
        paras: ""
    };
    $scope.content.addHeading = function(){
        $scope.content.heading = {};
        $scope.content.heading.visible = true;
        $scope.content.heading.container = new Container();
        $scope.content.heading.text = "Gutenberg Heading";
    }
    $scope.getText = function(num, type, format){
        PlaceholderTextService.getLocalText(num, type, format).success(function(data){
            $scope.paras = data;
            console.log("called!");
        });
    }
    $scope.getText(2);

    $scope.$watchCollection('placeholder', function(){
        console.log("updated!");
        $scope.getText($scope.placeholder.number, $scope.placeholder.source, $scope.placeholder.type);
    });
    $scope.firstLetter = function(str) {
        return str[0];
    }
    $scope.restOf = function(str) {
        return str.substr(1);
    }

    $scope.postTest = function() {
        DownloadService.getDownload({markup: $scope.paras, css: $scope.type.css()}).success(function(response){
            window.location = "dl/" + response.file;
        });
    }


    $scope.type = {
        properties: {},
        backgroundStyle: function() {
            var obj = {};
            for(var key in $scope.type.properties) {
                if (this.properties[key]['applies'] == 'background') {
                    obj[this.properties[key]['property-name']] = this.properties[key]['propertyValue']()
                }
            }
            return obj;
        },
        dropcap: function() {
            var obj = {};
            if($scope.type.properties['dropcap']) {
                for(var key in $scope.type.properties['dropcap'].properties) {
                    obj[this.properties['dropcap']['properties'][key]['property-name']] = this.properties['dropcap']['properties'][key]['propertyValue']()
                }
            }
            return obj;
        }
    };
    $scope.container = new Container();
    $scope.container.addProperty("leading");
    $scope.container.addProperty("typeface");
    $scope.container.addProperty("size");
    $scope.container.addProperty("weight");

    $scope.addProperty = function (name) {
        $scope.container.addProperty(name);
        console.log($scope.container);
    }
    $scope.removeProperty = function (name) {
        $scope.container.removeProperty(name);
    }
    $scope.availableProperties = function() {
        return   Properties.getAvailable($scope.container.currentProperties());
    }
  }]);
