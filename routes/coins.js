var express = require('express');
var router = express.Router();
const coinsCtrl = require('../controllers/coins');

/* GET home page. */
router.get('/', coinsCtrl.index);
router.get('/:id', coinsCtrl.show);


module.exports = router;