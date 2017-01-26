function createGraph(multiData, state) {
  var graph = document.getElementsByClassName("graph")[0];
  var list = document.getElementsByClassName("list")[0];

  userData = {};
  for(var data in multiData) {
    var newDiv = document.createElement("div");
    newDiv.innerHTML = 
    for(var i = 0; i < 7; i++) {
      multiData.data.week[0].probability;
    }
  }
}

function drawGraph(data) {
  var myChart = new Chart(graph, {
    type: "bar",
    data: {
      labels: labels;
      datasets: [{
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: false;
    }
  });
}
