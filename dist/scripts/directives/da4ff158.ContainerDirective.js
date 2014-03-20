app.controller('ContainerCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    this.getSize = function(){
        return $scope.container.findProperty('size').value;
    }
    this.getWeights = function(){
        return $scope.container.findProperty('typeface').weights();   
    }
    $scope.$watch(function(){
        return $scope.container.findProperty("size").value;
        }, function(){
        $rootScope.$broadcast('SIZE_CHANGE', {some: 'val'});
    });
    $scope.$watch(function(){
        return $scope.container.findProperty("typeface").value;
        }, function(){
        $rootScope.$broadcast('FACE_CHANGE', $scope.container.findProperty("typeface").value);
    });
    console.log("INSTANTIATED");
}]);

app.directive('container',  function ($rootScope) {
    return {
        scope: {
            container: '=',
        },
        controller: function($scope, $rootScope){
            this.getSize = function(){
                    return $scope.container.findProperty('size').value;
                }
                this.getWeights = function(){
                    return $scope.container.findProperty('typeface').weights();   
                }
                $scope.$watch(function(){
                    return $scope.container.findProperty("size").value;
                    }, function(){
                    $rootScope.$broadcast('SIZE_CHANGE', {some: 'val'});
                });
                $scope.$watch(function(){
                    return $scope.container.findProperty("typeface").value;
                    }, function(){
                    $rootScope.$broadcast('FACE_CHANGE', $scope.container.findProperty("typeface").value);
                });
        },
        link: function (scope, element, attrs) {
           console.log(scope.name);
        }
    };
});