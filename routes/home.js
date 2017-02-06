var router = require("express").Router();

var connection = require("../other/connectMysql.js");


var io;
var data = {};


var query = "SELECT `name`, `data` FROM `gameList`";

connection.query(query, function(err, result) {
  result.forEach(function(val) {
    val.data =  JSON.parse(val.data);
    data[val.name] = val;
  });
})

router.get("/", function(req, res) {
  if(!io) {
    io = require("../bin/www");
    startSocket();
  }
  res.render("home", {login: true, data: data});
});



function startSocket() {
  io.sockets.on("connection", function(socket) {
    var cookie = socket.request.headers.cookie.split(".")[1].split("=")[1].split("s%3A")[1];
    query = "SELECT `data` FROM `sessions` WHERE `session_id` = ? LIMIT 1";

    var emitData;

    connection.query(query, [cookie], function(err, result) {
      if(err) {
        console.error(err);
      }
      result = JSON.parse(result[0].data);
      socket.userId = result.userId;

      query = "SELECT `gacha` FROM `users` WHERE `id` = ? LIMIT 1";

      connection.query(query, [result.userId], function(err, result) {
        if(err) {
          console.error(err);
        }

        var emitData = {
          userData: result[0].gacha,
          allData: data
        };

        socket.userData = result[0].gacha;

        socket.emit("firstData", emitData);
      });
    });


    socket.on("update", function(data) {
      console.log(data);
    });

    socket.on("error", function(err) {
      console.error(err)
    });
  });
}

function update() {
  io.sockets.emit("update", data);
}

// setInterval(update, 10000);

module.exports = router;
