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

module.exports = historyController;