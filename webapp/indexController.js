var express = require('express');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var wedeployMiddleware = require('wedeploy-middleware');
var WeDeploy = require('wedeploy');
var app = express();

//Static files
app.use(express.static('public'));
//app.use(express.static('private'));

app.use(morgan('combined'));

//ERROR HANdler
//express error handler (never called)
app.use(function(err, req, res, next) {
    console.log(err);
    res.send(500);
});

app.use(favicon(__dirname + '/public/images/like.ico'));


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

/////////////////PRIVATE
app.use(wedeployMiddleware.auth({url: 'auth.musicv.wedeploy.io',redirect: '/login'}));

app.get('/', function (req, res, next) {
    console.log('User: ', res.locals.user);
	res.sendFile(path.join(__dirname + '/private/index.html'));
});



//LISTEN
app.listen(80, function () {

});



