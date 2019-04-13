
const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
    const urlparse = url.parse(request.url);
    const queryParsed = querystring.parse(urlparse.query);
    const str = queryParsed.str;
    crypto.randomBytes(32, (err,buf)=> {
        if(err) {
            console.log(err);
        } else {
            const salt = buf.toString('base64');
            crypto.pdkdf2(str, salt, 10, 32, 'SHA512', (err, result) => {
                const hashedStr = result.toString('base64');
                console.log(`hashedStr : ${hashedStr}`);
                request.writeHead(200, {'Content-Type' : 'appication/json' });
                request.write(hashedStr);
                console.log(hashedStr);
            })
        }
    })
    // console.log(request);
    console.log(urlparse);
}).listen(3000, () => {});

