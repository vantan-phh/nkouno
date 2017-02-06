 window.addEventListener("load", function() {
   
  var gameInsert = document.getElementsByClassName("insert")[0];
  var gameDelete = document.getElementsByClassName("delete")[0];

  var modalWindow = document.getElementsByClassName("modalWindow")[0];

  gameInsert.onclick = function() {

    modalWindow.style.height = "230px";
    modalWindow.innerHTML = "<div class='head'><h4 class='title'></h4><button class='closeButton close'>✕</button></div><form method='post' class='form'><div class='content'></div><div class='foot'><button type='button' class='CompleteButton close'>閉じる</button><button type='submit' class='CompleteButton submit'></button></div></form>";

    document.getElementsByClassName("title")[0].innerText = "ゲーム名入力";
    document.getElementsByClassName("content")[0].innerHTML = "<div class='description'><input type='text' class='input' name='gameName' required></div>"
    document.getElementsByClassName("input")[0].style.width = "350px";
    document.getElementsByClassName("submit")[0].innerText = "追加";

    var close = document.getElementsByClassName("close");
    close[0].onclick = close[1].onclick = formClose;

    formOpen();
  }
});
