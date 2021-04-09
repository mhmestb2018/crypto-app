const Coin = require('../models/coin');

module.exports = {
    index,
    show, 
}

function index(req, res, next) {
    res.render('coins', {
        coins: Coin.getAll(),
    });
}

function show (req, res, next) {
    res.render('coins/show', {
        coin: Coin.getOne(req.params.id),
        // coinsNum: parseInt(req.params.id) + 1
    });
}