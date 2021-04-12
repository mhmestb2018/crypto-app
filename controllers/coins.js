const Coin = require('../models/coin');
const Portfolio = require('../models/portfolio')

module.exports = {
    index,
    show, 
}

function index(req, res, next) {
    Portfolio.find({}, function (err, portfolios) {
        if (err) {
            return next(err)
        }

        res.render('coins', {
            coins: Coin.getAll(),
            portfolios: portfolios
        });
    })
}

function show (req, res, next) {
    res.render('coins/show', {
        coin: Coin.getOne(req.params.id),
        // coinsNum: parseInt(req.params.id) + 1
    });
}