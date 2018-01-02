var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var appserver = express();

// view engine setup
appserver.set('views', path.join(__dirname, 'views'));
appserver.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//appserver.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
appserver.use(logger('dev'));
appserver.use(bodyParser.json());
appserver.use(bodyParser.urlencoded({ extended: false }));
appserver.use(cookieParser());
appserver.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
appserver.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
appserver.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = appserver;
