// Service to store and retrieve application wide data
app.factory('PlaceholderTextService', ['$http', '$q', 'ENV',function($http, $q, ENV){
	URL_BASE = "";
	if (ENV === 'development') {
		URL_BASE = "http://localhost:3000/";
	}
	else if (ENV === 'production') {
		URL_BASE = "/";	
	}
	return {
		getLoremIpsum: function(num){
		   return $http.jsonp("http://loripsum.net/api/" + num);
		},
		getHipsterIpsum: function(){
		   return $http.jsonp("http://hipsterjesus.com/api/");
		},
		getLocalText: function(num) {
			return $http.get(URL_BASE +"api/"+num);
		}
	}

}]);