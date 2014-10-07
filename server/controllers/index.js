var usersController = require('../controllers/UsersCtrl'),
    Medicine = require('../controllers/MedicineCtrl'),
    Procedure = require('../controllers/ProcedureCtrl'),
    examinationsController = require('../controllers/ExaminationsCtrl');

module.exports = {
    users: usersController,
    MedicineCtrl: Medicine,
    ProcedureCtrl: Procedure,
    examinations: examinationsController
};
