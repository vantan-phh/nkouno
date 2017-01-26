var router = require("express").Router();

var connection = require("../other/connectMysql.js");
var app = require("../app.js");

var io;

router.get("/", function(req, res) {
  if(!io) {
    io = require("../bin/www");
    startSocket();
  }
  res.render("home", {login: true});
});

router.post("/", function(req, res) {
  if(req.body.gameName) {
    connection.query("SELECT `gacha` FROM `users` WHERE `id` = ?",
    [req.session.userId], function(err, result) {
      if(err) {
        console.error(err);
        res.redirect("home", {error: "データベースエラー", login: true});
        return;
      }
      var userData, provisionalData = result[0];

      if(result[0][req.body.gameName]) {
        res.render("home", {error: "既に存在しています", login: true, data: userData});
        return;
      }

      userData[req.body.gameName] = {};

      connection.query("UPDATE `users` FROM `gacha` = ?"
      [userData], function(err, result) {
        if(err) {
          console.error(err);
          res.redirect("home", {error: "データベースエラー", login: true, data: provisionalData});
          return;
        }
        res.render("home", {login: true, data: userData});
      });
    });
  }
});

function startSocket() {
  io.sockets.on('connection', function(socket) {
    socket.on('error',function(err) {
      console.error(err)
    });
  });
}

function update() {
  io.sockets.emit("update", {value: "b"});
}

setInterval(update, 10000);

module.exports = router;
