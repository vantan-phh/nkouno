var app = require("express")();
var session = require("express-session");
var sessionCheck = require("./other/sessionCheck.js");

var routes = require("./routes");

app.use("/", routes.topPage);
app.use("/home", sessionCheck, routes.home);

module.exports = app;
