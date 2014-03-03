app.directive('expander', function () {
    return {
        link: function (scope, element, attrs) {
           var $target = $(element).children('.expander-target:not(.expander .expander .expander-trigger)').addClass('is-hiding');
           var $target2 = $(element).children('.expander-target').addClass('is-hiding');
           $(element).on('click', '.expander-trigger:not(.expander .expander .expander-trigger)', function(){
                $target.toggleClass('is-hiding');
                console.log("lcikc 1");
           })
           $(element).on('click', '.expander .expander-trigger', function(){
                $(element).children('.expander-target').toggleClass('is-hiding');
                console.log("lcikc 2");
           })
        }
    };
});