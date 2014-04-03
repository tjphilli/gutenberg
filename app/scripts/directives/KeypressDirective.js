app.directive('keypress', function () {
    return function (scope, element, attrs) {
        var modifier = "shiftKey";
        var test = "";
        var wasPressed = function (ev, num) {
            return (ev.which === num && ev[modifier])
        };
        $(window).bind("keydown keypress", function (event) {
            if(wasPressed(event, 38)) {
                scope.container.findProperty('leading').microIncrease()
                scope.$apply()
                event.preventDefault();
            }
            else if(wasPressed(event, 40)) {
                scope.container.findProperty('leading').microDecrease()
                scope.$apply()
                event.preventDefault();
                window.test = event.shiftKey;
            }
            else if(wasPressed(event, 187)) {
                scope.container.findProperty('size').microIncrease()
                scope.$apply()
                event.preventDefault();
            }
            else if(wasPressed(event, 189)) {
                scope.container.findProperty('size').microDecrease()
                scope.$apply()
                event.preventDefault();
                window.test = event.shiftKey;
            }
        });
    };
});