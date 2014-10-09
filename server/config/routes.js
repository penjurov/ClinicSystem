var auth = require('./auth'),
    controllers = require('../controllers'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {
    'use strict';

    // account
    app.get('/api/users', auth.isInRole('specialist'), controllers.users.getAllUsers);
    app.get('/api/users/:id', controllers.users.getUserByUsername);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);
    app.delete('/api/users', auth.isAuthenticated, controllers.users.deleteUser);

    // specialists
    app.get('/api/specialists', controllers.specialists.getAllSpecialists);

    // patients
    app.get('/api/patients', auth.isInRole('specialist'), controllers.patients.getAllPatients);

    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../public/app/views/' + req.params.partialArea + '/' + req.params.partialName);
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    // medicine
    app.post('/api/medicine', auth.isInRole('specialist'), controllers.MedicineCtrl.createMedicine);
    app.get('/api/medicine', auth.isInRole('specialist'), controllers.MedicineCtrl.getAll);
    app.put('/api/medicine', auth.isInRole('specialist'), controllers.MedicineCtrl.updateMedicine);

    // procedure
    app.post('/api/procedure', auth.isInRole('specialist'), controllers.ProcedureCtrl.createProcedure);
    app.get('/api/procedure', controllers.ProcedureCtrl.getAll);
    app.put('/api/procedure', auth.isInRole('specialist'), controllers.ProcedureCtrl.updateProcedure);

    //examination
    app.post('/api/examination', controllers.examinations.create);
    app.get('/api/examination/:id', controllers.examinations.getAllByUserId);

    // default
    app.get('*', function (req, res) {
        res.render('index');
    });
};
