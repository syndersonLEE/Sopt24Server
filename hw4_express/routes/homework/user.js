var express = require('express');
var router = express.Router();

//external module
const mysql = require('mysql');

//internal module
const config = require('../../config/config');
const cryptoCollection = require('../../customModule/crpytoCollection');



router.post('/signup', (req, res) => {
    const connection = mysql.createConnection(config);
    connection.connect();
    const userIdx = 1;
    connection.query(`INSERT INTO user (userIdx, id, password, salt) VALUES (${userIdx},'1','1','1')`, (err, rows, field) => {
        console.log(rows);
        console.log(field);
    });

    connection.end();
})

module.exports = router;