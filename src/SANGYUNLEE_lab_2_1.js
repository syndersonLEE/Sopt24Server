
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const crypto = require('crypto');

const server = http.createServer((request, response) => {
    const urlparse = url.parse(request.url);
    const queryParsed = querystring.parse(urlparse.query);
    const str = queryParsed.str;
    crypto.randomBytes(32, (err,buf)=> {
        if(err) {
            console.log(err);
        } else {
            const salt = buf.toString('base64');
            console.log(`salt : ${salt}`);
            crypto.pbkdf2(str, salt, 10, 32, 'SHA512', (err, result) => {
                const hashedStr = result.toString('base64');
                console.log(`hashedStr : ${hashedStr}`);
                
                response.writeHead(200, {'Content-Type' : 'application/json'});
                response.write(hashedStr);
                response.end();
            })
        }
    })
    // console.log(request);
    console.log(urlparse);
}).listen(3000, () => {});

