// Service to store and retrieve application wide data
app.factory('PlaceholderTextService', ['$http', '$q', function($http, $q){
	return {

		getLoremIpsum: function(num){
		   return $http.jsonp("http://loripsum.net/api/" + num);
		},
		getHipsterIpsum: function(){
		   return $http.jsonp("http://hipsterjesus.com/api/");
		},
		getLocalText: function(num) {
			return $http.get("http://localhost:3000/test/"+num);
		}
	}

}]);