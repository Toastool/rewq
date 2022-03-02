var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var insertRouter = require('./routes/insert');
var dbsetting = require('./routes/dbsetting');
var saveRouter = require('./routes/save');

var app = express();

app.io = require("socket.io")();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/insert', insertRouter);
app.use('/save', saveRouter);

app.get('/join',function(req,res) { 
//매번 바꿔주기 host : ip:port
//user:toast, password:toast1234, database : 'sys'
    var connection = mysql.createConnection({
      host     : dbsetting.host,
      port     : dbsetting.port,
      user     : dbsetting.user,
      password : dbsetting.password,
      database : dbsetting.database
    });

    connection.connect();

    connection.query("INSERT INTO sys.Toast_user(userUID,userPW) VALUES ('"+req.query.ID+"','"+req.query.PW+"')", (error, rows, fields) => {
        if (error) throw (error+"!!!"+dbsetting.host);
    });
    connection.end();
    res.send('POST request to the homepage');
})

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

module.exports = app;
