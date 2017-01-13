var app = require('express')();

var routes = require('./routes');

app.use('/', routes.topPage);

module.exports = app;
