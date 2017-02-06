var mysql = require("mysql2");

var connection = mysql.createConnection({
  host : "localhost",
  user : "root",
  database : "nkou"
});

var date = new Date();

console.log("実行中");

var dere = {
  name: "アイドルマスター シンデレラガールズ スターライトステージ",
  rarity: ["SSR", "SR", "R"],
  data: gacha([1000, 15, 115, 1000])
}


var fate = {
  name: "Fate/Grand Order",
  rarity: ["星5鯖", "星4鯖", "星5礼装", "星4礼装", "星3鯖", "星3礼装"],
  data: gacha([100, 1, 4, 8, 20, 40, 100])
}

var gura = {
  name: "グランブルーファンタジー",
  rarity: ["SSR", "SR", "R"],
  data: gacha([100, 3, 18, 100])
}

var aaa = [dere, fate, gura];

var flag = 0;

for(var i = 0; i < aaa.length; i++) {
  var resultData = aaa[i].data;
  connection.query("UPDATE `gameList` SET `data` = ? WHERE name = ?",
   [JSON.stringify(aaa[i]), aaa[i].name], function(err) {
    if(err) {
      console.error(err);
    }else {
      console.log(flag == 0 ? "終" : flag == 1 ? "了" : "!");
      flag++;
    }
  });
}

function gacha(kaku) {
  var data = {
    total: {},
    year: [],
    month: [],
    week: [],
    day: [],
    hour: []
  };
  var total = [];
  for(var i = 0; i < kaku.length - 1; i++) {
    total[i] = 0;
  }

  var month = date.getMonth();
  for(var i = 0; i < 12; i++) {
    data.year.push({
      try: 20 * 60 * 6 * 24 * 30,
      result: mawasu(20 * 60 * 6 * 24 * 30),
      date: month
    });
  }

  var day = date.getDate();
  for(var i = 0; i < 30; i++) {
    data.month.push({
      try: 20 * 60 * 6 * 24,
      result: mawasu(20 * 60 * 6 * 24),
      date: day
    });
  }

  var you = date.getDay()
  for(var i = 0; i < 7; i++) {
    data.week.push({
      try: 20 * 60 * 6 * 24,
      result: mawasu(20 * 60 * 6 * 24),
      date: you
    });
  }

  var hour = date.getHours();
  for(var i = 0; i < 24; i++) {
    data.day.push({
      try: 20 * 60 * 6,
      result: mawasu(20 * 60 * 6),
      date: hour
    });
  }

  var minute = date.getMinutes();
  for(var i = 0; i < 6; i++) {
    data.hour.push({
      try: 20 * 60,
      result: mawasu(20 * 60),
      date: minute
    });
  }

  function mawasu(kai) {
    var gou = [];
    for(var i = 0; i < kaku.length - 1; i++) {
      gou[i] = 0;
    }

    for(var i = 0; i < kai; i++) {
      var kekka = Math.random() * kaku[0];

      for(var j = 1; j < kaku.length; j++) {
        if(kekka <= kaku[j]) {
          gou[j - 1]++;
          total[j - 1]++;
          break;
        }
      }
    }
    return gou;
  }

  var totalTry = 0;

  for(var i = 0; i < total.length; i++) {
    totalTry += total[i];
  }

  data.total = {try: totalTry, result: total};
  return data;
}
