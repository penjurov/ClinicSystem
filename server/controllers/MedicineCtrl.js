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