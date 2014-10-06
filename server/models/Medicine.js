var mongoose = require('mongoose');

var medicineSchema = mongoose.Schema({
    name: { type: String, require: '{PATH} is required', unique: true },
    desc: { type: String, require: '{PATH} is required' },
    sideEffects: String,
    minAge: Number
});

var Medicine = mongoose.model('Medicine', medicineSchema);

module.exports.seedInitialMedicines = function () {
    Medicine.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find medicines: ' + err);
            return;
        }

        if (collection.length === 0) {

            Medicine.create({
                name: 'Viagra',
                desc: 'Be a man, again!',
                sideEffects: 'High blood pressure',
                minAge: 18
            });

            Medicine.create({
                name: 'Aspirin',
                desc: 'You can not get sick with this magic pil',
                sideEffects: 'None',
                minAge: 18
            });

            Medicine.create({
                name: 'Unicorn milk',
                desc: 'Heals everything in 69 seconds',
                sideEffects: 'Remaining life erected/expected: 70 seconds',
                minAge: 18
            });

            console.log("Medicines funny data seeded!");
        }
    });
};

module.exports.findByName = function (name) {
    Medicine.findOne({name: name}).exec(function (err, medicine) {
        if (err) {
            console.log('Cannot find medicines: ' + err);
            return;
        }

        return medicine;

    });
};

module.exports.getAll = function () {
    Medicine.find().exec(function (err, collection) {
        if (err) {
            console.log('Cannot find medicines: ' + err);
            return;
        }

        return collection;

    });
};