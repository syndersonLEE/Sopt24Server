const http = require('http');
const url = require('url');
const crypto = require('crypto');

const makeString = (len) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

let message = "";
let jsonData = {
    "msg" : "",
    "hashed" : ""
}

http.createServer((req, res) => {
    const urlParse = url.parse(req.url);
    if(urlParse.pathname == "/favicon.ico"){
        console.log("헷");
        res.end();
        return null;
    }
    crypto.randomBytes(32, async (err, buffer) => {
        if(err){
            console.log("randomByte Function error 발생");
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            message = "rd function Error";
            res.write(JSON.stringify(message));
            res.end();
        }
        else {
            crypto.pbkdf2(makeString(10), buffer.toString('base64'), 10000, 64, 'sha512', (err, hashed) => {
                if (err) {
                    console.log("pdkdf2 Function error 발생");
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    message = "pdkdf function Error";
                    res.write(JSON.stringify(message));
                    res.end();
                }
                else {
                    jsonData.hashed = hashed.toString('base64');
                    console.log(hashed.toString('base64'));
                    
                }
            })
        }
    })

}).listen(3000, () => {
    console.log("통신 성공");
})