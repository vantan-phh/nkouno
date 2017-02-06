
var viewing;

graphHandler = function(data, socket) {
  var gameList = document.getElementsByClassName("game");
  var emits = document.getElementsByClassName("emits")[0];

  emits.onclick = function() {
    var hit = document.getElementsByClassName("hit");
    var emitData;

    for(var i = 0; i < hit.length; i++) {
      emitData = hit[i].textContent;
    }

    socket.emit("update", {emitData});
  }

  var allData = data.allData;
  var userData = data.userData;

  for(var i = 0; i < gameList.length; i++) {
    gameList[i].onclick = function() {
      createGraph(allData[this.textContent].data);
      viewing = this;
    }
    gameList[0].onclick();
    stateChange();
  }
}

function stateChange() {
  var button = document.getElementsByClassName("option");

  for(var i = 0; i < button.length; i++) {
    button[i].onclick = function() {
      stateDecision(this.value);
      viewing.onclick();
    }
  }
}

var state = "hour";

function stateDecision(period) {
  state = period;
}

var myChart;
var viewState = "line", currentState;

function createGraph(data) {

  var rarity = data.rarity;
  var data = data.data;

  var emit = document.getElementsByClassName("emit")[0];

  emit.textContent = null;

  for(var i = 0; i < rarity.length; i++) {
    var newInput = document.createElement("input");
    newInput.type = "text";
    newInput.className = "hit";
    emit.insertBefore(newInput, emit.lastChild);
  }


  var probability = [], labels = [];

  currentState = "line";

  switch(state) {
    case "year":
      data = data.year;
      for(var i = 12; i > 0; i--) labels.push(i + "ヶ月前");
      break;
    case "month":
      data = data.month;
      for(var i = 30; i > 0; i--) labels.push(i + "日前");
      break;
    case "week":
      data = data.week;
      for(var i = 7; i > 0; i--) labels.push(i + "日前");
      break;
    case "day":
      data = data.day;
      for(var i = 24; i > 0; i--) labels.push(i + "時間前");
      break;
    case "hour":
      data = data.hour;
      for(var i = 6; i > 0; i--) labels.push(i + "0分前");
      break;
    case "total":
      data = data.total;
      currentState = "pie";
  }

  for(var i = 0; i < data.length; i++) {
    probability.push((data[i].result[0] / data[i].try) * 100);
  }

  if(myChart) {
    myChart.destroy();
  }

  var graph = document.getElementsByClassName("graph")[0];

  var chartData;

  if(currentState == "line") {

    chartData = {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "確率",
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHitRadius: 10,
            data: probability
          }
        ],
      },
      option: {
        responsive: false
      }
    }

  }else {

    var color = ["#FF3333", "#3337FF", "#33FF37", "#FFFD33", "#33FFFF", "#FF8132"];
    var highLight = ["#FF7171", "#7B71FF", "#71FF87", "#FEFF71", "#71FFF9", "#FFA871"];

    var result = data.result;
    var pushData = [];

    for(var i = 0; i < result.length; i++) {
      pushData.push((result[i] / data.try) * 100);
    }

    chartData = {
      type: "pie",
      data: {
        labels: rarity,
        datasets: [
          {
            data: pushData,
            backgroundColor: color,
            hoverBackgroundColor: highLight
          }
        ]
      },
      option: {
        responsive: false
      }
    }

  }

  myChart = new Chart(graph, chartData)

  viewState = currentState;
}
