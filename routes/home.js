var router = require("express").Router();

var connection = require("../other/connectMysql.js");
var app = require("../app.js");

var io;
var data;

router.get("/", function(req, res) {
  if(!io) {
    io = require("../bin/www");
    startSocket();
  }
  res.render("home", {login: true, data: {"アイドルマスターシンデレラガールズ": true}});
});



function startSocket() {
  io.sockets.on("connection", function(socket) {
    socket.emit("firstData", {data: data});
    socket.on("error",function(err) {
      console.error(err)
    });
  });
}

function update() {
  io.sockets.emit("update", {value: "b"});
}

setInterval(update, 10000);

module.exports = router;
