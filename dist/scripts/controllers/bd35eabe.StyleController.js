'use strict';

app
  .controller('StyleController', ['$scope', '$document', 'DownloadService','Container', 'Property', 'Properties', '$routeParams', 'Selection','Style', function($scope, $document, DownloadService, Container, Property, Properties, $routeParams, Selection, Style) {
    $scope.test = Style;

  }]);
