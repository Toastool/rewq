var express = require('express');
var mysql = require('mysql');
var body-parser = require('body-parser');
var router = express.Router();

// router.get('/',function(req,res) { 
//     //req,res만 했을 때 -> 둘다 [Object Object]
//     //req.data,res.data -> 둘다 [Object Object]
//     //req.data.body, res.data.body -> 둘다 [Object Object]
//     //req.body, res.body -> req [Object Object] res는 undefined
//     // 이걸로 알수 있는 정보는,, 수많은 wrapping이 있는 것 같다. 벗길려면 어떻게 해야하나.
//     //뭘 더 해봐야돼..
//     // 정보 : req.query는 get방식으로 넘어오는 친구,
//     //       req.params는 라우트 파라미터 담는것(비추 방식)
//     //       req.body는 post방식으로 넘어오는 친구 !!!!!이 내용을 가져오려면 body-parser가 필요 !!!!!
//     //       아하 패키지가 더 필요했네 body-parser를 해보자
//     //       뭐지 왜 body-parser쓰지 말라는거지
//     //       오 express는 이미 body-parser가 있었네 그럼 post에서만 가능하니까 post로 받아보자
//     //       get은 주소창에서 가져와서 되는거였네 그러면 post를 쓸려면 body-parser가 필요하네 그거 써보자
// //매번 바꿔주기 host : ip:port
// //user:toast, password:toast1234, database : 'sys'
//     var connection = mysql.createConnection({
//       host     : '54.180.124.145',
//       port     : '58202',
//       user     : 'toast',
//       password : 'toast1234',
//       database : 'sys'
//     });

//     connection.connect();

//     // connection.query("INSERT INTO sys.Toast_user(userUID,userPW) VALUES ('hi','hi')", (error, rows, fields) => {
//     // if (error) throw (error+"!!!");
//     // console.log('User info is: ', rows);
//     // });

//     connection.end();
//     res.send('POST request to the homepage');
// })

// router.post('/',function(req,res) { 
//     console.log(req.body+ "\n");
//     console.log(res.body + "\n");
//     //req,res만 했을 때 -> 둘다 [Object Object]
//     //req.data,res.data -> 둘다 [Object Object]
//     //req.data.body, res.data.body -> 둘다 [Object Object]
//     //req.body, res.body -> req [Object Object] res는 undefined
//     // 이걸로 알수 있는 정보는,, 수많은 wrapping이 있는 것 같다. 벗길려면 어떻게 해야하나.
//     //뭘 더 해봐야돼..
//     // 정보 : req.query는 get방식으로 넘어오는 친구,
//     //       req.params는 라우트 파라미터 담는것(비추 방식)
//     //       req.body는 post방식으로 넘어오는 친구 !!!!!이 내용을 가져오려면 body-parser가 필요 !!!!!
//     //       아하 패키지가 더 필요했네 body-parser를 해보자
//     //         
// //매번 바꿔주기 host : ip:port
// //user:toast, password:toast1234, database : 'sys'
//     var connection = mysql.createConnection({
//       host     : '54.180.124.145',
//       port     : '58202',
//       user     : 'toast',
//       password : 'toast1234',
//       database : 'sys'
//     });

//     connection.connect();

//     // connection.query("INSERT INTO sys.Toast_user(userUID,userPW) VALUES ('hi','hi')", (error, rows, fields) => {
//     // if (error) throw (error+"!!!");
//     // console.log('User info is: ', rows);
//     // });

//     connection.end();
//     res.send('POST request to the homepage');
// })

module.exports = router;
