const json2csv = require('json2csv');
const fs = require('fs');
const csv2json = require('csv2json');

const rpm = require('../utils/responseMessage');
const src_url = './src/';

const csvManager = {
    csvWrite: (fileName, jsonData) => {
        return new Promise((resolve, reject) => {
            let resultCsv = ''
            if (jsonData.length > 0) {
                resultCsv = json2csv.parse(jsonArray);
            }

            fs.writeFile(`${src_url}${fileName}`, resultCsv, (err) => {
                if (err) {
                    reject(rpm.FAIL_CSV_WRITE);
                }
                resolve(true);
            })
        })
    },
    csvRead: (fileName) => {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(`${csv_url}${fileName}`) == false) {
                throw Error(rpm.FAIL_CSV_READ);
            }

            csv().fromF
        })
    }
}