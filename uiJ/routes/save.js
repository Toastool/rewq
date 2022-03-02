var express = require('express');
var dbsetting = require('./dbsetting');
var mysql = require('mysql');
var router = express.Router();

module.exports = router;

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Drag-n-drop external events - Demos | FullCalendar' });
});

router.post('/', function(req,res){
    var connection = mysql.createConnection({
        host: dbsetting.host,
        port: dbsetting.port,
        user: dbsetting.user,
        password: dbsetting.password,
        database: dbsetting.database,
    });
    
    connection.connect();
    var dataArr = JSON.parse(req.body.alldata);
    var title = dataArr[0].title;
    var allday = dataArr[0].allday;
    var start = dataArr[0].start;
    //T랑 Z가 같이들어와서 없애기
    start = start.replace('T', ' ');
    start = start.replace('Z', '');
    var end_date = dataArr[0].end;
    end_date = end_date.replace('T', ' ');
    end_date = end_date.replace('Z', '');
    connection.query(
            "insert into sys.Toast_calendar(event_title, start_date, end_date, allday) values('" +
                title +
                "', '" +
                start +
                "','" +
                end_date +
                "','" +
                allday +
                "')"
        );

    connection.end();

    res.send(dataArr);
    console.log('OK');
})



//php
// $dataArr = json_decode($_POST["alldata"]);

// echo '<script>';
// echo 'console.log("'.$_POST["alldata"].'")';
// echo 'console.log("'.$dataArr.'")';
// echo '</script>';
// //echo 'console.log($_POST["alldata"])';
// //echo 'console.log($dataArr)';

// for($i=0; $i < count($dataArr); $i++){
// 	$title = $dataArr[$i]->title;
// 	$allday = $dataArr[$i]->allday;
// 	$start = $dataArr[$i]->start;
// 	$end = $dataArr[$i]->end;

// 	$SQL - "insert into Toast_calendar(event_title, start_date, end_date, allday) values('".$title"','".$start"','".$end"','".$allday"')";
// 	mysqli_query($db_link, $SQL);
// }
// echo "OK";