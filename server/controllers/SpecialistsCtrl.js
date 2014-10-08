var User = require('mongoose').model('User');

module.exports = {
    getAllSpecialists: function (req, res) {
        User.find({role: 'specialist'}).exec(function (err, collection) {
            if (err) {
                return res.status(404).send('Specialists could not be loaded: ' + err);
            }

            res.send(collection);
        });
    }
};
