listAdd = function(name) {
  var list = document.getElementsByClassName("list")[0];
  var newDiv = document.createElement("div");
  newDiv.innerHTML = `<h4>${name}</h4>`;
  newDiv.className = "game";
  list.insertBefore(newDiv, list.lastChild);
}
