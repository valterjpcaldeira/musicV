var express = require('express');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var wedeployMiddleware = require('wedeploy-middleware');
var WeDeploy = require('wedeploy');
var app = express();

//Static files
app.use(express.static('public'));

app.use(morgan('combined'));

//ERROR HANdler
app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!');
});

app.use(favicon(__dirname + '/public/images/like.ico'));


/////////PUBLIC

//FOO
app.get('/foo', function(req, res, next) {
  var data = WeDeploy.data('http://data.music.wedeploy.io');
  data
  .get('youtubeLinks')
  .then(function(clientResponse) {
    res.sendFile(path.join(__dirname + '/public/login.html'));
  }).catch((err) => {
    res.sendFile(path.join(__dirname + '/public/login.html'));
  });
});

//LOGIN
app.get('/login', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/login.html'));
});


app.use(wedeployMiddleware.auth({url: 'auth.musicv.wedeploy.io',redirect: '/login'}));

//PRIVATE
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});


//JSON
app.set('json spaces', 40);

app.get('/foo2', function(req, res, next) {
	WeDeploy.data('http://data.musicv.wedeploy.io')
  .where('state', '=', 0)
  .orderBy('id', 'desc')
  .limit(1)
  .get('youtubeLinks')
	.then(function(response) {
		res.json(response);
	})
	.catch(function(error) {
		res.json(error);
	});

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

//LISTEN
app.listen(80, function () {

});



