/** Requires mysql of `mysql` library.
* @requires mysql
*/
var mysql = require('mysql');
/** This creates a connection to the mySQL database.
* @var {array} connection
*/
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'db'
});

/** @throws Will output an error to the console if it cannot connect. Otherwise,
* outputs a message to show connection to database.
*/
connection.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database.');
  }
});

/** @throws Will output an error to the console if it cannot close the database.
* Otherwise, outputs a message to show the database has closed. 
*/
connection.end(function(err) {
  if (err) {
    return console.log('Error closing database:' + err.message);
  }
  console.log('Closed the database.');
});

module.exports = {
  connection
}
