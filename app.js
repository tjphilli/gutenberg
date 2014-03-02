var express = require('express');
var app = express();
// var crawlme = require('crawlme');

app.use(express.json()); 
app.use(express.urlencoded());
// app.use(crawlme());

app.use(require('prerender-node').set('prerenderToken', 'j3B4cKcyHoaveNZDVBGG'));


app.configure('production', function(){
	app.use(express.static(__dirname +'/dist'));
	console.log("production used");
})

app.configure('development', function(){
	app.use(express.static(__dirname +'/app'));
	console.log("development used");
})

app.get('/dl/:id', function(req, res, next){
	var id = req.params.id;
    res.setHeader('Content-disposition', 'attachment; filename=theDocument.txt');
	res.setHeader('Content-type', 'text/plain');
	res.charset = 'UTF-8';
	res.write("Hello, world" + id);
	res.end();
});

app.post('/download/', function(req, res, next){
	var test = req.body.test;
    res.setHeader('Content-disposition', 'attachment; filename=theDocument.txt');

	res.setHeader('Content-type', 'text/html');
	res.charset = 'UTF-8';
	res.write("Hello, world" + test);
	console.log(req.body.test);
	res.end();
});


app.get('/api/:num', function(req, res){
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
	// res.jsonp(["Lorem ipsum Sunt ea qui incididunt sed commodo et in dolore. Lorem ipsum Dolor amet aliquip amet proident aliqua et voluptate eiusmod.", "Gutnberg solor dat ip atsum dada mone."]);
});


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port 3000');