var express = require('express');
var router = express.Router();
const fs = require('fs');
const request = require('request');
const csv = require('csvtojson');

// var server = express.listen(3000, function(){
//     console.log("Express server has started on port 3000")
// })

/* GET home page. */
router.get('/', (req, res, next) => {
        const csvFilePath = '../src/getData2.csv';
        csv().fromFile(csvFilePath)
            .then((jsonObj) => {
                console.log(jsonObj);
                jsonObj.forEach(element => {
                    if(element.name == "winnery93@gmail.com"){
                        const resJson = {
                            "name" : element.name,
                            "colleage" : element.colleage,
                            "major" : element.major
                        }
                        res.writeHead(200, { 'Content-Type': "text/plain; charset=utf-8" });
                        res.write(JSON.stringify(resJson));
                        res.end();
                    }
                })
            })
});
router.post('/', (req, res, next) => {
    // request(options, async (error, response, body) => {
    //     if (error) {
    //         throw new Error(error)
    //     }
    //     else {

    const randomByte = crypto.randomBytes(32, (err, buffer) => {
        return buffer;            
    });
    
    //             crypto.pbkdf2(body.data.phone, buffer.toString('base64'), 10000, 64, 'sha512', (err, hashed) => {
    //                 sendData2.hashedPhone = hashed.toString('base64');
    //                 sendData2.name = body.data.name;
    //                 sendData2.colleage = body.data.colleage;
    //                 sendData2.major = body.data.major;
    //                 sendData2.name = body.data.email;
    //                 const resultCsv = json2csv.parse(sendData2);
    //                 fs.writeFile('getData2.csv', resultCsv, (err) => {
    //                     if (err) {
    //                         message = "저장/실패";
    //                         res.writeHead(500, { 'Content-Type': "text/plain; charset=utf-8" });
    //                         res.write(JSON.stringify(message));
    //                         res.end();
    //                     } else {
    //                         message = "저장/성공!";
    //                         res.writeHead(200, { 'Content-Type': "text/plain; charset=utf-8" });
    //                         res.write(JSON.stringify(message));
    //                         res.end();
    //                     }
    //                 })

    //             })
    //         })
    //     }
    // });
});

module.exports = router;
