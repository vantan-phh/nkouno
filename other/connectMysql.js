var mysql = require('mysql2');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  database : 'nkou'
});

module.exports = connection;
