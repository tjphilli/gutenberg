app.directive('expander', function () {
    return {
        link: function (scope, element, attrs) {
           var $target = $(element).children('.expander-target:not(.expander .expander .expander-trigger)').addClass('is-collapsed');
           var $target2 = $(element).children('.expander-target').addClass('is-collapsed');
           $(element).on('click', '.expander-trigger:not(.expander .expander .expander-trigger)', function(e){
                $(e.target).closest('.expander-trigger').toggleClass('is-triggered')
                $target.toggleClass('is-collapsed');
                scope.$apply()
           })
           $(element).on('click', '.expander .expander-trigger', function(e){
                $(e.target).closest('.expander-trigger').toggleClass('is-triggered')
                $(element).children('.expander-target').toggleClass('is-collapsed');
                scope.$apply()
           })
           $(element).children('.properties-menu').on('click', function(e){
           		console.log("messsagegfdgsfd");
           		$target.toggleClass('is-collapsed');
              $target.siblings('.expander-trigger').toggleClass('is-triggered')
           });
        }
    };
});

app.directive('focusShow', function () {
    return {
        scope: {
          focusShow: '&'
        },
        link: function (scope, element, attrs) {
          var visible = false;
          $element = $(element)
           $element.on('focus', function(){
            console.log(scope);
            if(!visible) {
              visible = !visible;
              scope.focusShow();
              scope.$apply();
            }
           });
           $('body').on('click', function(e){
            if(!$element.is(e.target) && $element.has(e.target).length === 0) {
              if(visible) {
                visible = !visible;
                scope.focusShow();
                scope.$apply();
              }
            }
           });
        }
    };
});