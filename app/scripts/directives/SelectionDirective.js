app.directive('tpSelection', ['Selection', function (Selection) {
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
           $(element).on('click', function(){
                scope.selection = Selection;
                scope.selection.setElement('test');
                scope.$apply()
           });
        }
    };
}]);