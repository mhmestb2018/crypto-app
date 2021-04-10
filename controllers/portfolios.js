const Portfolio = require('../models/portfolio');

module.exports = {
    index,
    create,
    showOne, 
    delete: deleteOne, 
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
    req.body.user = '6070d89d30c6d1e5b02158e9';
    Portfolio.create(req.body, function(err, addedPortfolio) {
        res.redirect("portfolios")
    })
}

function showOne(req, res) {
    console.log(`calling showOne function`)
    Portfolio.findById(req.params.id, function (err, portfolio) {
        res.render("portfolios/show", { portfolio });
    })
}

function deleteOne(req, res, next) {
    console.log(`calling deleteOne function ${req.params.id}`)
    Portfolio.findByIdAndDelete(req.params.id, function(err, portoflios) {
        res.redirect('/portfolios');    
    });
}