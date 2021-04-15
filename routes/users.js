var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users');

router.get('/new', userCtrl.new);
router.post('/new', userCtrl.create);
router.get('/login', userCtrl.login);
router.post('/login', userCtrl.login);


module.exports = router;