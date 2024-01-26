var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('No te pierdas las últimas novedades');
});

module.exports = router;
