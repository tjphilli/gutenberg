// Service to store and retrieve application wide data
app.factory('DownloadService', ['$http', '$q', function($http, $q){
	return {
		getDownload: function(data) {
			return $http.post("http://localhost:3000/download/", data);
		},
		getDl: function(data) {
			return $http.get("http://localhost:3000/dl/" + data);
		}
	}

}]);