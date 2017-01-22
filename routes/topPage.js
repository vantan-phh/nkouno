var router = require('express').Router();
var uuid = require('node-uuid');

var hashed = require('../other/hashed.js');
var createSalt = require('../other/createSalt.js');
var connection = require('../other/connectMysql.js');

router.get('/', function(req, res) {
  console.log(req.session);
  res.render('topPage');
});

router.post('/signup', function(req, res) {
  if(req.session.userId) res.render('/', {err: "既にログイン済みです"});
  var data = req.body;
  var salt = createSalt();
  connection.query(
    "INSERT INTO `users`(`name`, `mail`, `salt`, `hash`) VALUES(?, ?, ?, ?)",
    [data.userName, data.email, salt, hashed(data.password, salt)],
    function(err, result) {
      if(err) {
        var massage = "データベースエラー";
        if(err.match(/Duplicate/)) massage = "既に登録済みです";
        res.render('/', {err: massage});
      }
      req.session.userId = result.insertId;
      res.redirect("/");
    }
  )
});

router.post('/signin', function(req, res) {
  try {
    if(req.session.userId) throw "既にログイン済みです";
    var data = req.body;
    connection.query(
      "SELECT `id`, `salt`, `hash` FROM `users` WHERE `mail` = ?",
      [data.email], function(err, result) {
        if(err) throw "データベースエラー";
        if(!result[0] || hashed(data.password, result[0].salt) != result[0].hash) {
          throw "メールアドレスまたはパスワードが間違っています"
        }
        req.session.userId = result[0].id;
      }
    );
  }catch(err) {
    res.render('topPage', {err: err});
  }
});

router.get('/signout', function(req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
