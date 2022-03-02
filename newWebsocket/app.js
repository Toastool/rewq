var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var requestIp = require('request-ip');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var formRouter = require('./routes/form_receive');
var saveRouter = require('./routes/save');
var loadRouter = require('./routes/load');
var createRouter = require('./routes/create');


const bodyParser = require('body-parser');
const fs = require('fs');
const spawn = require('child_process').spawn;

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.io = require("socket.io")();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/form',formRouter);
app.use('/save',saveRouter);
app.use('/load', loadRouter);
app.use('/create', createRouter);

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


//ip주소 얻어오기
// inside middleware handler
// const ipMiddleware = function(req, res, next) {
//     const clientIp = requestIp.getClientIp(req); 
//     next();
// };

// app.use(requestIp.mw());
// app.get('/index',function(req, res) {
//     // by default, the ip address will be set on the `clientIp` attribute
//     console.log("clientIp:" + requestIp.getClientIp(req));
//     //본인 커서는 만들지 않게?
// });
// var ip_addr;
// app.get('/', function(req, res){
//    ip_addr  = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   console.log("client IP: " +requestIp.getClientIp(req));
//   ips = requestIp.getClientIp(req);
//     console.log("\n 아ㅏㅏㅏㅏㅏ\t"+ips+"dkdkkd\t"+ip_addr);
//     console.log("\n안되나?");
// })

// app.get('/form',function(req,res){
//     res.render("index", {title: 'ToasTooL'});
// });
 
// app.post('/form_receive',function(req,res) {
//     var code = req.body.code;
//     var source = code.split(/\r\n|\r\n/).join("\n");
//     var file='main.c';
    
//     fs.writeFile(file,source,'utf8', (err) => {
//         console.log('write end');
//     });
//     var compile = spawn('gcc',[file]);
//     compile.stdout.on('data',function(data) {
//         console.log('stdout: '+data);
//     });
//     compile.stderr.on('data',function(data){
//         console.log(String(data));
//     });
//     compile.on('close',function(data){
//         if(data ==0) {
//             var run = spawn('./a.out',[]);    
//             run.stdout.on('data',function(output){
//                 console.log('컴파일 완료');
//                 var responseData = {'result':'ok','output': output.toString('utf8')};
//                 res.json(responseData);
//             });
//             run.stderr.on('data', function (output) {
//                 console.log(String(output));
//             });
//             run.on('close', function (output) {
//                 console.log('stdout: ' + output);
//             });
//         }
//     });
//     res.render("index", {title: 'ToasTooL'});
// });
//app.listen(3000);


//새 웹소켓 접속시
app.io.on("connection", (socket) => {
    console.log("새로 접속.");
    socket.on("disconnect", () => {
        console.log("접속 끊어짐.");
    });

    socket.on("update", (data) => {
        console.log(data.event, data.delta);
        socket.broadcast.emit("update", data);
    });
})

module.exports = app;

//잠시 생각해보자
//자 일단 접속을 해, 그러면 cnt++를 해서 하나 늘리고
//그게 index가 되는거야
//그러면 그 인덱스에 create를 해
//그러면 이벤트를 보낼때

//1. ip를 보내는경우
//내 ip와 받은 ip가 다를때 받은 ip의 커서를 움직인다.. --> 받은 ip의 커서를 움직이려면
//moveCursor('ip.tostring()') 이런식으로 해서 움직이며 ㄴ될 것 같은데
//근데 생각해보니까 move를 하려면 아 인덱스가 없어도 되나?
//그러면 굳이 인덱스가 필요할까를 고민해 봐야 하는데
//인덱스... 없어도 될 것 같기도 하고
//왜냐면 만들 때 그냥 자기 ip주소를 stirng해서 그걸 id로 삼고 그걸 주고받으면  되지않을까?
//만약에 인덱스가 필요하다면 index랑 ip 둘다 받아와야함.

//그러니까 clientip를 알수 있으니까 그 ip를 id로 써서 그걸 move하는 거지, 그런데 create를 해야할텐데...
//음.... 이게 되려나..? 클라이언트마다 create를 할 수 있으려나?
//근데 생각해보면 음.. cursor를 여기서 관리하는게 맞지 않을까?
//여기서 커서를 만들고 커서를 주고받으면 되지않을까? 아니면 저기서 ip를 만들던가 ㅇㅇ