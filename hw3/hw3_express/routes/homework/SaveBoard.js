var moment = require('moment');
var cryptoPromise = require('crypto-promise');
var fs = require('fs');
var csvWriter = require('csv-write-stream');
var csv2json = require('csvtojson');

module.exports = async (req, res) => {
    let boardObject = {
        "id": req.body.id,
        "title": req.body.title,
        "body": req.body.body,
        "date": moment().format('YYYYMMDD HH:mm:ss'),
        "pw": "",
        "salt": ""
    }
    const randomCrypto = await cryptoPromise.randomBytes(32);
    const encodeCrypto = randomCrypto.toString('base64');
    boardObject.salt = encodeCrypto;
    checkTitle = true;

    new Promise((resolve) => {
        cryptoPromise.pbkdf2(req.body.pw, encodeCrypto, 10000, 64, 'sha512', (err, hashed) => {
            resolve(hashed.toString('base64'));
        })
    }).then((hashed) => {
        boardObject.pw = hashed;
    }).then(() => {
        var csvFilename = "./boardData.csv";
        if (!fs.existsSync(csvFilename)) {
            writer = csvWriter({ sendHeaders: true });
            writer.pipe(fs.createWriteStream(csvFilename));
            writer.write(boardObject);
            writer.end();
            res.write('게시물 저장 성공');
            res.end();
        }
    })
    .then(() => {
        csv2json()
        .fromFile('./boardData.csv')
        .then((jsonObj) => {
            for (i in jsonObj) {
                if (jsonObj[i].title === boardObject.title) {
                    checkTitle = false;
                }
            }
        })
        .then(() => {
            var csvFilename = "./boardData.csv";
            if(fs.existsSync(csvFilename)) {
                if (checkTitle) {
                    writer = csvWriter({ sendHeaders: false });
                    writer.pipe(fs.createWriteStream(csvFilename, { flags: 'a' }));
                    writer.write(boardObject);
                    writer.end();
                    res.writeHead(200, { 'Content-Type': "text/plain; charset=utf-8" });
                    res.write('게시물 저장 성공');
                    res.end();
                }
                else {
                    res.writeHead(200, { 'Content-Type': "text/plain; charset=utf-8" });
                    res.write('중복 제목 저장 불가');
                    res.end();
                }
            }
        })
    })
}