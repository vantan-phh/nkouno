var string = "qwertyuiopasdfghjklzxcvbnm1234567890";

function createSalt() {
  var salt = "";
  for(var i = 0; i < 20; i++) {
    salt += string[Math.floor(Math.random() * 36)];
  }
  return salt;
}

module.exports = createSalt;
