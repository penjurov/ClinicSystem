var medicine = require('mongoose').model('Medicine');

module.exports.createMedicine = function (req, res, next) {
    var newMedicine = req.body;
    medicine.create(newMedicine, function (err, result) {
        if (err) {
            next(err);
        }
        res.send(result, 200);
    });
};

module.exports.getAll = function (req, res, next) {
    medicine.find({}).exec(function (err,result) {
//        res.send(result);
        res.json(result);
    });
};

module.exports.updateMedicine = function (req, res, next) {
    var updatedMedicine = req.body;
    medicine.findById(updatedMedicine._id).exec(function (err,medicine) {
    if (err){
        return;
    }
        medicine.desc = updatedMedicine.desc;
        medicine.sideEffects = updatedMedicine.sideEffects;
        medicine.minAge=updatedMedicine.minAge;

        medicine.save(function () {
//            res.json(medicine);
            res.redirect(201, '/');

        });
    });
};