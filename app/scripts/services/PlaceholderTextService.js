// Service to store and retrieve application wide data
app.factory('PlaceholderTextService', ['$http', 'ENV',function($http, ENV){
	var URL_BASE = "";
	console.log(ENV);
	if (ENV === 'development') {
		URL_BASE = "http://localhost:3000/";
		console.log("development environment");
	}
	else if (ENV === 'production') {
		URL_BASE = "/";	
		console.log("production environment");
	}
	return {
		getLoremIpsum: function(num){
		   return $http.jsonp("http://loripsum.net/api/" + num);
		},
		getHipsterIpsum: function(){
		   return $http.jsonp("http://hipsterjesus.com/api/");
		},
		getLocalText: function(num, type, format) {
			console.log(type);
			return $http.get(URL_BASE +"api/"+num + "/" + type + "/" + format);
		}
	}

}]);