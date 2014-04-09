app.directive('tpSelection', ['Selection', 'Style', function (Selection, Style) {
    return {
        // replace: true,
        // transclude: true,
        scope: {
            selector: '=tpSelection',

        },
        // templateUrl: "scripts/directives/propertyTemplate.html",
        link: function (scope, element, attrs) {
            var foo = true;
           $(element).on('click', function(){
                scope.selection = Selection;
                scope.style_block = Style;
                scope.selection.setElement(scope.selector);
                scope.$apply()
                // if (foo) {
                //     $( "<style id='test'>"+ scope.style_block.style+"</style>" ).appendTo( "head" );
                //     foo = !foo;
                // }
                // else {
                //     $("#test").remove();
                //     foo = !foo;
                // }
           });
        }
    };
}]);