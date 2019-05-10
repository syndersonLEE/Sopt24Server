var express = require('express');
var router = express.Router();

var hwIndex = require('./homework');

router.use('/homework', hwIndex);

module.exports = router;
