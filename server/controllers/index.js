var usersController = require('../controllers/UsersCtrl');
var Medicine = require ('../controllers/MedicineCtrl');
var examinationsController = require('../controllers/ExaminationsCtrl');

module.exports = {
    users: usersController,
    MedicineCtrl: Medicine,
    examinations: examinationsController
};
