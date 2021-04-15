var express = require('express');
var router = express.Router();
const coinsCtrl = require('../controllers/coins');
const request = require('request');

/* GET home page. */
router.get('/', coinsCtrl.index);
router.get('/:name-:fullname', coinsCtrl.show);


module.exports = router;