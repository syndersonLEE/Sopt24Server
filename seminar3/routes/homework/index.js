var express = require('express');
var router = express.Router();

/* GET home page. */
// router.use('/training', require('./training/index'));
// router.get('/board', require('./GetBoard'));
router.post('/board', require('./SaveBoard'));
// router.delete('/board', require('./DeleteBoard'));
// router.put('/board', require('./UpdateBoard'));



module.exports = router;
