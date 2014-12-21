var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    userSchema = mongoose.Schema({
        username: {
            type: String,
            require: '{PATH} is required',
            unique: true
        },
        firstName: {
            type: String,
            require: '{PATH} is required'
        },
        lastName: {
            type: String,
            require: '{PATH} is required'
        },
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
    }),
    User = mongoose.model('User', userSchema);

userSchema.method({
    authenticate: function authenticate(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        } else {
            return false;
        }
    }
});

module.exports.seedInitialUsers = function seedInitialUsers() {
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
            User.create({username: 'iivanov', firstName: 'Ivan', lastName: 'Ivanov', specialty: 'Ophthalmology', uin: '1111111111', email: 'ivanivanov@hopeclinic.com', phone: '02/1111111', salt: salt, hashPass: hashedPwd, role: 'specialist'});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({username: 'ggeorgiev', firstName: 'Georgi', lastName: 'Georgiev', specialty: 'Cardiology', uin: '2222222222', email: 'georgigeorgiev@hopeclinic.com', phone: '02/2222222', salt: salt, hashPass: hashedPwd, role: 'specialist'});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({username: 'mmartinov', firstName: 'Martin', lastName: 'Martinov', specialty: 'Endocrinology', uin: '3333333333', email: 'martinmartinov@hopeclinic.com', phone: '02/3333333', salt: salt, hashPass: hashedPwd, role: 'specialist'});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({username: 'peshopeshov', firstName: 'Pesho', lastName: 'Peshov', age: '31', gender: 'male', medicalHistory: 'Nothing special', patientNumber: '111111', email: 'peshppeshov@abv.bg', phone: '0888/888888', salt: salt, hashPass: hashedPwd, role: 'patient'});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({username: 'goshogoshov', firstName: 'Gosho', lastName: 'Goshov', age: '26', gender: 'male', medicalHistory: 'Very ill', patientNumber: '222222', email: 'gosho@abv.bg', phone: '0888/999999', salt: salt, hashPass: hashedPwd, role: 'patient'});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');
            User.create({username: 'penkapenkova', firstName: 'Penka', lastName: 'Penkova', age: '19', gender: 'female', medicalHistory: 'Oh my god', patientNumber: '333333', email: 'penka@gmail.com', phone: '0888/777777', salt: salt, hashPass: hashedPwd, role: 'patient'});

            console.log("Starting users created");
        }
    });
};
