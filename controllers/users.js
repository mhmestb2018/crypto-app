const Portfolio = require("../models/portfolio");
const User = require("../models/user");

module.exports = {
  new: newPage,
  create,
  login,
};

function newPage(req, res, next) {
  res.render("users/new", { msg: "Enter Username and Password to register:" });
}

async function create(req, res, next) {
  const checker = await User.findOne({ name: req.body.name });
  if (checker) {
    res.render("users/new", { msg: "Username Already Exists!" });
  } else {
    User.create(req.body, function (err, user) {
      if (err) {
        return next(err);
      }
      res.render("users/new", { msg: "New User Added!" });
    });
  }
}

async function login(req, res, next) {
  if (req.body.name) {
    const checker = await User.findOne({
      name: req.body.name,
      password: req.body.password,
    });
    if (checker) {
      res.render("users/login", {
        msg:
          "Hurray! You've technically logged in.. I guess. We can authenticate you, but have no way to persist your session since that hasn't been built out yet. Enjoy the site otherwise! WIP, I promise!",
      });
    } else {
      res.render("users/login", { msg: "Wrong username/password." });
    }
  } else {
    res.render("users/login", {
      msg: "Enter Username and Password to Log In:",
    });
  }
}
