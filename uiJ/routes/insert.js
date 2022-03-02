var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Drag-n-drop external events - Demos | FullCalendar' });
});

router.post('/', function(req, res) {
    var connection = mysql.createConnection({
      host     : '3.37.123.111',
      port     : '51496',
      user     : 'toast',
      password : 'toast1234',
      database : 'sys'
    });

    connection.connect();
        
    console.log("'"+req.body.query+"'");
    connection.query(req.body.query, function(err, result) {
        if(err) console.log(err);
        console.log(result);
        res.send(result);
    });
    
    connection.end();
});


module.exports = router;