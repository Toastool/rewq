var express = require('express');

const fs = require('fs');
const spawn = require('child_process').spawn;
var router = express.Router();


router.get('/',function(req,res){
    res.render("index",  {title: 'ToasTooL'});
});
 
router.post('/',function(req,res) {
    var code = req.body.code;
    var source = code.split(/\r\n|\r|\n/).join("\n");
    var file='main.c';
    
    //파일 저장
    fs.writeFile(file,source,'utf8', function(error) {
        //if(err) {
        //    console.log(err);
        //    res.status(500).send('Internal Server Error');
        //}
        console.log('write end');
    });
    
    //정리를 좀 해보자면,
    //지금 뜨고 있는 오류는 총 두개
    //main.js의 JSON.parse에서 parse할 수없다고 뜸 ==> xhr.responseData가 form의 html이기 때문 ==> response만 잘 받는다면 잘 되지 않을까?
    //==>send를 잘 해줘야 ==> compile한 내용을 잘 전해줘야 ==> compile이 잘 되어야 ==> 2번째 문제와 연관되어있나
    //두 번째는 spawn('gcc', [file])로 컴파일을 하면 첫 실행에는 잘됨. 그리고 그걸 send하면 ERR_HTTP_HEADERS_SENT가 뜸 : 뭔가 응답을 두번이상 보내주는 거라고 함
    //두번째 실행부터는 main을 찾을 수 없다는 에러가 뜸 ==> 근데 직접 터미널에 gcc로 컴파일해보면 잘 됨
    //==>결론 : 이를 통해 추측할 수 있는 것은 뭔가 spawn함수로 실행되는 버퍼?같은 데에서 main.c의 코드가 자꾸 쌓여서 main이 두개 이상이 되어서 컴파일에러가 뜨는 것이 아닌가.. ==>이게 첫 실행 오류(ERR_HTTP_HEADERS_SENT)를 설명할 수 있을지는 모르겠음(왜냐면 첫 실행 오류니까.. 버퍼?같은데에 코드가 있을리가ㅣ 없음)
    
    //진짜 결론 : spawn을 좀 더 공부해봐야 함. --> 하지만 깊은 설명을 해주는 곳은 그렇게 없음..
    //+컴파일한 내용만을 보낼 수 있는 법을 따로 조사해봐야 할듯
    var compile = spawn('gcc', [file]);
    var errorData = "";

    compile.stdout.on('data',function(data) {
        console.log('compile Stdout: '+ data.toString());
    });
    compile.stderr.on('data',function(data){
        console.log('compile Stderr: ' + data.toString());
        errorData += data.toString();
    });
    compile.on('close',function(data){
        if(data ==0) {
            var run = spawn('./a.out', []);   
            run.stdout.on('data',function(output){
                console.log('컴파일 완료');
                var responseData = {'result':'ok', 'output': output.toString('utf8')};   
                res.json(responseData);
            });
            run.stderr.on('data', function (output) {
                console.log('run Stderr: ' + String(output));
            });
            run.on('close', function (output) {
                console.log('run Stdout: ' + output.toString());
            });
        }
        if(data != 0) {
            console.log(errorData);
            var errorDataJson = {'result':'ok', 'output': errorData};
            res.json(errorDataJson);
        }

    });
    //res.render("index",  {title: 'ToasTooL'});
});

module.exports = router;