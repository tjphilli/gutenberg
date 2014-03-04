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
var api = {};
var request = require("request");
api.handle = function(req, res){
	var type = "lorem",
		json = true,
		num = 2,
		URL_BASE = "http://loripsum.net/api";
	for(var i = 0; i < req.params.length; i++) {
		if(req.params[i] == 'bacon' || req.params[i] == 'lorem' || req.params[i] == 'hipster') {
			type = req.params[i];
		}
		else if (!isNaN(req.params[i])) {
			num = req.params[i];
		}
	}
	// begin response blocks
	res.set('Access-Control-Allow-Origin', '*');
  	res.set('Access-Control-Allow-Method', 'GET, POST');
  	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
	if (type == 'hipster') {
		URL_BASE = 'http://hipsterjesus.com/api/'
		request({url:URL_BASE, qs:{'paras': num, 'html': false, 'type': 'hipster-centric'}, json: true}, function(err, http_res, body) {
			if(err) { console.log(err); return; }
			  var data = body;
		        var text = data.text.split('\n')
		        // console.log(data.text)
		        // console.log(http_res);
		        res.json(text);
		});
	} else if (type == 'bacon') {
		URL_BASE = 'http://baconipsum.com/api/?'
		request({url:URL_BASE, qs:{'paras': num, 'type': 'meat'}, json: true}, function(err, http_res, body) {
			if(err) { console.log(err); return; }
			  var text = body;
		        // var text = data.text.split('\n')
		        // console.log(data.text)
		        // console.log(http_res);
		        res.send(text);
		});
	} else {
		request({url:URL_BASE + "/" + num + "/plaintext"}, function(err, http_res, body) {
			if(err) { console.log(err); return; }
			  var data = body;
		        var arr = data.split('\n\n')
		        res.json(arr);
		});
	}
}

app.get('/api/*/*/*', api.handle); // api/source/num/type
app.get('/api/*/*', api.handle);
app.get('/api/*', api.handle);
app.get('/api/', api.handle);




// var http = require("http");

// app.get('/api/:num', function(req, res){
//   	var num = req.params.num || 2
// 	res.set('Access-Control-Allow-Origin', '*');
//   	res.set('Access-Control-Allow-Method', 'GET, POST');
//   	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
// 	var options = {
//     	host: 'loripsum.net',
//     	path: '/api/'+ num +'/plaintext'
// 	};

// 	http.get(options, function (http_res) {
// 	    var data = "";
// 	    http_res.on("data", function (chunk) {
// 	        data += chunk;
// 	    });
// 	    http_res.on("end", function () {
// 	        var arr = data.split('\n\n')
// 	        res.jsonp(arr);
// 	    });
// 	});
// });


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port 3000');