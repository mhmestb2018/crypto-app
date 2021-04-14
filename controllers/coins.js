const Coin = require('../models/coin');
const Portfolio = require('../models/portfolio')

module.exports = {
    index,
    show, 
}

async function index(req, res, next) {
    // Portfolio.find({}, function (err, portfolios) {
    //     if (err) {
    //         return next(err)
    //     }

    //     res.render('coins', {
    //         coins: Coin.getAll(),
    //         portfolios: portfolios
    //     });
    // })

    try{
        const coins = await Coin.getAll();

        Portfolio.find({}, function (err, portfolios) {
            if (err) {
                return next(err)
            }

            res.render('coins', {coins, portfolios})
        });
    } catch (err) {
        res.send("Please reload Page. Seems API failed to load and made a boo boo.")
    }


}

async function show (req, res, next) {

    try{
        const coin = await Coin.getOne(req.params.name, req.params.fullname);

        console.log(req.params.name)
        res.render('coins/show', { coin });
 
    } catch (err) {
        res.send(err)
    }
    
}