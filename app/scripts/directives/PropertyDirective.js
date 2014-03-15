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
app.directive('propertyNumber', function () {
    return {
        replace: true,
        transclude: true,
        templateUrl: "scripts/directives/propertyTemplate.html"
    };
});
app.directive('propertySelect', function () {
    return {
        replace: true,
        transclude: true,
        templateUrl: "scripts/directives/propertyTemplate_select.html"
    };
});
app.directive('propertyColor', function () {
    return {
        replace: true,
        transclude: true,
        templateUrl: "scripts/directives/propertyTemplate_color.html"
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