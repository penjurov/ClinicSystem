var crypto = require('crypto');

module.exports = {
    generateSalt: function () {
        return crypto.randomBytes(128).toString('base64');
    },
    generateHashedPassword: function (salt, pwd) {
        console.log(pwd);
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }
};
