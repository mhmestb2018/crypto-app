var express = require('express');
var router = express.Router();
const portfoliosCtrl = require('../controllers/portfolios');

/* GET home page. */
router.get('/', portfoliosCtrl.index);
// router.post('/:id', portfoliosCtrl.create);
router.post('/', portfoliosCtrl.create);
router.delete('/:id', portfoliosCtrl.delete);
router.get('/:id', portfoliosCtrl.showOne);
router.get('/:id/add/:coinId', portfoliosCtrl.addCoin)

module.exports = router;