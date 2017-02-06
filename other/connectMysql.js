var mysql = require("mysql2");

var connection = mysql.createConnection({
  host : process.env.MYSQL_NKOU_HOST,
  user : process.env.MYSQL_NKOU_USER,
  password : process.env.MYSQL_NKOU_PASSWORD,
  database : process.env.MYSQL_DATABACE
});

module.exports = connection;
