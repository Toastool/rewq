var express = require('express');

const fs = require('fs');
var router = express.Router();


router.get('/',function(req,res){
    res.render("index",  {title: 'ToasTooL'});
});
 
router.post('/',function(req,res) {    
    var data = new Object();
    
    fs.readdir('userFile/exampleProject', (err, fileList) => {
        data.fileList = fileList;
    });
    
    
    fs.readFile('main.c', 'utf8' , (err, contents) => {
      if (err) {
        console.error(err);
        return;
      }
        data.contents = contents;
        //여기 data에는 fileList, contents다 담기는데
        //fs함수 밖에서는 그걸 최우선으로 실행해서 fs 밖에서는 없어진다
        //==>맨 끝 fs.readFile() 함수를 수행하고 그 안에서 res.send()를 해야한다.
        console.log(data);
        res.send(data);
    });
    
    // console.log(data.fileList);
    // res.send(data);
    
});

module.exports = router;