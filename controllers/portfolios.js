const Portfolio = require('../models/portfolio');
const Coin = require('../models/coin')

module.exports = {
    index,
    create,
    showOne,
    delete: deleteOne,
    addCoin,
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

function deleteOne(req, res, next) {
    console.log(`calling deleteOne function ${req.params.id}`)
    Portfolio.findByIdAndDelete(req.params.id, function(err, portoflios) {
        res.redirect('/portfolios');    
    });
}

async function addCoin(req, res, next) {
    
    try{
        const coin = await Coin.getOne(req.params.name, req.params.fullname);
             Portfolio.findById(req.params.id, function (err, portfolio) {
                if (err) {
                    return next(err)
                }
                 console.log(`current portfolio: ${portfolio.name}`)
                
                 res.render(`portfolios/add`, {portfolio, coin})
             })

     
        } catch (err) {
            res.send(err)
        }
}

