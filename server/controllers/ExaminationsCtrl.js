var User = require('mongoose').model('User');
var Procedure = require('mongoose').model('Procedure');
var Medicine = require('mongoose').model('Medicine');
var Examination = require('mongoose').model('Examination');

module.exports = {
    create: function(req, res, next) {
        var specialist,
            patient,
            medicine,
            procedure;

        User.find({_id: req.body.specialistId}).exec(function (err, result) {
            if (err) {
                return res.status(404).send('Cannot find the specialist: ' + err);
            }
            specialist = result[0];

            User.find({_id: req.body.patientId}).exec(function (err, result) {
                if (err) {
                    return res.status(404).send('Cannot find the patient: ' + err);
                }
                patient = result[0];

                Procedure.find({_id: req.body.Procedure}).exec(function (err, result) {
                    if (err) {
                        return res.status(404).send('Cannot find the procedure: ' + err);
                    }
                    procedure = result[0];

                    Medicine.find({_id: req.body.Medicine}).exec(function (err, result) {
                        if (err) {
                            return res.status(404).send('Cannot find the medicine: ' + err);
                        }
                        medicine = result[0];



                        var newExaminationData = {
                            Patient : patient,
                            Specialist: specialist,
                            Medicine: medicine,
                            Procedure: procedure,
                            Information: req.body.Information,
                            Result: req.body.Result
                        };

                        console.log(newExaminationData);

                        Examination.create(newExaminationData, function (err, result) {
                            if (err) {
                                next(err);
                            }
                            res.status(200).send(result);
                        });
                    });
                });
            });
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
        Examination.find({Patient: req.params.userId})
            .populate('Specialist', 'firstName lastName')
            .populate('Patient', 'firstName lastName')
            .populate('Medicine', 'name')
            .populate('Procedure', 'name')
            .exec(function(err, collection) {
            if (err) {
                return res.status(404).send('Examination could not be loaded: ' + err);
            }

            res.status(200).send(collection);
        })
    }
};
