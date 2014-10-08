var procedure = require('mongoose').model('Procedure');

module.exports.createProcedure = function (req, res, next) {
    'use strict';
    var newProcedure = req.body;
    procedure.create(newProcedure, function (err, result) {
        if (err) {
            next(err);
        }

        res.send(result, 200);
    });
};

module.exports.getAll = function (req, res, next) {
    'use strict';
    console.log('here');
    procedure.find({}).exec(function (err, result) {
        res.json(result);
    });
};

module.exports.updateProcedure = function (req, res, next) {
    'use strict';

    var updateProcedure = req.body;
    procedure.findById(updateProcedure._id).exec(function (err, procedure) {
        if (err) {
            return;
        }
        procedure.desc = updateProcedure.desc;
        procedure.recovery = updateProcedure.recovery;
        procedure.save(function () {
            res.redirect(201, '/');
        });
    });
};