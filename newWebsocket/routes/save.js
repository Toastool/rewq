var express = require('express');

const fs = require('fs');
var router = express.Router();


router.get('/',function(req,res){
    res.render("index",  {title: 'ToasTooL'});
});
 
router.post('/',function(req,res) {
    var code = req.body.saveContents;
    var source = code.split(/\r\n|\r|\n/).join("\n");
    var file='main.c';
    
    fs.writeFile(file, source, 'utf8', function(error) {
        //if(err) {
        //    console.log(err);
        //    res.status(500).send('Internal Server Error');
        //}
        console.log(source);
        console.log('write end');
    });
});

module.exports = router;