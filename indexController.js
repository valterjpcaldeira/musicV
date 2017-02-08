var express = require('express');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var wedeployMiddleware = require('wedeploy-middleware');
var WeDeploy = require('wedeploy');
var app = express();

//Static files
app.use(express.static('public'));

//ERROR HANdler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.use(morgan('combined'));

//PUBLIC

//FOO
app.get('/foo', function(req, res) {
  var data = WeDeploy.data('http://data.musicv.wedeploy.io');

  data
  .get('youtubeLinks')
  .then(function(clientResponse) {
    res.json(clientResponse);
  }).catch((err) => {
    res.json(err);
  });

});

app.get('/login', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.use(favicon(__dirname + '/public/images/like.ico'));


//app.use(wedeployMiddleware.auth({url: 'auth.musicv.wedeploy.io',redirect: '/login'}));

//PRIVATE
app.get('/', function (req, res) {
	console.log('User: ', res.locals.user);
	res.sendFile(path.join(__dirname + '/public/index.html'));
});


//JSON
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

//LISTEN
app.listen(80, function () {
  console.log('Listening on port 80');
});



