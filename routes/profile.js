require('dotenv').config();

var express = require('express');
var router = express.Router();
var loggedIn = require('../middleware/loggedIn');
var isAdmin = require('../middleware/isAdmin');
var db = require('../models');
var request = require('request');

router.get('/', loggedIn, function(req, res){
	console.log(req.user.account_id)
	res.render("profile")
});

// router.get('/admin', isAdmin, function(req, res){
// 	res.render('admin');
// });

// router.get('/username', function(req, res){
// 	request()
// 	db.user.update({
// 		username: req.query.username
// 	}, {
// 		where: { email: req.query.email 
// 		}
// 	})
// 	.then(function(user){
// 		res.redirect('/profile')
// 	})
// })


module.exports = router