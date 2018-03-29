const express = require('express');
const router = new express.Router();
const historyController = require('../controllers/historyController');

router.get('/getHistory', );


router.post('/save',
  (req, res) => {
    res.status(200).json({});
  }
);

module.exports = router;
