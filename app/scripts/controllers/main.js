'use strict';

app
  .controller('MainController', ['$scope', '$document', 'PlaceholderTextService', 'DownloadService','Property', 'Properties', '$routeParams', function($scope, $document, PlaceholderTextService, DownloadService, Property, Properties, $routeParams) {
    $scope.controls = false;
    $scope.live_code = false;
    $scope.toggleControls = function() {
        $scope.controls = !$scope.controls;
    }
    $scope.toggleLiveCode = function() {
        $scope.live_code = !$scope.live_code;
    }
    $scope.paras = "";
    $scope.getText =  function(num, type) {
        PlaceholderTextService.getLocalText(num, type).success(function(data){
            $scope.paras = data;
        });
    }
    $scope.firstLetter = function(str) {
        return str[0];
    }
    $scope.restOf = function(str) {
        return str.substr(1);
    }
    $scope.getText(2, $routeParams.type);

    $scope.obj = {test: "hello!"};
   

    $scope.postTest = function() {
        DownloadService.getDownload({markup: $scope.paras, css: $scope.type.css()}).success(function(response){
            window.location = "dl/" + response.file;
        });
    }

    $scope.type = {
        properties: {},
        style: function() {
            var obj = {};
            for(var key in this.properties) {
                if (this.properties[key]['applies'] == undefined) {
                    obj[this.properties[key]['property-name']] = this.properties[key]['propertyValue']()
                }
            }
            return obj
        },
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
        },
        css: function(html) {
            var style = this.style();
            var str = "";
            for(var property in style) {
                str += property + ": "+ style[property] + ";\n"  ;
            }
            if(html) {
                str = str.replace(/\n/g, "<br>")
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
    $scope.type.properties["leading"] = Properties.create("leading");
    $scope.type.properties["typeface"] = Properties.create("typeface");
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
    $scope.testIt = function() {
        console.log('message');
    }
  }]);
