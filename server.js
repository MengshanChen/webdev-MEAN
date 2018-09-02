var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer'); 
var passport      = require('passport');
//store info to remember you have logged in
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

mongoose.Promise = global.Promise;

var mongoDB = mongoose.connect('mongodb://localhost/itemsdb', {
    useMongoClient: true
});

mongoDB
    .then(function (db) {
        console.log('mongodb has been connected');
    })
    .catch(function (err) {
        console.log('error while trying to connect with mongodb');
    });

module.exports = mongoDB;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
multer();
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

require("./app/app.js")(app);

app.listen(3000);