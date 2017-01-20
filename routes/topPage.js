var router = require('express').Router();
var uuid = require('node-uuid');

var hashed = require('../other/hashed.js');
var createSalt = require('../other/createSalt.js');
var connection = require('../other/connectMysql.js');

router.get('/', function(req, res) {
  if(req.session.userId) {
    //console.log(req.session.userId);
  }else {
    res.render('topPage');
  }
});

router.post('/signup', function(req, res) {
  var data = req.body;
  var salt = createSalt();
  connection.query(
    "INSERT INTO `users`(`name`, `mail`, `salt`, `hash`) VALUES(?, ?, ?, ?)",
    [data.userName, data.email, salt, hashed(data.password, salt)],
    function(err, result) {
      if(err) {
        if(err.match(/Duplicate/)) {
          res.render('fail', {err: "既に登録済みです"});
        }else {
          res.render('fail', {err: "データベースエラー"});
        }
      }
      console.log(result);
      req.session.userId = result.insertId;
      res.redirect("/");
    }
  )
});

router.post('/signin', function(req, res) {
  var data = req.body;
  "SELECT `id`, `salt`, `hash` FROM `users` WHERE `mail` = ?",
  [data.email], function(err, result) {
    if(err) res.render('fail', {err: "データベースエラー"});
    if(result = []) res.render('fail', {err: "メールアドレスまたはパスワードが間違っています"});
    var password = hashed(data.password, result[0].salt);
    if(password == result[0].hash) {
      req.session.userId = result.insertId;
    }else {
      res.render('fail', {err: "メールアドレスまたはパスワードが間違っています"});
    }
  }
});

router.get('/signout', function(req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
