const http = require('http');
const qs = require('querystring');
const url = require('url');
const crypto = require('crypto');
const fs = require('fs');
const json2csv = require('json2csv');
const csv = require('csvtojson');
const request = require('request');

http.createServer((req, res) => {
    const urlParse = url.parse(req.url);
    const queryParse = qs.parse(urlParse.query); //파싱 데이터 저장
    let sendData = {
        "id": queryParse.id,
        "pw": "",
        "saltValue": ""
    };
    let sendData2 = {
        "name": "",
        "colleage": "",
        "major": "",
        "email": "",
        "hashedPhone": ""
    };
    let message;

    //page1
    if (urlParse.pathname == '/signin') {
        crypto.randomBytes(32, function (err, buffer) {
            if (err) {
                console.log("randomByte Function error 발생");
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                message = "rd function Error";
                res.write(JSON.stringify(message));
                res.end();
            }
            else {
                crypto.pbkdf2(queryParse.pw, buffer.toString('base64'), 10000, 64, 'sha512', async (err, hashed) => {
                    if (err) {
                        console.log("pdkdf2 Function error 발생");
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                        message = "pdkdf function Error";
                        res.write(JSON.stringify(message));
                        res.end();
                    }
                    else {
                        sendData.pw = hashed.toString('base64');
                        sendData.saltValue = buffer.toString('base64');
                        const resultCsv = json2csv.parse(sendData);
                        fs.writeFile('getData.csv', resultCsv, (err) => {
                            console.log(resultCsv);
                            console.log()
                            if (err) {
                                console.log("파일 저장 실패");
                                message = "파일 저장 에러";
                                res.writeHead(500, { 'Content-Type': "application/json; charset=utf-8" });
                                res.write(JSON.stringify(message));
                                res.end();
                            } else {
                                console.log("회원 가입 성공");
                                message = "회원 가입 성공";
                                res.writeHead(200, { 'Content-Type': "text/plain; charset=utf-8" });
                                res.write(JSON.stringify(message));
                                res.end();
                            }
                        })
                    }
                })
            }
        })
    }
    else if (urlParse.pathname == '/signup') {
        const csvFilePath = './getData.csv';
        var loginState = false;
        csv().fromFile(csvFilePath)
            .then((jsonObj) => {
                jsonObj.forEach(element => {
                    if (element.id == sendData.id) {
                        crypto.pbkdf2(queryParse.pw, element.saltValue, 10000, 64, 'sha512', async (err, hashed) => {
                            if (hashed.toString('base64') == element.pw) {
                                console.log("로그인 성공");
                                message = "로그인 성공";
                                res.writeHead(200, { 'Content-Type': "text/plain; charset=utf-8" });
                                res.write(JSON.stringify(message));
                                res.end();
                            }
                            else {
                                console.log("로그인 실패");
                                message = "로그인 실패";
                                res.writeHead(400, { 'Content-Type': "text/plain; charset=utf-8" });
                                res.write(JSON.stringify(message));
                                res.end();
                            }
                        });

                    }
                })
            })
                
            
    }
    //page2
    else if (urlParse.pathname == '/info') {
        const options = {
            method: 'POST',
            url: 'http://15.164.75.18:3000/homework/2nd',
            body: {
                name: '이상윤',
                phone: '010-4244-0662'
            },
            json: true
        };

        request(options, async (error, response, body) => {
            if (error) {
                throw new Error(error)
            }
            else {

                crypto.randomBytes(32, (err, buffer) => {
                    crypto.pbkdf2(body.data.phone, buffer.toString('base64'), 10000, 64, 'sha512', (err, hashed) => {
                        sendData2.hashedPhone = hashed.toString('base64');
                        sendData2.name = body.data.name;
                        sendData2.colleage = body.data.colleage;
                        sendData2.major = body.data.major;
                        sendData2.name = body.data.email;
                        const resultCsv = json2csv.parse(sendData2);
                        fs.writeFile('getData2.csv', resultCsv, (err) => {
                            if (err) {
                                message = "저장/실패";
                                res.writeHead(500, { 'Content-Type': "text/plain; charset=utf-8" });
                                res.write(JSON.stringify(message));
                                res.end();
                            } else {
                                message = "저장/성공!";
                                res.writeHead(200, { 'Content-Type': "text/plain; charset=utf-8" });
                                res.write(JSON.stringify(message));
                                res.end();
                            }
                        })

                    })
                })
            }
        });
    }

}).listen(3000, () => {
    console.log("통신 성공");
});

