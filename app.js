var express = require('express');
var app = express();
var Chance = require('chance');
var chance = new Chance();
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
api.wrap = function(textArr, wraptag) {
	var str = "";
	for(var i = 0; i < textArr.length; i++) {
		str += "<" +wraptag+">" + textArr[i]+ "</" +wraptag+">"
	}
	return str;
}
api.handle = function(req, res){
	var type = "lorem",
		json = true,
		num = 2,
		req_num = 2,
		URL_BASE = "http://loripsum.net/api",
		format = "json",
		list = false;
	for(var i = 0; i < req.params.length; i++) {
		if(req.params[i] == 'bacon' || req.params[i] == 'lorem' || req.params[i] == 'hipster' || req.params[i] == 'lorem2' || req.params[i] == 'random') {
			type = req.params[i];
		} else if (!isNaN(req.params[i])) {
			req_num = num = req.params[i];
		} else if (req.params[i] === "html") {
			format = "html";
		} else if (req.params[i] === "list") {
			list = true;
		}
	}
	// begin response blocks
	res.set('Access-Control-Allow-Origin', '*');
  	res.set('Access-Control-Allow-Method', 'GET, POST');
  	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  	function sendResponse (text) {
  		var str = "";
  		if(list) {
	  		str = text[0].match( /[^\.!\?]+[\.!\?]+/g );
	  		if(str.length < req_num) {
	  			str = str.concat(text[1].match( /[^\.!\?]+[\.!\?]+/g ))	;
	  		}
	  		str.splice(req_num);
	  		text = str;
	  	}
  		if (format === "html") {
  			list ? text = api.wrap(text, "li") : text = api.wrap(text, "p")
  			res.send(text);
  		}
  		else {
  			res.json(text);
  		}
  	}
  	var text = [];
  	if(list) {
  		num = 3;
  	}
	if (type == 'hipster') {
		URL_BASE = 'http://hipsterjesus.com/api/'
		request({url:URL_BASE, qs:{'paras': num, 'html': false, 'type': 'hipster-centric'}, json: true}, function(err, http_res, body) {
			if(err) { console.log(err); return; }
		        text = body.text.split('\n')
		        sendResponse(text);
		});
	} else if (type == 'bacon') {
		URL_BASE = 'http://baconipsum.com/api/?'
		request({url:URL_BASE, qs:{'paras': num, 'type': 'meat'}, json: true}, function(err, http_res, body) {
			if(err) { console.log(err); return; }
			  	text = body;
			  	sendResponse(text);
		});
	} else if (type == 'random') {
			for(var i = 0; i < num; i++) {
			  	text.push(chance.paragraph());
			 }
		  	sendResponse(text);
	} else if (type == 'lorem2') {
		URL_BASE = 'http://www.randomtext.me/api/lorem/p-'
		request({url:URL_BASE + num, json: true}, function(err, http_res, body) {
			if(err) { console.log(err); return; }
			  	text = body.text_out;
			  	sendResponse(text);
		});
	} else {
		request({url:URL_BASE + "/" + num + "/plaintext"}, function(err, http_res, body) {
			if(err) { console.log(err); return; };
		        text = body.split('\n\n')
		        text.pop();
		        sendResponse(text);
		});
	}
    
}

app.get('/api/*/*/*/*', api.handle); 
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