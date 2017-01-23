var router = require("express").Router();

var connection = require("../other/connectMysql.js");

router.get("/", function(req, res) {
  if(!req.session.userId) res.redirect("/");
  res.render("home", {login: true});
});

module.exports = router;
