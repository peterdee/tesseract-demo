const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');

const index = require('./apis/index');
const process = require('./apis/process');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// track the response time
app.use((req, res, next) => {
  req.incoming = Date.now();
  return next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(logger('dev'));

app.use('/', index);
app.use('/process', process);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  return res.render('error', {
    generated: Date.now() - req.incoming,
    year: new Date().getFullYear(),
  });
});

module.exports = app;
