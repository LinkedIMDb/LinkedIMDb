var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'aadz8ce13521en.cwch5iv9x8ei.us-west-2.rds.amazonaws.com',
  user: 'root',
  password: 'password',
  database: 'auth'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  }
  console.log('connected as id ' + connection.threadId);
  var createUser = 'CREATE TABLE IF NOT EXISTS user (user_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(45), email VARCHAR(45), password VARCHAR(100), firstname VARCHAR(20), lastname VARCHAR(45))';
  var createHistory = 'CREATE TABLE IF NOT EXISTS history (path_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, user_id INT(11) NOT NULL, path VARCHAR(600), FOREIGN KEY (user_id) REFERENCES user(user_id))';

  connection.query(createUser, (err, result) => {
    if (err) throw err;
    console.log('User table ready.');
  });
  connection.query(createHistory, (err, result) => {
    if (err) throw err;
    console.log('History table ready.');
  });
  return;
});

module.exports = connection;
