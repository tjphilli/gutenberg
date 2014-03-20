// Service to store and retrieve application wide data
app.factory('DownloadService', ['$http', 'Globals', function($http, Globals){
	return {
		getDownload: function(data) {
			return $http.post(Globals.urlBase() + "dl/", data);
		}
	}

}]);