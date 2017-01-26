window.onload = function() {
  var socket = io.connect();
  socket.on("update", function(data) {
    console.log(data);
  });
}
