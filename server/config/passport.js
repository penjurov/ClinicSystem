var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username.toLowerCase()}, function(err, user) {
            if (err) {
                return res.status(404).send('Error loading user: ' + err);
            }

            if (user && user.authenticate(password)) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    }));

    passport.serializeUser(function(user, done) {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({_id: id}).exec(function(err, user) {
            if (err) {
                return res.status(404).send('Error loading user: ' + err);
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    })
};