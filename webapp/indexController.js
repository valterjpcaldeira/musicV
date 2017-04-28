var express = require('express');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
//var wedeployMiddleware = require('wedeploy-middleware');
var WeDeploy = require('wedeploy');
var http = require('http');
var app = express();

//app.use(morgan('combined'));

//CONFIG
app.use(express.static('public'));
app.use(function(err, req, res, next) {
	console.log(err);
	res.send(500);
});
app.use(favicon(__dirname + '/public/images/like.ico'));

app.get('/foo', function(req, result, next) {
	var url = 'http://data.musicv.wedeploy.io';

	http.get(url, function(res){
	    var body = '';
	    console.log("Got a response: aaaaaa");

	    res.on('data', function(chunk){
	        body += chunk;
	        console.log("Got a response: "+body);
	    });

	    res.on('end', function(){
	    	console.log("Got a response: ", fbResponse);
	        result.json(body);
	    });
	}).on('error', function(e){
	      console.log("Got an error: ", e);
	});
});


/////////PUBLIC
//LOGIN
app.get('/login', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/login.html'));
});

//youtube Service
app.get('/search/:tagId', function (req, res) {
	var YouTube = require('youtube-node');

	var youTube = new YouTube();

	youTube.setKey('AIzaSyAAICJFcbyuLR_FJOKNRYeE9zcEfS_5tZw');

	youTube.search(req.params.tagId, 15, function(error, result) {
	  if (error) {
	  }
	  else {
	   res.json(result);
	  }
	});

});

/////////PRIVATE

//var authMiddleware = wedeployMiddleware.auth({
//  url: 'auth.musicv.wedeploy.io',
//  redirect: '/login'
//});
//app.use(wedeployMiddleware.auth({url: 'auth.project.wedeploy.io'}));
app.get('/', function (req, res, next) {
	//console.log('User: ', res.locals.auth.currentUser);
	res.sendFile(path.join(__dirname + '/private/index.html'));
});


//LISTEN
app.listen(80, function () {

});



