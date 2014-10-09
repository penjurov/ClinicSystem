var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/ClinicSystemDb',
        port: process.env.PORT || 1080
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:telerikacademy2014@ds033170.mongolab.com:33170/clinicsystem',
        port: process.env.PORT || 1080
    },
    rootPath : rootPath
};
