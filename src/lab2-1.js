const url = require('url');
const querystring = require('querystring');
const crypto = require('crypto');
const http = require('http');

//3000포트로 서버를 엽니다
const server = http.createServer((req, res) => {
    //3000번 포트로 요청(request)을 보낸 메세지에서 url 부분(string으로 되어있음)을 url 객체로 파싱해줍니다 
    //url 객체에서 어떤 path로 요청이 들어왔는지도 확인해 줄 수 있습니다. 꼭 임의로라도 path 지정해서 콘솔로 찍어서 확인해보세요!
    let urlParsed = url.parse(req.url);
    
    //url 객체에서 query 부분(string 으로 되어있음)을 JSON 객체 형태로 파싱해줍니다. 
    let queryParsed = querystring.parse(urlParsed.query);

    console.log(queryParsed);
    //query 부분을 파싱한 JOSN 객체에서 필요한 부분만 새로운 변수에 넣습니다.
    let str = queryParsed.str;
    //나중에 응답(response)을 보낼 때 쓰일 객체입니다.
    //msg는 메세지이고 hashed는 해싱된 문자입니다.
    let data = {
        "msg": "",
        "hashed": null
    };

    //crypto 모듈을 사용하여 랜덤한 값을 생성합니다. 해당 값으로 암호화 시 salt 값으로 사용합니다.
    //32byte 길이의 랜덤한 문자열을 행성합니다
    //생성이 완료되면 콜백 함수가 실행되는데 여기서 err는 에러가 났을 때 에러가 담기고, buffer에는 생성된 랜덤 문자열이 담깁니다.
    crypto.randomBytes(32, function(err, buffer) {
        if (err) {
            //console.log(err);
            data.msg = "randomBytes 에러";

            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.write(JSON.stringify(result));
            res.end();
        } else {
            //생성된 문자열을 salt 값으로 암호화를 합니다 (반드시 toString으로 문자로 만드시고 해싱해야합니다!!!)
            //해시된 문자열이 나올 경우 콜백함 수가 실행되는데 hashed에 해시된 문자열이 들어갑니다.
            crypto.pbkdf2(str, buffer.toString('base64'), 10000, 64, 'sha512', (err, hashed) => {
                if (err) {
                    //console.log(err);
                    data.msg = "pbkdf2 에러";

                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.write(JSON.stringify(result));
                    res.end();
                } else {
                    //암호화가 잘 완료된 경우 응답을 보낼 객체에 담습니다.
                    data.msg = "암호화 success";
                    data.hashed = hashed.toString('base64');
                    //응답을 줄 때 상태코드를 지정합니다.
                    res.statusCode = 200;
                    //응답 헤더를 셋팅합니다.
                    res.setHeader('Content-Type', 'text/plain');
                    res.write(JSON.stringify(data));
                    res.end();
                }
            });

        }
    });


}).listen(3000, (req, res) => {
    console.log("3000 포트와 연결중!");
});