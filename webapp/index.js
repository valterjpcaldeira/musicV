var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = process.env.PORT || 80;
var numUsers = 0;

//CONFIG
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/images/like.ico'));
//app.use(wedeployMiddleware.auth({url: 'auth.musicv.wedeploy.io'}));

/////////PUBLIC
//LOGIN
app.get('/login', async  (req, res)=> {
	await res.sendFile(path.join(__dirname + '/public/login.html'));
});

//youtube Service
app.get('/search/:tagId',async (req, res)=> {
	var YouTube = require('youtube-node');

	var youTube = new YouTube();

	youTube.setKey(process.env.TOKEN);//Set this token in config file or while running node

	await youTube.search(req.params.tagId, 15, function(error, result) {
	  if (error) {
		  console.log(error);
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
app.get('/', async (req, res, next)=> {
	//console.log('User: ', res.locals.auth.currentUser);
	await res.sendFile(path.join(__dirname + '/private/index.html'));
});

io.on('connection', async (socket) =>{
	numUsers++;
	io.emit('people connected', numUsers);

 	socket.on('disconnect', ()=>{
	  	numUsers--;
	  	io.emit('people connected', numUsers);
  	});

  	socket.on('chat message', (msg)=>{
    	io.emit('chat message', msg);
  	});
});

http.listen(port, ()=>{
  console.log('listening on *:80');
});
