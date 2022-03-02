var express = require('express');

const fs = require('fs');
var router = express.Router();


router.get('/',function(req,res){
    res.render("index",  {title: 'ToasTooL'});
});
 
router.post('/',function(req,res) {
    var filename = req.body.filename;
    console.log(filename + "create");
    
    fs.writeFile('userFile/exampleProject/' + filename, "", 'utf8', function(error) {
        if(error) {
           console.log(error);
        }
        res.send('OK');
    });
});

module.exports = router;