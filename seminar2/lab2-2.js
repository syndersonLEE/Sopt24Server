const http = require('http');
const request = require('request');
const fs = require('fs');
const json2csv = require('json2csv');

//3000번 포트로 서버를 엽니다.
const server = http.createServer((req, res) => {
    //응답을 보낼 때의 옵션을 지정합니다.
    const options = {
        uri: 'http://15.164.75.18:3000/homework/2nd',
        method: 'GET',
    }

    //위에서 지정한 옵션으로 다른 서버에 요청을 보냅니다.
    //매개변수로 에러, 요청을 보낸 서버로의 응답을 보낼 객체, 요청을 보낸 서버의 응답을 답은 변수가 옵니다.
    request(options, (err, response, body) => {
        //나중에 응답(response)을 보낼 때 쓰일 객체입니다.
        //msg는 메세지, resData는 응답 받은 객체, resultCsv는 파일에 쓰인 csv 객체를 답을 key 값 입니다. 
        let data = {
            "msg": "",
            "resData": null,
            "resultCsv": null
        };

        if (err) {
            console.log(err);
            data.msg = "request error";
            res.writeHead(500, { 'Content-Type': "text/plain" });
            res.write(JSON.stringify(data)); //웹 페이지에 띄울거는 무조건 문자여야 합니다. 그래서 JSON 객체를 stringify 해줍니다.
            res.end();
        } else {
            //요청을 보낸 서버에서 온 응답을 JSON 객체로 파싱합니다.
            //파싱한 JSON 객체에서 data 부분의 값을 가져옵니다.
            const resData = JSON.parse(body).data;
            data.resData = resData;

            //column의 이름이 time이고 값이 data인 csv를 만듭니다.
            const resultCsv = json2csv.parse({
                data: resData,
                fields: ["time"]
            });
            data.resultCsv = resultCsv;

            //생성한 csv를 파일에 작성합니다.
            fs.writeFile('getData.csv', resultCsv, (err) => {
                if (err) {
                    data.msg = "파일 저장 에러";
                    res.writeHead(500, { 'Content-Type': "text/plain" });
                    res.write(JSON.stringify(data));
                    res.end();
                } else {
                    data.msg = "모두 다 성공!";
                    res.writeHead(200, { 'Content-Type': "text/plain" });
                    res.write(JSON.stringify(data));
                    res.end();
                }
            })
        }
    });
}).listen(3000, () => {
    console.log('connected 3000 port!!');
});