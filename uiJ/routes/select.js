var dbsetting = require('.dbsetting');
var mysql = require('mysql');
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    var connection = mysql.createConnection({
        host: dbsetting.host,
        port: dbsetting.port,
        user: dbsetting.user,
        password: dbsetting.password,
        database: dbsetting.database,
    });

    connection.connect();

    // 	$SQL = "select schedule_code as id, event_title as title, start_date as start, end_date as end, allday as allDay" ;
    // $result = mysqli_query($db_link, $SQL);
    // $scheduleJsonData = dbresultToJson($result);

    // function dbresultTojson($res)
    // {
    // $ret_arr = array();

    // while($row = mysqli_fetch_array($res))
    // {
    // foreach($row = mysqli_fetch_array($res))
    // {
    // $row_array[$key] = urlencode($value);
    // }
    // array_push($ret_arr, $row_array);
    // }
    // return urldecode(json_encode($ret_arr));
    // }

    // var dataArr = JSON.parse(req.body.alldata);
    // console.log(req.body.alldata);
    // console.log(dataArr);

    connection.query(
        'select schedule_code as id, event_title as title, start_date as start, end_date as end, allday as allDay from Toast_calendar',
        function (err, rows, fields) {
            if (!err) {
                console.log('The solution is: ', rows);
                res.send(rows);
            } else console.log('Error while performing Query.');
        }
    );
    //}); //<?이ㄱㅓ뭐임?? 됐다 해봐 저장하구

    connection.end();

    //connection.query("select schedule_code as id, event_title as title, start_date as start, end_date as end, allday as allDay from Toast_calendar");

    //connection.end();

    // res.send(dataArr);
    console.log('OK');
    //res.render('index', { title: 'Drag-n-drop external events - Demos | FullCalendar' });
});

module.exports = router;