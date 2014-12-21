var mongoose = require('mongoose'),
    user = require('../models/User'),
    medicine = require('../models/Medicine'),
    procedure = require('../models/Procedure'),
    examination = require('../models/Examination');

module.exports = function exports(config) {
    'use strict';
    
    var db;

    mongoose.connect(config.db);
    db = mongoose.connection;

    db.once('open', function(err) {
        if(err) {
            return res.status(404).send('Database could not be opened: ' + err);
        }

        console.log('Database up and running');
    });

    db.on('error', function(err) {
        return res.status(404).send('Database error: ' + err);
    });

    user.seedInitialUsers();
    medicine.seedInitialMedicines();
    procedure.seedInitialProcedures();
};

