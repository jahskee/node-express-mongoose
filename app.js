/*jshint esversion: 6 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

// initialize express app
const app = express();
app.use(cookieparser('cscie31-secret'));
app.use(session({
  secret: 'cscie31',
  resave: 'true',
  saveUninitialized: 'true',
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// connect to mongodb
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00-gv7jy.mongodb.net:27017,cluster0-shard-00-01-gv7jy.mongodb.net:27017,cluster0-shard-00-02-gv7jy.mongodb.net:27017/${process.env.DB_DATABASE}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);
var db = mongoose.connection;

db.on('open', function() {
  console.log('connected to remote mongodb database');
});

// setup routes
const contacts = require('./routes/contacts');
const viewcontact = require('./routes/viewcontact');

// setup routers and controllers
app.use('/', contacts);
app.use('/contacts', contacts);
app.use('/viewcontact', viewcontact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;