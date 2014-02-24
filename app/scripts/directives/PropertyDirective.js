angular.module('gutenbergApp').directive('property', function () {
    return {
        scope: {
            property: '='
        },
        templateUrl: "scripts/directives/propertyTemplate.html",
        link: function (scope, element, attrs) {
           console.log(scope);
        }
    };
});