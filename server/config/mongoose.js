var mongoose = require('mongoose'),
    user = require('../models/User'),
    medicine = require('../models/Medicine'),
    examination = require('../models/Examination');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

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
    examination.seedInitialExaminations();
};

