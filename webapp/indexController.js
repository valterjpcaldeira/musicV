var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var numUsers = 0;

//CONFIG
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/images/like.ico'));
//app.use(wedeployMiddleware.auth({url: 'auth.musicv.wedeploy.io'}));

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

io.on('connection', function(socket){
	numUsers++;
	io.emit('people connected', numUsers);

 	socket.on('disconnect', function(){
	  	numUsers--;
	  	io.emit('people connected', numUsers);
  	});

  	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);
  	});
});

http.listen(80, function(){
  console.log('listening on *:80');
});

