window.onload = function() {

  var modalWindow = document.getElementsByClassName("modalWindow")[0];
  var modalBackground = document.getElementsByClassName("modalBackground")[0];

  var signUp = document.getElementById("up");
  var signIn = document.getElementById("in");

  var title = document.getElementsByClassName("title")[0];
  var content = document.getElementsByClassName("content")[0];

  var close = document.getElementsByClassName("close");
  var form = document.getElementsByClassName("form")[0];

  var clickFlag = false;

  signUp.onclick = function() {
    title.innerText = "新規登録";
    form.innerText = "登録";
    content.innerHTML = "<div class='description'><p class='information'>ユーザー名</p><p class='information'>メールアドレス</p><p class='information'>パスワード</p><p class='information'>パスワード再入力</p></div><div class='inputs'><input type='text' class='input'><input type='text' class='input'><input type='text' class='input'><input type='text' class='input'></div>";
    modalWindow.style.height = "380px";
    formOpen();
  }
  signIn.onclick = function() {
    title.innerText = "ログイン";
    form.innerText = "ログイン";
    content.innerHTML = "<div class='description'><p class='information'>メールアドレス</p><p class='information'>パスワード</p></div><div class='inputs'><input type='text' class='input'><input type='text' class='input'></div>"
    modalWindow.style.height = "290px";
    formOpen();
  }

  function formOpen() {
    if(!clickFlag) {
      clickFlag = true;
      modalBackground.style.display = "inline";
      var opacity = 0.2;
      var backOpacity = 0.0;
      var backComplete = false;
      var darken = setInterval(function() {
        if(!backComplete) {
          backOpacity += 0.02;
          modalBackground.style.opacity = backOpacity;
          if(backOpacity >= 0.4) {
            backComplete = true;
            modalWindow.style.display = "inline";
          }
        }else {
          opacity += 0.02;
          modalWindow.style.opacity = opacity;
          if(opacity >= 1) {
            clearInterval(darken);
          }
        }
      }, 1)
    }
  }

  modalBackground.onclick = close[0].onclick = close[1].onclick = formClose;
  function formClose() {
    var opacity = 1;
    var backOpacity = 0.4;
    var backComplete = true;
    var heighten = setInterval(function() {
      if(!backComplete) {
        backOpacity -= 0.02;
        modalBackground.style.opacity = backOpacity;
        if(backOpacity <= 0) {
          modalBackground.style.display = "none";
          clearInterval(heighten);
        }
      }else {
        opacity -= 0.02;
        modalWindow.style.opacity = opacity;
        if(opacity <= 0.2) {
          backComplete = false;
          modalWindow.style.display = "none";
          clickFlag = false;
        }
      }
    }, 1)
  }
}
