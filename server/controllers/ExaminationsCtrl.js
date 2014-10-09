var User = require('mongoose').model('User');
var Examination = require('mongoose').model('Examination');

module.exports = {
    create: function(req, res, next) {
        var newExaminationData = req.body;

        Examination.create(newExaminationData, function (err, result) {
            if (err) {
                next(err);
            }
            res.status(200).send(result);
        });
    },
    getById: function(req, res) {
        Examination.findOne({_id: req.params.id}).exec(function(err, result) {
            if (err) {
                return res.status(404).send('Examination could not be loaded: ' + err);
            }

            res.status(200).send(result);
        })
    },
    getAllByUserId: function(req, res) {

        Examination.find({patientId: req.params.userId}).exec(function(err, collection) {
            if (err) {
                return res.status(404).send('Examination could not be loaded: ' + err);
            }


            res.status(200).send(collection);
        })
    }
};
