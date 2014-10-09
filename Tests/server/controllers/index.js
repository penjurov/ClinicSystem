var usersController = require('../controllers/UsersCtrl'),
    specialistsController = require('../controllers/SpecialistsCtrl'),
    Medicine = require('../controllers/MedicineCtrl'),
    Procedure = require('../controllers/ProcedureCtrl'),
    examinationsController = require('../controllers/ExaminationsCtrl');

module.exports = {
    users: usersController,
    specialists: specialistsController,
    MedicineCtrl: Medicine,
    ProcedureCtrl: Procedure,
    examinations: examinationsController
};
