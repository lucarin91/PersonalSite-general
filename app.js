/**
 * Module dependencies
 */
var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if ('development' == app.get('env')) {
  console.log("development");
  app.set('mongodb_uri', 'mongo');
}

// production only
if ('production' == app.get('env')) {
  console.log("production");
  app.set('mongodb_uri', 'localhost');
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+app.get('mongodb_uri')+'/personal', function(err) {
    if(err) {
        console.log('connection error', err);

    } else {
        console.log('connection successful');
        var test = require('./test/testdata.js');
        test.me();
        test.curriculum();
        test.projects();
        test.skills();
    }
});

/**
 * Routes
 */
 var index = require('./routes/index');
 var partials = require('./routes/partials');
 var api = {me: require('./routes/api/me'),
            curriculum: require('./routes/api/curriculum'),
            projects: require('./routes/api/projects'),
            skills: require('./routes/api/skills')};

// serve index and view partials
app.use('/', index);
app.use('/html', partials);
// JSON API
app.use('/api/:lang',function(req,res,next){
  if (req.params.lang =='ita' || req.params.lang =='eng'){
    req.lang = req.params.lang;
    next();
  }else {
    next(new Error('Lingua non riconosciuta!'));
  }
});
app.use('/api/*/me', api.me);
app.use('/api/*/curriculum', api.curriculum);
app.use('/api/*/projects', api.projects);
app.use('/api/*/skills', api.skills);

// redirect all others to the index (HTML5 history)
app.use('*', index);


/**
 * ERROR
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development only
if (env === 'development') {
  app.use(errorHandler());
  // development error handler
  // will print stacktrace
  /*app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });*/
}

// production only
if (env === 'production') {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

var server = app.listen();

/**
 * Start Server
 */
/*
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
*/
