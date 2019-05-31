var express = require('express');
var router = express.Router();

//external module
router.use('/board', require('./board.js'));
router.use('/', require('./user.js'));

module.exports = router;