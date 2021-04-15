const Portfolio = require('../models/portfolio')
const User = require('../models/user')

module.exports = {
    new: newPage,
    create, 
    login
}

function newPage(req, res, next) {
    res.render('users/new', { msg: 'Enter Username and Password to register:' });
}


async function create(req, res, next) {
    console.log(`calling create function`)
    console.log(req.body.name)
    const checker = await User.findOne({name: req.body.name})
    console.log(checker)
    if (checker) {
        res.render('users/new', { msg: 'Username Already Exists!' });
    } else {
        User.create(req.body, function(err, user) {
            if (err) {
                return next(err)
            }
            res.render('users/new', { msg: 'New User Added!' })
        })
    }
}

async function login(req, res, next) {
    console.log(req.body.name)
    if (req.body.name){
        console.log('true')
        const checker = await User.findOne({name: req.body.name, password: req.body.password});
        if (checker) {
            res.render('users/login', { msg: "Hurray! You've technically logged in.. I guess. We can authenticate you, but have no way to persist your session since that hasn't been built out yet. Enjoy the site otherwise! WIP, I promise!" });
        } else {
            res.render('users/login', { msg: "Wrong username/password." });
        }
    } else {
        console.log('false')
        res.render('users/login', { msg: 'Enter Username and Password to Log In:' });
    }
}