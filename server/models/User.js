var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    specialty: String,
    uin: String,
    email: String,
    phone: String,
    age: String,
    gender: String,
    medicalHistory: String,
    patientNumber: String,
    salt: String,
    hashPass: String,
    role: String
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        } else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({username: 'specialist', firstName: 'Ivan', lastName: 'Ivanov', salt: salt, hashPass: hashedPwd, role: 'specialist'});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({username: 'patient', firstName: 'Pesho', lastName: 'Peshov', salt: salt, hashPass: hashedPwd, role: 'patient'});
            console.log("Starting users created");
        }
    });
};
