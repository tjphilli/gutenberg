app.directive('expander', function () {
    return {
        link: function (scope, element, attrs) {
           var $target = $(element).children('.expander-target:not(.expander .expander .expander-trigger)').addClass('is-collapsed');
           var $target2 = $(element).children('.expander-target').addClass('is-collapsed');
           $(element).on('click', '.expander-trigger:not(.expander .expander .expander-trigger)', function(){
                $target.toggleClass('is-collapsed');
                scope.$apply()
                console.log("lcikc 1");
           })
           $(element).on('click', '.expander .expander-trigger', function(){
                $(element).children('.expander-target').toggleClass('is-collapsed');
                scope.$apply()
                console.log("lcikc 2");
           })
           $(element).children('.properties-menu').on('click', function(){
           		console.log("messsagegfdgsfd");
           		$target.toggleClass('is-collapsed');
           });
        }
    };
});