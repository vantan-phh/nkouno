 window.addEventListener("load", function() {
  var socket = io.connect();
  var drowData;

  socket.on("firstData", function(firstData) {
    drowData = firstData;
    for(var data in firstData.userData.original) {
      listAdd(data);
    }
    for(var data in firstData.allData) {
      listAdd(data);
    };

    graphHandler(drowData, socket);
  });

  socket.on("update", function(data) {
    console.log(data);
  });
});
