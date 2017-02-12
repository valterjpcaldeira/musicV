var express = require('express');
var morgan = require('morgan');
var path = require('path');
var favicon = require('serve-favicon');
var wedeployMiddleware = require('wedeploy-middleware');
var WeDeploy = require('wedeploy');
//var passport = require('passport');
//var flash    = require('connect-flash');
var app = express();

//CONFIG
//require('./config/passport')(passport); // pass passport for configuration

	app.use(function(err, req, res, next) {
	    console.log(err);
	    res.send(500);
	});

	app.use(favicon(__dirname + '/public/images/like.ico'));



//app.use(morgan('combined'));

//ERROR HANdler
//express error handler (never called)



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

app.get('/', isLoggedIn, function (req, res, next) {
    console.log('User: ', res.locals.user);
	res.sendFile(path.join(__dirname + '/private/index.html'));
});


// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}



//LISTEN
app.listen(80, function () {

});



