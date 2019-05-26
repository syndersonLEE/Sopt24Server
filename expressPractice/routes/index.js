var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/homework', require('./api/homework/index'));

module.exports = router;
