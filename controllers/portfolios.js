const Portfolio = require('../models/portfolio');

module.exports = {
    index,

}

function index(req, res, next) {
    res.render('portfolios')
}
