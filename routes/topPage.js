var router = require("express").Router();

var hashed = require("../other/hashed.js");
var createSalt = require("../other/createSalt.js");
var connection = require("../other/connectMysql.js");

router.get("/", function(req, res) {
  if(req.session.userId) {
    res.redirect("/home");
    return;
  }
  res.render("topPage");
});

router.post("/signup", function(req, res) {
  if(req.session.userId) res.render("/", {err: "既にログイン済みです"});
  var data = req.body;
  var salt = createSalt();
  var query = "INSERT INTO `users`(`name`, `mail`, `salt`, `hash`, `gacha`) VALUES(?, ?, ?, ?, ?)";
  connection.query(query, [data.userName, data.email, salt, hashed(data.password, salt), {}],
  function(err, result) {
    if(err) {
      if(err.toString().match(/Duplicate/)) {
        error("既に登録済みです", res);
        return;
      }else {
        console.error(err);
        error("データベースエラー", res);
        return;
      }
    }
    req.session.userId = result.insertId;
    res.redirect("/home");
  }
)
});

router.post("/signin", function(req, res) {
  if(req.session.userId) throw "既にログイン済みです";
  var data = req.body;
  var query = "SELECT `id`, `salt`, `hash` FROM `users` WHERE `mail` = ?"
  connection.query(query, [data.email], function(err, result) {
    if(err) {
      console.error(err);
      error("データベースエラー", res);
      return;
    }
    if(!result[0] || hashed(data.password, result[0].salt) != result[0].hash) {
      error("メールアドレスまたはパスワードが間違っています", res);
      return;
    }
    req.session.userId = result[0].id;
    res.redirect("/home");
  }
);
});

router.get("/signout", function(req, res) {
  req.session.destroy();
  res.redirect("/");
});

function error(massage, res) {
  res.render("topPage", {err: massage});
}

module.exports = router;
