app.directive('property', function () {
    return {
        // replace: true,
        // transclude: true,
        scope: {
            property: '=',
            name: '=',
            remove:'='
        },
        // templateUrl: "scripts/directives/propertyTemplate.html",
        link: function (scope, element, attrs) {
           console.log(scope.name);
        }
    };
});
app.directive('container',['$rootScope', function ($rootScope) {
    return {
        scope: {
            container: '=',
        },
        controller: function($scope) {
            this.getSize = function(){
                return $scope.container.properties.size.value;
            }
            this.getWeights = function(){
                return $scope.container.properties.typeface.weights();   
            }
            $scope.$watch('container.properties.size.value', function(){
                $rootScope.$broadcast('SIZE_CHANGE', {some: 'val'});
            });
            $scope.$watch('container.properties.typeface.value', function(){
                $rootScope.$broadcast('FACE_CHANGE', {some: 'val'});
            });
        },
        link: function (scope, element, attrs) {
           console.log(scope.name);
        }
    };
}]);
app.directive('propertyNumber', ['$rootScope', function ($rootScope) {
    return {
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
        replace: true,
        require: '^container',
        transclude: true,
        templateUrl: "scripts/directives/propertyTemplate_select.html",
        link: function(scope, elem, attrs, ContainerCtrl){
            if(scope.property.name === "Weight") {
                $rootScope.$on('FACE_CHANGE', function(event, mass) {
                    scope.property.options = ContainerCtrl.getWeights();
                });
            }
        }
    };
}]);
app.directive('propertyColor', function () {
    return {
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