const express = require('express');
const router = new express.Router();
const historyController = require('../controllers/historyController');

router.get('/getHistory',
  historyController.getHistory
);


router.post('/savePath',
  historyController.checkForPath,
  historyController.savePath,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

router.delete('/removeItem',
  historyController.removeItem,
  historyController.getHistory
);

module.exports = router;
