const Portfolio = require('../models/portfolio');

module.exports = {
    index,
    create,
    showOne
}

function index(req, res, next) {
    Portfolio.find({}, function (err, portfolio) {
        console.log(portfolio)
        res.render("portfolios", {portfolio});
    })
}

function create(req, res) {
    console.log(`calling create function`)
    console.log(req.body.name)
    // change the req.body to fake user ID to reference
    req.body.user = '60711bda8b1b74ac7a158202';
    Portfolio.create(req.body, function(err, addedPortfolio) {
        res.redirect("portfolios")
    })
}

function showOne(req, res) {
    console.log(`calling showOne function ${req.params.id}`)
    Portfolio.findById(req.params.id, function (err, portfolio) {
        res.render("portfolios/show", { portfolio });
    })
}