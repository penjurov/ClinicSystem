var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development',
    port = process.env.PORT || 9999;

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile : function(str, path) {
            return stylus(str).set('filename', path);
        }
    }
));
app.use(express.static(__dirname + '/public'));

if(env == 'development') {
    mongoose.connect('mongodb://localhost/ClinicSystemDb');
} else {
    mongoose.connect('mongodb://admin:telerikacademy2014@ds033170.mongolab.com:33170/clinicsystem');
}

var db = mongoose.connection;

db.once('open', function(err) {
    if(err) {
        console.log('Database could not be oppened: ' + err);
        return;
    }

    console.log('Database up and running');
});

db.on('error', function(err) {
    console.log('Database error: ' + err);
});

var messageSchema = mongoose.Schema({
    message : String
});

var Message = mongoose.model('Message', messageSchema);

Message.remove({}).exec(function(err) {
    if(err) {
        console.log('Messages could not be deleted: ' + err);
        return;
    }

    console.log('Messages deleted');

    Message.create({message : 'Hi'})
        .then(function(model) {
            console.log(model.message)
        });
});

app.get('/partials/:partialName', function(req, res) {
    res.render('partials/' + req.params.partialName)
});

app.get('*', function(req, res) {
    res.render('index');
});

app.listen(port);
console.log("Server running on port " + port);



