var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'db'
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database.');
  }
});

connection.end(function(err) {
  if (err) {
    return console.log('Error closing database:' + err.message);
  }
  console.log('Closed the database.');
});

module.exports = {
  connection
}
