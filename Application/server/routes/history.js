const express = require('express');
const router = new express.Router();
const historyController = require('../controllers/historyController');

router.get('/getHistory', );


router.post('/savePath',
  historyController.savePath,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

module.exports = router;
