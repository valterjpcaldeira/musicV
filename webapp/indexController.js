var express = require('express');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
//var wedeployMiddleware = require('wedeploy-middleware');
var WeDeploy = require('wedeploy');
var http = require('http');
var app = express();

//app.use(morgan('combined'));

// Lista de Utilizadores
var users = [
  { id: 1, username: 'Pedro Pinto', email: 'ppinto@ppl.com' },
  { id: 2, username: 'Francisco', email: 'francisco@ppl.com' }, 
  { id: 3, username: 'Carla Figueiredo', email: 'cfig@ppl.com' }
];
// Definir um endpoint da API
app.get('/api/listaUsers', function(req, res, next) {
  res.send(users);
});

app.get('/api/test', function(req, res, next) {
  var options = {
  host: "http://data.musicv.wedeploy.io",
  port: 80,
  path: '/',
  method: 'GET'
};

http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    res.send(chunk);
}).end();
});




//CONFIG
app.use(express.static('public'));
app.use(function(err, req, res, next) {
	console.log(err);
	res.send(500);
});
app.use(favicon(__dirname + '/public/images/like.ico'));

app.get('/foo', function(req, result) {
	var url = 'http://data.musicv.wedeploy.io';

	http.get(url, function(res){
	    var body = '';
	    console.log("Got a response: aaaaaa");

	    res.send(res);
		
	}).on('error', function(e){
	      res.send(users);
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



