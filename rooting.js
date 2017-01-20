var app = require('express')();
var session = require('express-session');

var routes = require('./routes');

app.use('/', routes.topPage);

module.exports = app;
