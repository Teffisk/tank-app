var express = require('express');
var app = express();
var request = require('request');
var layouts = require('express-ejs-layouts');
var db = require('./models');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('./config/passportConfig');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(layouts);
app.use('/', express.static('static'));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Custom middleware - write data to locals
app.use(function(req, res, next){
	res.locals.alerts = req.flash();
	res.locals.user = req.user;
	next();
});

app.get('/', function(req, res) {
	res.render('home');
});

app.use('/tanks', require('./routes/tanks'));
app.use('/players', require('./routes/players'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));



app.listen(process.env.PORT || 3000, function(){
	console.log('Hello world!')
});