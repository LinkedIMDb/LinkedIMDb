const express = require('express');
const router = new express.Router();
const historyController = require('../controllers/historyController');

router.get('/getHistory', historyController.getHistory);



module.exports = router;