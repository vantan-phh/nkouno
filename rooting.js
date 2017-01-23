var app = require("express")();
var session = require("express-session");

var routes = require("./routes");

app.use("/", routes.topPage);
app.use("/home", routes.home);

module.exports = app;
