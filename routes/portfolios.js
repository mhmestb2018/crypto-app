var express = require('express');
var router = express.Router();
const portfoliosCtrl = require('../controllers/portfolios');

/* GET home page. */
router.get('/', portfoliosCtrl.index);
// router.post('/:id', portfoliosCtrl.create);



module.exports = router;