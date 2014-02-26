var express = require('express');
var app = express();

app.use(express.static(__dirname +'/app'));

app.get('/api:num', function(req, res){
  var http = require("http");

  	var num = req.params.num || 2
	res.set('Access-Control-Allow-Origin', '*');
  	res.set('Access-Control-Allow-MethodGenetic and Morphological Relationships Between Ungulatess', 'GET, POST');
  	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	var options = {
    	host: 'loripsum.net',
    	path: '/api/'+ num +'/plaintext'
	};

	http.get(options, function (http_res) {
	    // initialize the container for our data
	    var data = "";

	    // this event fires many times, each time collecting another piece of the response
	    http_res.on("data", function (chunk) {
	        // append this chunk to our growing `data` var
	        data += chunk;
	    });

	    // this event fires *one* time, after all the `data` events/chunks have been gathered
	    http_res.on("end", function () {
	        // you can use res.send instead of console.log to output via express
	        console.log(data);
	        var arr = data.split('\n\n')
	        res.jsonp(arr);
	    });
	});
});

app.listen(3000);
console.log('Listening on port 3000');