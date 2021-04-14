const Portfolio = require('../models/portfolio');
const Coin = require('../models/coin');
const { render } = require('../server');
const User = require('../models/user');

module.exports = {
    index,
    create,
    showOne,
    delete: deleteOne,
    addCoin,
    updateCoin,
    updateName
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
    // TODO: findOne due to only having one user in data. Fix if time permits.
    User.findOne({}, function (err, user) {
        if (err) {
            return next;
        }
        req.body.user = user._id;
        Portfolio.create(req.body, function(err, addedPortfolio) {
            res.redirect("portfolios")
        })
        
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


function updateCoin(req, res, next) {
    console.log(req.body)
    Portfolio.findById(req.params.id, function (err, portfolio) {
        if (err) {
            return next(err)
        }
        portfolio.coins.push(req.body);
        portfolio.save()

        console.log(`THIS IS WHAT PORTFOLIO LOOKS LIKE: ${portfolio}`)
        res.render("portfolios/show", { portfolio });
    })

}

function updateName(req, res, next) {
    Portfolio.findOneAndUpdate(req.params.id, req.body, function(err, portfolio) {
        if (err) return res.status(500).send(err);
        return res.redirect(`${req.params.id}`);
    })
}