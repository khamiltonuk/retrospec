'use strict';

var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({defaultLayout : 'main'});
var fortune = require('./lib/fortunes.js');

//checkout nodemon
app.engine('handlebars', handlebars.engine );
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3303);

//Middleware
app.use(function(req,re, next){
    res.locals.showTests = app.get('env' !== 'production' &&
                                    req.query.test === '1');
                                    next();
});

app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', function (req, res) {
    res.render('home');
});
app.get('/about', function (req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: fortune.getFortune() });
});

//Custom 404 Page
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

//Custom 500 Page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});
