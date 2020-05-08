/** @file An ExpressJS app to track your trips and display flight API data.
 * @author Dasha Day Hisoler, Diana Silvas, Wanmin Zhang
 * @copyright Dasha Day Hisoler, Diana Silvas, Wanmin Zhang
 * @license
 * Copyright 2020 by Dasha Day Hisoler, Diana Silvas, Wanmin Zhang
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above copyright
 * notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
 * OF THIS SOFTWARE.
 */

'use strict';

/** Requires dotenv of `dotenv` library.
* @requires dotenv
*/
require('dotenv').config();
/** Requires http-errors of `http-errors` library.
* @requires http-errors
*/
var createError = require('http-errors');
/** Requires express of `express` library.
* @requires express
*/
var express = require('express');
/** Requires path of `path` library.
* @requires path
*/
var path = require('path');
/** No need for cookies right now
* var cookieParser = require('cookie-parser');
*/
/** Requires morgan of `morgan` library.
* @requires morgan
*/
var logger = require('morgan');
/** Requires node-sass-middleware of `node-sass-middleware` library.
* @requires node-sass-middleware
*/
var sassMiddleware = require('node-sass-middleware');
/** Requires passport of `passport` library.
* @requires passport
*/
var passport = require('passport');

/** Requires all three established routers.
* @requires indexRouter
* @requires loginRouter
* @requires flightRouter
*/
var indexRouter = require('./routes/indexRouter');
var loginRouter = require('./routes/loginRouter');
var flightRouter = require('./routes/flightRouter');

var app = express();

/** Requires models of `models` library.
* @requires models
*/
var db = require('./db/models');

/** View engine setup. */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  precision: 9
}));
app.use(express.static(path.join(__dirname, 'public')));

// Include passport authentication modules
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', loginRouter);
app.use('/flight', flightRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

/** A module that gets express
* @module
*/
module.exports = app;
