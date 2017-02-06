var mysql = require("mysql2");

var connection = mysql.createPool({
  host : process.env.MYSQL_NKOU_HOST,
  user : process.env.MYSQL_NKOU_USER,
  password : process.env.MYSQL_NKOU_PASSWORD,
  database : process.env.MYSQL_NKOU_DATABACE
});

connection.connect();


module.exports = connection;
