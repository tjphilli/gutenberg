app.directive('expander', function () {
    return {
        link: function (scope, element, attrs) {
           var $target = $(element).find('.expander-target').addClass('is-hiding');
           $(element).on('click', '.expander-trigger', function(){
                $target.toggleClass('is-hiding');
           })
        }
    };
});