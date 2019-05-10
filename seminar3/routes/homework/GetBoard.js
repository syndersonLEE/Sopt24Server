var express = require('express');
var fs =  require("fs");
var router = express.Router();

let boardJson = {
    "id" : 0,
    "title" : "",
    "body" : "",
    "time" : "",
    "pw" : "",
    "saltValeu" : ""
}

router.get('/', (req, res, next) => {
    if(req.params.id){

    }
});

module.exports = router;
