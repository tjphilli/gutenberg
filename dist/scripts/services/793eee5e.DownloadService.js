// Service to store and retrieve application wide data
app.factory('DownloadService', ['$http', '$q', 'Globals', function($http, $q, Globals){
	return {
		getDownload: function(data) {
			return $http.post(Globals.urlBase() + "dl/", data);
		}
	}

}]);