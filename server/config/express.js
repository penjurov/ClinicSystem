var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    errorHandler = require('errorhandler');

module.exports = function (app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(bodyParser.json());

    app.use(session({secret: '<mysecret>', saveUninitialized: true, resave: true}));
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: function (str, path) {
            return stylus(str).set('filename', path);
        }}));
    app.use(passport.initialize());
    app.use(passport.session());

    // development only
    if ('development' == app.get('env')) {
        console.log(app.get('env'));
        app.use(errorHandler());
    }

    app.use(express.static(config.rootPath + '/public'));
};
