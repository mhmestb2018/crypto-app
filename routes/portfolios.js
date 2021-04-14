var express = require('express');
var router = express.Router();
const portfoliosCtrl = require('../controllers/portfolios');

/* GET home page. */
router.get('/', portfoliosCtrl.index);
// router.post('/:id', portfoliosCtrl.create);
router.post('/', portfoliosCtrl.create);
router.delete('/:id', portfoliosCtrl.delete);
router.get('/:id', portfoliosCtrl.showOne);
router.get('/:id/add/:name-:fullname', portfoliosCtrl.addCoin)
router.post('/:id', portfoliosCtrl.updateCoin)
router.put('/:id', portfoliosCtrl.updateName);

module.exports = router;