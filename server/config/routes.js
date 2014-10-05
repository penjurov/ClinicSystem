var auth = require('./auth'),
    controllers = require('../controllers'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {
    app.get('/api/users', auth.isInRole('specialist'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);
    app.delete('/api/users', auth.isAuthenticated, controllers.users.deleteUser);

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/views/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('*', function(req, res) {
        res.render('index');
    });
};