const express = require('express');
const fs =  require("fs");
// const csv = require('csvtojson');
const cryptoPromise = require('crypto-promise');
var router = express.Router();

router.post('', async (req, res, next) => {
    const csvFile = '../src/boardCsv.csv'
    let boardJson = {
        "id" : req.body.id,
        "title" : req.body.title,
        "body" : req.body.body,
        "time" : moment(),
        "pw" : req.body.pw,
        "saltValue" : ""
    }
    
    const rand = await crypto.randomBytes(32);

    console.log(boradJson);
    console.log(rand);
    csv().fromFile(csvFile)
        .then((jsonObj) => {
            jsonObj.forEach(element => {
                if(element.id == boardJson.id && element.title == boardJson.title){
                    
                }
            })
        })
});

module.exports = router;
