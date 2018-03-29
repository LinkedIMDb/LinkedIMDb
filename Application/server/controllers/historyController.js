const db = require('../config');
const sqlstring = require('sqlstring');

const historyController = {};

// Retrieve a user's saved search history
historyController.getHistory = (req, res, next) => {
  db.query(
    sqlstring.format(
      'SELECT * FROM history WHERE user_id = ?', [res.locals.user_id]
    ),
    (err, results, fields) => {
      console.log(results);
      if (err) return res.status(500).send(err);
      return res.send(results);
    }
  );
}

// var createUser = 'CREATE TABLE IF NOT EXISTS user (user_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, username VARCHAR(45), email VARCHAR(45), password VARCHAR(100), firstname VARCHAR(20), lastname VARCHAR(45))';

// var createHistory = 'CREATE TABLE IF NOT EXISTS history (path_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, user_id INT(11) NOT NULL, path VARCHAR(600), FOREIGN KEY (user_id) REFERENCES user(user_id))';

// save a user's new connection path
historyController.savePath = (req, res, next) => {
  // console.log(res.locals.user_id);
  // console.log(req.body);
  db.query(
    sqlstring.format(
      'INSERT INTO history (user_id, path) VALUES (?,?)', [res.locals.user_id, JSON.stringify(req.body)]),
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      else {
        const path_id = results.insertId;
        res.locals.path_id = path_id;
        return next();
      }
    }
  );
}

historyController.checkForPath = (req, res, next) => {
  // console.log(res.locals.user_id);
  // console.log(req.body);
  db.query(
    sqlstring.format(
    'SELECT path_id FROM history WHERE path = ? AND user_id = ?', [JSON.stringify(req.body), res.locals.user_id]),
    (err, results, fields) => {
      if (err) return res.status(400).send(err);
      else {
        if (results.length) {return res.status(400).json({error: 'path already in db'})}
        return next();
      }
    }
  );
}

module.exports = historyController;
