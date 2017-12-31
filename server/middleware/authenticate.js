const {User} = require('../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user)
            return Promise.reject; // va aller dans le catch

        // res.send(user);
        req.user = user;
        req.token = token;
        next();

    }).catch((err) => {
        res.status(401).send(); // 401 = auth required

    });
};

module.exports = {authenticate};