var express = require('express');
var app = express();
var request = require('request');
var layouts = require('express-ejs-layouts');
var db = require('./models');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(layouts);
app.use('/', express.static('static'))

app.get('/', function(req, res) {
	res.render('home');
});

app.use('/tanks', require('./routes/tanks'));
//app.use('/players', require('./routes/players'));



app.listen(3000)