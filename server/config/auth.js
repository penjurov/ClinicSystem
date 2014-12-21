var passport = require('passport');

module.exports = {
    login: function login(req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                res.send({success: false});
            }

            req.logIn(user, function (err) {
                if (err) return next(err);
                res.send({success: true, user: user});
            });
        });

        auth(req, res, next);
    },
    logout: function logout(req, res, next) {
        req.logout();
        res.end();
    },
    isAuthenticated: function isAuthenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403);
            res.end();
        }
        else {
            next();
        }
    },
    isInRole: function isInRole(role) {
        return function (req, res, next) {
            if (req.isAuthenticated() && req.user.role === role) {
                next();
            }
            else {
                res.status(403);
                res.end();
            }
        };
    }
};