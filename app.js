var express = require("express");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

var rooting = require("./rooting");

var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "jade");

var sessionStore = new MySQLStore({
  host: "localhost",
	port: 3306,
	user: "root",
	database: "nkou"
});

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  }
}));

//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(rooting);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

app.listen(3000);
