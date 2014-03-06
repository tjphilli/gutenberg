// Service to store and retrieve application wide data
app.factory('Globals', ['ENV',function(ENV){
	return {
		urlBase: function(){
		   	var URL_BASE = "";
			if (ENV === 'development') {
				URL_BASE = "http://localhost:3000/";
			}
			else if (ENV === 'production') {
				URL_BASE = "/";	
			}
			console.log("called");
			return URL_BASE;
		}
	}

}]);