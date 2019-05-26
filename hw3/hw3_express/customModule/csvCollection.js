const json2csv = require('json2csv')
const fs = require('fs');

const resMessage = require('../utils/responseMessage');

const fileDir = './src/'

const csvCollection = {
    //Save CSV File that converted from json object (save all input)
    writeCsv: (jsonObject) => {
        const transCsv = json2csv.parse(jsonObject);
        fs.writeFile('boardDatahw3.csv', transCsv, (err) => {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                console.log('파일 저장 성공');
                return true;
            }
        })
    }
}

module.exports = csvCollection;