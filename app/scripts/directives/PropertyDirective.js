angular.module('gutenbergApp').directive('property', function () {
    return {
        replace: true,
        transclude: true,
        scope: {
            property: '='
        },
        templateUrl: "scripts/directives/propertyTemplate.html",
        link: function (scope, element, attrs) {
           console.log(scope);
        }
    };
});