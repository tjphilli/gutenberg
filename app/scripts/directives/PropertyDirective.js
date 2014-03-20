app.directive('property', function () {
    return {
        // replace: true,
        // transclude: true,
        // scope: {
        //     property: '=',
        //     name: '=',
        //     remove:'='
        // },
        // templateUrl: "scripts/directives/propertyTemplate.html",
        link: function (scope, element, attrs) {
           console.log(scope.name);
        }
    };
});

app.directive('propertyNumber', ['$rootScope', function ($rootScope) {
    return {
        scope: {
            property: '=',
            name: '=',
            remove: '='
        },
        require: '^container',
        replace: true,
        transclude: true,
        templateUrl: "scripts/directives/propertyTemplate.html",
        link: function(scope, elem, attrs, ContainerCtrl) {
            $rootScope.$on('SIZE_CHANGE', function(event, mass) {
                scope.property.dependent_int = ContainerCtrl.getSize();    
            });
            
        }
    };
}]);
app.directive('propertySelect', ['$rootScope', function ($rootScope){
    return {
        scope: {
            property: '=',
            name: '=',
            remove: '='
        },
        // scope: {
        //     property: '=',
        //     name: '=',
        //     remove:'='
        // },
        replace: true,
        require: '^container',
        transclude: true,
        templateUrl: "scripts/directives/propertyTemplate_select.html",
        link: function(scope, elem, attrs, ContainerCtrl){
            var face_name = "";
            if(scope.property.name === "Weight") {
                $rootScope.$on('FACE_CHANGE', function(event, face) {
                    if(face_name != face) {
                        face_name = face;
                        scope.property.options = ContainerCtrl.getWeights();
                        scope.property.value = scope.property.options[scope.property.options.length -1].value;
                    }
                });
            }
        }
    };
}]);
app.directive('propertyColor', function () {
    return {
        scope: {
            property: '=',
            name: '=',
            remove: '='
        },
        replace: true,
        transclude: true,
        templateUrl: "scripts/directives/propertyTemplate_color.html",
        link: function(scope, element, attrs) {
            $(element).find('.color-preview').click(function(e){
                $(e.target).siblings('input').trigger("click")
            });
        }
    };
});
app.directive('propertyShorthand', function () {
    return {
        scope: {
            property: '=',
            name: '=',
            remove: '='
        },
        replace: true,
        transclude: true,
        templateUrl: "scripts/directives/propertyTemplate_shorthand.html",
        link:function(){
            console.log(":ATEEE");
        }
    };
});
app.directive('propertyCompound', function () {
    return {
        scope: {
            property: '=',
            name: '=',
            remove: '='
        },
        replace: true,
        transclude: true,
        templateUrl: "scripts/directives/propertyTemplate_compound.html",
        link:function(){
            console.log(":ATEEE");
        }
    };
});
angular.module('gutenbergApp').directive('hoverhover', function () {
    return {
        link: function (scope, element, attrs) {          
        }
    };
});