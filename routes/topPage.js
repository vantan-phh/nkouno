var router = require('express').Router();

router.get('/', function(req, res) {
  res.render('topPage');
});

module.exports = router;
