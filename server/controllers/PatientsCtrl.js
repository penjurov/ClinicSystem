var User = require('mongoose').model('User');

module.exports = {
    getAllPatients: function (req, res) {
        User.find({role: 'patient'}).exec(function (err, collection) {
            if (err) {
                return res.status(404).send('Patients could not be loaded: ' + err);
            }

            res.send(collection);
        });
    }
};
