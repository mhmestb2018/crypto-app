const Portfolio = require("../models/portfolio");
const Coin = require("../models/coin");
const { render } = require("../server");
const User = require("../models/user");

module.exports = {
  index,
  create,
  showOne,
  delete: deleteOne,
  addCoin,
  updateCoin,
  updateName,
  updateAmount,
};

async function index(req, res, next) {
  Portfolio.find({}, async function (err, portfolios) {
    if (err) {
      return next(err);
    } else if (!portfolios.length) {
      res.render("portfolios", { portfolios });
    }
    const portfolioObject = {};
    portfolios.forEach((portfolio, idx) => {
      let coinsArray = [];
      portfolio.coins.forEach((coin) => {
        coinsArray.push(coin.name);
      });
      portfolioObject[idx] = coinsArray;
    });
    const total = await Coin.getTotal(portfolioObject);
    res.render("portfolios", { portfolios, total });
  });
}

function create(req, res) {
  // TODO: findOne due to only having one user in data. Fix if time permits.
  User.findOne({}, function (err, user) {
    if (err) {
      return next(err);
    }
    req.body.user = user._id;
    Portfolio.create(req.body, function (err, addedPortfolio) {
      if (err) {
        return next(err);
      }
      res.redirect("portfolios");
    });
  });
}

async function showOne(req, res) {
  try {
    let tickerList = [];
    Portfolio.findById(req.params.id, async function (err, portfolio) {
      if (err) {
        return next(err);
      }
      portfolio.coins.forEach((coin) => tickerList.push(coin.name));
      const coins = await Coin.getMultiple(tickerList);
      res.render("portfolios/show", { portfolio, coins });
    });
  } catch (err) {
    res.send(err);
  }
}

function deleteOne(req, res, next) {
  Portfolio.findByIdAndDelete(req.params.id, function (err, portoflios) {
    if (err) {
      return next(err);
    }
    res.redirect("/portfolios");
  });
}

async function addCoin(req, res, next) {
  try {
    const coin = await Coin.getOne(req.params.name, req.params.fullname);
    Portfolio.findById(req.params.id, function (err, portfolio) {
      if (err) {
        return next(err);
      }

      res.render(`portfolios/add`, { portfolio, coin });
    });
  } catch (err) {
    res.send(err);
  }
}

async function updateCoin(req, res, next) {
  try {
    let tickerList = [];
    Portfolio.findById(req.params.id, async function (err, portfolio) {
      if (err) {
        return next(err);
      }
      portfolio.coins.push(req.body);
      portfolio.save();
      portfolio.coins.forEach((coin) => tickerList.push(coin.name));
      const coins = await Coin.getMultiple(tickerList);

      res.render("portfolios/show", { portfolio, coins });
    });
  } catch (err) {
    res.send(err);
  }
}

function updateName(req, res, next) {
  Portfolio.findById(req.params.id, function (err, portfolio) {
    portfolio.name = req.body.name;

    portfolio.save(function (err) {
      if (err) {
        res.send(err);
      }
      return res.redirect(`${req.params.id}`);
    });
  });
}

function updateAmount(req, res, next) {
  Portfolio.findById(req.params.id, function (err, portfolio) {
    portfolio.coins.set(req.params.idx, {
      fullName: req.body.fullName,
      name: req.body.name,
      amount: req.body.amount,
    });
    portfolio.save(function (err) {
      if (err) {
        res.send(err);
      }
      return res.redirect(`/portfolios/${req.params.id}`);
    });
  });
}
