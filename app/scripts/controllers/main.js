'use strict';

app
  .controller('MainController', ['$scope', '$document', 'PlaceholderTextService', 'DownloadService','Container', 'Property', 'Properties', '$routeParams', 'Selection', 'ElementFactory', function($scope, $document, PlaceholderTextService, DownloadService, Container, Property, Properties, $routeParams, Selection, ElementFactory) {
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
    $scope.content = {
        paras: ""
    };
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
    $scope.content.addHeading = function(){
        $scope.content.heading = {};
        $scope.content.heading.visible = true;
        $scope.content.heading.container = new Container();
        $scope.content.heading.text = "Gutenberg Heading";
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
        DownloadService.getDownload({markup: $scope.paras, css: $scope.container.css()}).success(function(response){
            window.location = "dl/" + response.file;
        });
    }
    $scope.dom = {
        wrapper: new Container(),
        elements: [],
        find: function(selector){
            for(var i=0; i < this.elements.length; i++) {
                if(this.elements[i].selector() == selector) {
                    return i;
                }
            }
        }
    };
    $scope.dom.wrapper.addProperty("leading");
    $scope.dom.wrapper.addProperty("typeface");
    $scope.dom.wrapper.addProperty("size");

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
        return   Properties.getAvailable($scope.dom.wrapper.currentProperties());
    }
  }]);
