var User = require('mongoose').model('User');
var Examination = require('mongoose').model('Examination');

module.exports = {
    create: function(req, res, next) {
        var newExaminationData = req.body;

        Examination.create(newExaminationData, function (err, result) {
            if (err) {
                next(err);
            }
            res.send(result, 200);
        });
    },
    getByUserName: function(req, res) {
        User.find({}).exec(function(err, collection) {
            if (err) {
                return res.status(404).send('Examination could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getById: function(req, res) {
        User.find({}).exec(function(err, collection) {
            if (err) {
                return res.status(404).send('Examination could not be loaded: ' + err);
            }

            res.send(collection);
        })
    }
};
