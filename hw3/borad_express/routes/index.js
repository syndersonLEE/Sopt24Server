var express = require('express');
var router = express.Router();

console.log('checkforrouting')
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  console.log('checkforRouting2')
});

// express.listen(3001);

module.exports = router;
