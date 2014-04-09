'use strict';

app
  .controller('MainController', ['$scope', '$document', 'PlaceholderTextService', 'DownloadService','Container', 'Property', 'Properties', '$routeParams', 'Selection', 'ElementFactory', 'Dom', function($scope, $document, PlaceholderTextService, DownloadService, Container, Property, Properties, $routeParams, Selection, ElementFactory, Dom) {
    $scope.dom = Dom;

    $scope.controls = false;
    $scope.live_code = false;
    // $scope.edit_mode = false;
    $scope.ui = {
        edit_mode: false,
        editMode: function(){
            console.log("edit mode activated");
            this.edit_mode = !this.edit_mode
        }
    }
    $scope.selection = Selection;
    // $scope.$watch(function(){return Selection.element},
    //     function(newVal){
    //         $scope.selection =Selection;
    //     })
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
    $scope.test_element = ElementFactory.create("p");
    $scope.testFunction = function() {
        $scope.dom.elements.unshift(ElementFactory.create("h1", "Gutenberg Heading"))
    }
    $scope.addHeading = function() {
        $scope.dom.elements.unshift(ElementFactory.create("h2", "Gutenberg Sub Heading"))
    }
    $scope.changeHeading = function() {
        $scope.dom.elements[0].container.addProperty("size");
    }
    $scope.moveDown = function() {
        $scope.dom.moveDown($scope.selection.getElement());
    }
    $scope.moveUp = function() {
        $scope.dom.moveUp($scope.selection.getElement());
    }
    $scope.deleteElement = function() {
        $scope.dom.deleteElement($scope.selection.getElement());
    }

    $scope.getText = function(num, type, format){
        PlaceholderTextService.getLocalText(num, type, format).success(function(data){
            $scope.paras = data;
            $scope.dom.elements = new Array();
            console.log("called!");
            for (var i = 0; i < $scope.paras.length; i++) {
                console.log($scope.paras[i]);
                $scope.dom.elements.push(ElementFactory.create("p", $scope.paras[i], String(i+1)))
            }
        });
    }

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
        DownloadService.getDownload({markup: $scope.paras, css: $scope.container.css()}).success(function(response){
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
    
    // $scope.container.addProperty("weight");

    $scope.addProperty = function (name) {
        console.log($scope.selection.getElement())
        if($scope.selection.getElement() != 'none') {
            if(name === 'columns') {
                $scope.dom.elements[$scope.dom.find($scope.selection.getElement())].container.addLinkedProperty(name);
            }
            else{
             $scope.dom.elements[$scope.dom.find($scope.selection.getElement())].container.addProperty(name);
            }
        } else {
            if(name === 'columns') {
                $scope.dom.wrapper.addLinkedProperty(name);
            }
            else{
                $scope.dom.wrapper.addProperty(name);
            }
            
        }
    }
    $scope.removeProperty = function (name) {
        if($scope.selection.getElement() != 'none') {
            if(name === 'columns') {
                $scope.dom.elements[$scope.dom.find($scope.selection.getElement())].container.removeLinkedProperty(name);
            }
            else{
             $scope.dom.elements[$scope.dom.find($scope.selection.getElement())].container.removeProperty(name);
            }
        } else {
            if(name === 'columns') {
                $scope.dom.wrapper.removeLinkedProperty(name);
            }
            else{
                $scope.dom.wrapper.removeProperty(name);
            }
            
        }
    }
    $scope.availableProperties = function() {
        if($scope.selection.getElement() != 'none') {
            console.log($scope.selection.getElement())
            return   Properties.getAvailable($scope.selection.getReference().container.currentProperties(), "element");
        } else {
            return   Properties.getAvailable($scope.dom.wrapper.currentProperties(), "wrapper");
        }
    }
  }]);
