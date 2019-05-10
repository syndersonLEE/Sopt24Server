var express = require('express');
var router = express.Router();


router.get('/board/:id', require('./LoadBoard'));
router.post('/board', require('./SaveBoard'));
router.put('/board', require('./UpdateBoard'));
// router.get('/board/:id', require('./LoadBoard'));


module.exports = router;