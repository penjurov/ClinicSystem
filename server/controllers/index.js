var usersController = require('../controllers/UsersCtrl'),
    specialistsController = require('../controllers/SpecialistsCtrl'),
    patientsController = require('../controllers/PatientsCtrl'),
    Medicine = require('../controllers/MedicineCtrl'),
    Procedure = require('../controllers/ProcedureCtrl'),
    examinationsController = require('../controllers/ExaminationsCtrl');

module.exports = {
    users: usersController,
    specialists: specialistsController,
    patients: patientsController,
    MedicineCtrl: Medicine,
    ProcedureCtrl: Procedure,
    examinations: examinationsController
};
