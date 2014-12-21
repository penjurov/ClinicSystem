var medicine = require('mongoose').model('Medicine');

module.exports = {
    createMedicine: function createMedicine(req, res, next) {
        'use strict';

        var newMedicine = req.body;
        medicine.create(newMedicine, function (err, result) {
            if (err) {
                next(err);
            }
            res.send(result, 200);
        });
    },
    getAll: function getAll(req, res, next) {
        'use strict';

        medicine.find({}).exec(function (err, result) {
            res.json(result);
        });
    },
    updateMedicine: function updateMedicine(req, res, next) {
        'use strict';

        var updatedMedicine = req.body;
        medicine.findById(updatedMedicine._id).exec(function (err, medicine) {
            if (err) {
                return;
            }
            medicine.desc = updatedMedicine.desc;
            medicine.sideEffects = updatedMedicine.sideEffects;
            medicine.minAge = updatedMedicine.minAge;

            medicine.save(function () {
                res.redirect(201, '/');
            });
        });
    }
};