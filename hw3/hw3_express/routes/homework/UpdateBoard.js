var csv2json = require('csvtojson');
var cryptoPromise = require('crypto-promise');
var fs = require('fs');
var json2csv = require('json2csv');
var moment = require('moment');

module.exports =  (req, res) => {
    new Promise((resolve) => {
        csv2json()
            .fromFile('./boardData.csv')
            .then(async (jsonObj) => {
                let updatedObj;
                let updatedCsv;
                updatedObj = jsonObj;
                for (i in jsonObj) {
                    console.log('loop');
                    var cryptoPw;
                    // new Promise((resolve) => {
                    //     cryptoPromise.pbkdf2(req.body.pw, jsonObj[i].pw, 10000, 64, 'sha512', (err, hashed) => {
                    //         resolve(hashed);
                    //         cryptoPw = hashed;
                    //     })
                        
                    // })
                    // console.log(cryptoPw);
                    if (jsonObj[i].id === req.body.id ) {
                        if (req.body.title != null) {
                            updatedObj[i].title = req.body.title;
                            console.log('title');
                        }
                        if (req.body.body != null) {
                            updatedObj[i].body = req.body.body;
                        }
                        console.log(updatedObj[i]);
                        updatedObj[i].date = moment().format('YYYYMMDD HH:mm:ss');
                        updatedCsv = json2csv.parse(updatedObj);
                        resolve(updatedCsv);
                        break;        
                    }
                }
            })
    })
    .then((updatedCsv) => fs.writeFile('boardData.csv', updatedCsv, (err) => {
                console.log("수정 완료");
                res.write('수정 완료');
                res.end();
            })
        )
}