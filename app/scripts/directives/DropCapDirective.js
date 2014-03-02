app.directive('dropcap', function () {
    return {
        replace: true,
        transclude: true,
        scope: {
            property: '=',
            name: '=',
            remove:'='
        },
        templateUrl: "scripts/directives/propertyTemplate.html",
        link: function (scope, element, attrs) {
           $(element).find(':first-child:first-letter').
        }
    };
});
