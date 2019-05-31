var express = require('express');
var router = express.Router();

//external module
const json2csv = require('json2csv');
const moment = require('moment');
const fs = require('fs');
const csvtojson = require('csvtojson');

//internal module
const cryptomodule = require('../../customModule/crpytoCollection');
const csvCollection = require('../../customModule/csvCollection');
const utils = require('../../utils/utils');
const statusCode = require('../../utils/statusCode');
const resMessage = require('../../utils/responseMessage');


//1.특정 id 게시물 조회
router.get('/:id', async (req, res) => {
    fs.exists('boardDatahw3.csv', (file) => {
        if (file) {
            csvtojson().fromFile('boardDatahw3.csv')
                .then((jsonObj) => {
                    jsonObj.forEach(obj => {
                        if (obj.id == req.params.id) {
                            const showObj = {
                                id: obj.id,
                                title: obj.title,
                                content: obj.content,
                                time: obj.time
                            }
                            console.log(showObj);
                            res.status(statusCode.OK).send(utils.successTrue(statusCode.CREATED, resMessage.FIND_FILE, showObj));
                            res.end();
                            return true;
                        }
                    })
                })
        } else {
            console.log('해당 게시물 없음');
            res.status(statusCode.NOT_FOUND).send(utils.successFalse(statusCode.NOT_FOUND, resMessage.NO_FILE));
            res.end();
            return false;
        }
    })
});

//2.게시물 저장
router.post('/', async (req, res) => {
    // id(auto increase), title, content, time(moment), pw(cryptomodule), salt(crpyto)

    //check existed file and get data (+auto Increase Id)
    let existData = [];
    let checkSameTitle = false;
    let defaultId = 1;
    if (await fs.existsSync('boardDatahw3.csv')) {
        await csvtojson().fromFile('boardDatahw3.csv')
            .then((jsonObj) => {
                jsonObj.forEach(obj => {
                    if (parseInt(obj.id, 10) >= defaultId) {
                        defaultId = parseInt(obj.id, 10) + 1;
                    }
                    if (obj.title == req.body.title) {
                        checkSameTitle = true;
                    }
                })
                existData = jsonObj;
            })
    }

    //check Sametitle
    if (checkSameTitle) {
        console.log('중복 제목');
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.SAME_TITLE));
        res.end();
        return false;
    }
    //do crptoModule
    const saltValue = await cryptomodule.encodeRandomBytes();
    const incodePw = cryptomodule.pbkdf2(req.body.pw, saltValue);

    //add request body data
    let jsonObject = '';
    if (req.body.pw != undefined &&
        req.body.title != undefined &&
        req.body.content != undefined) {
        jsonObject = {
            id: defaultId.toString(),
            title: req.body.title,
            content: req.body.content,
            pw: incodePw,
            time: moment().format('YYYYMMDD h:mm:ss a'),
            salt: saltValue
        }
    }

    existData.push(jsonObject);
    console.log(existData);

    //save csv data
    const transCsv = json2csv.parse(existData);
    fs.writeFile('boardDatahw3.csv', transCsv, (err) => {
        if (err) {
            console.log(err);
            res.status(statusCode.BAD_REQUEST).send(utils.successFalse(statusCode.BAD_REQUEST, resMessage.FILE_CREATE_FAIL));
            res.end();
            return false;
        }
        else {
            console.log('파일 저장 성공');
            res.status(statusCode.CREATED).send(utils.successTrue(statusCode.CREATED, resMessage.FILE_CREATE, existData));
            res.end();
            return true;
        }
    })
});

//3. 게시물 수정
router.put('/', (req, res) => {
    fs.exists('boardDatahw3.csv', async (file) => {
        if (file) {
            csvtojson().fromFile('boardDatahw3.csv')
                .then(async (jsonObj) => {
                    await jsonObj.map(async obj => {
                        if (obj.id == req.body.id) {
                            const incodePw = await cryptomodule.pbkdf2(req.body.pw, obj.salt);
                            if (incodePw == obj.pw) {
                                obj['title'] =  req.body.title,
                                obj['content'] = req.body.content,
                                obj['time'] = moment().format('YYYYMMDD h:mm:ss a')    
                            }
                            console.log(obj);
                        }
                        return obj;
                    })
                    csvCollection.writeCsv(jsonObj);
                    res.status(statusCode.OK).send(utils.successTrue(statusCode.OK, resMessage.UPDATE_FILE, jsonObj));
                    res.end();
                    return true;
                })
        } else {
            console.log('해당 게시물 없음');
            res.status(statusCode.NOT_FOUND).send(utils.successFalse(statusCode.NOT_FOUND, resMessage.NO_FILE));
            res.end();
            return false;
        }
    })
});

router.delete('/', (req, res) => {
    fs.exists('boardDatahw3.csv', async (file) => {
        if (file) {
            csvtojson().fromFile('boardDatahw3.csv')
                .then(async (jsonObj) => {
                    let checkPoint;
                    await jsonObj.forEach(async (obj, iter) => {
                        const incodePw = await cryptomodule.pbkdf2(req.body.pw, obj.salt);
                        if(incodePw == obj.pw && obj.id == req.body.id){
                            checkPoint = iter;
                        }
                    })
                    jsonObj.splice(checkPoint, 1);
                    csvCollection.writeCsv(jsonObj);
                    console.log(convertedJson);
                    res.status(statusCode.OK).send(utils.successTrue(statusCode.OK, resMessage.DELETE_FILE, jsonObj));
                    res.end();
                    return true;
                })
        } else {
            console.log('해당 게시물 없음');
            res.status(statusCode.NOT_FOUND).send(utils.successFalse(statusCode.NOT_FOUND, resMessage.NO_FILE));
            res.end();
            return false;
        }
    })
});


module.exports = router;