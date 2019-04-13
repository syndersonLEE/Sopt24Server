const request = require('request');
const http = require('http');
const fs = require('fs');
const json2csv = require('json2csv');

const server = http.createServer((req, res) => {
    const options = {
        method : 'GET',
        url : 'http://15.164.75.18:3000/homework/2nd'
    }

    request(options, function(err, response, body){
        // if (err) {
        //     throw new Error(err);
        // }
        console.log(body);
        const data = JSON.parse(body).data;
        console.log(data);
        const resultCsv = json2csv.parse({
            data: data,
            fields : ["time"]
        });

        fs.writeFile('info.csv', resultCsv, (err) => {
            if(err){
                console.log(err);
            }
            else {
                res.write("파일저장완료");
                res.end();
            }

        })
    })

}).listen(3000, () => {});