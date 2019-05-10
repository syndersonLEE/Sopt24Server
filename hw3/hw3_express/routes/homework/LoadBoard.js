var http = require('http');
var fs = require('fs');
var csv2json = require('csvtojson');


module.exports = (req, res) => {
    const boardId = req.params.id;
    csv2json()
        .fromFile('./boardData.csv')
        .then((jsonObj) => {
            for(i in jsonObj){
                if(jsonObj[i].id === boardId){
                    console.log(jsonObj[i]);
                    res.writeHead(200, { 'Content-Type': "text/plain; charset=utf-8" });
                    res.write(JSON.stringify(jsonObj[i]));
                }
            }
        })
        .then(() => {
            res.end();
        })
};  