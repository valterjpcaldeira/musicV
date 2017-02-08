var express = require('express');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var wedeployMiddleware = require('wedeploy-middleware');
var WeDeploy = require('wedeploy');
var app = express();

app.use(morgan('combined'));

//public
app.get('/login', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/login.html'));
});
app.use(favicon(__dirname + '/public/images/like.ico'));



app.get('/main.css', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/main.css'));
});
app.get('/login.css', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/login.css'));
});
app.get('/logo.png', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/images/logo.png'));
});
app.get('/stop.png', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/images/stop.png'));
});
app.get('/like.png', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/images/like.png'));
});
app.get('/icon-google-white.png', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/images/facebook.png'));
});


app.get('/index.js', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.js'));
});
app.get('/jquery-3.1.1.min.js', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/jquery-3.1.1.min.js'));
});
app.get('/list.js', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/list.js'));
});
app.get('/music.js', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/music.js'));
});
app.get('/history.js', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/history.js'));
});
app.get('/top.js', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/top.js'));
});

app.get('/foo', function(req, res) {
  var data = WeDeploy.data('http://data.musicv.wedeploy.io');
  data
  .get('youtubeLinks')
  .then(function(clientResponse) {
    res.json(clientResponse);
  });
});

app.use(wedeployMiddleware.auth({url: 'auth.musicv.wedeploy.io',redirect: '/login'}));

//private
app.get('/', function (req, res) {
	console.log('User: ', res.locals.user);
	res.sendFile(path.join(__dirname + '/public/index.html'));
});



app.set('json spaces', 40);
app.get('/search/:tagId', function (req, res) {
	var YouTube = require('youtube-node');

	var youTube = new YouTube();

	youTube.setKey('AIzaSyAAICJFcbyuLR_FJOKNRYeE9zcEfS_5tZw');

	youTube.search(req.params.tagId, 15, function(error, result) {
	  if (error) {
	    console.log(error);
	  }
	  else {
	   res.json(result);
	  }
	});

});





app.listen(80, function () {
  console.log('Listening on port 80');
});



var express = require('express');
var WeDeploy = require('wedeploy');

var app2 = express();

app2.get('/foo', function(req, res) {
  var data = WeDeploy.data('http://data.musicv.wedeploy.io');
  data
  .get('youtubeLinks')
  .then(function(clientResponse) {
    res.json(clientResponse);
  });
});

app2.listen(8080);


