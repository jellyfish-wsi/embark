var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'mina',
  password: 'killmepls',
  database: 'db'
});

connection.connect(function(err) {
  if (err) {
    console.log('Error');
  } else {
    console.log('Connected to database.');
  }
});

module.exports = {
  connection
}
