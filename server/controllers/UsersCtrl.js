var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');

module.exports = {
    createUser: function(req, res, next) {
        var newUserData = req.body;

        if (newUserData.uin) {
            newUserData.role = "specialist";
        } else {
            newUserData.role = "patient";
        }

        newUserData.username = req.body.username.toLowerCase();
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, function(err, user) {
            if (err) {
                return res.status(404).send('Failed to register new user: ' + err);
            }

            res.status(201).send('Created successful');
        });
    },
    updateUser: function(req, res, next) {
        if (req.user._id == req.body._id || req.user.role == 'specialist') {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            }

            User.update({_id: req.body._id}, updatedUserData, function() {
                res.end();
            })
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
    deleteUser: function(req, res, next) {
        if (req.user._id || req.user.role == 'specialist') {
            User.remove({_id: req.user._id}, function() {
                res.end();
            })
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
    getAllUsers: function(req, res) {
        User.find({}).exec(function(err, collection) {
            if (err) {
                return res.status(404).send('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    }
};
