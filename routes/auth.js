require('dotenv').config();

var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig');

router.get('/login', function (req, res) {
	res.render('auth/login');
});

router.get('/signup', function(req, res) {
	res.render('auth/signup', { previousData: null });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  successFlash: 'Yay, login successful!',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid Credentials'
}));

router.post('/signup', function(req, res) {
	if(req.body.password != req.body.passwordretype) {
		req.flash('error', 'Passwords do not match!');
		res.render('auth/signup', { previousData: req.body, alerts: req.flash() });
	} else {
		console.log(req.body);
		db.user.findOrCreate({
			where: { email: req.body.email },
			defaults: req.body
		})
		.spread(function(user, wasCreated, next){
			if(wasCreated){
				passport.authenticate('local', {
				successRedirect: '/profile',
				successFlash: 'Yay, login successful!',
				failureRedirect: '/auth/login',
				failureFlash: 'Invalid Credentials'
				})(req, res, next);
			} else {
				req.flash('error', 'Email already in use.');
				res.render('auth/signup', { previousData: req.body, alerts: req.flash() });
			}
		})
		.catch(function(err){
			if(err && err.errors){
				err.errors.forEach(function(e){
					if(e.type == 'Validation error'){
						req.flash('error', 'ValidationError: '+ e.message);
					}
				})
			} else {
				console.log("Error:", err);
				req.flash('error', 'A server error occured. Please contact your admin.');
			}
			res.render('auth/signup', { previousData: req.body, alerts: req.flash() })
		})
	}
});

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'You have been logged out.');
	res.redirect('/auth/login');
});

//FACEBOOK SPECIFIC ROUTES

router.get('/facebook', passport.authenticate('facebook', {
	scope: ['public_profile', 'email']
}));

router.get('/callback/facebook', passport.authenticate('facebook', {
	successRedirect: '/profile',
	successFlash: 'Facebook login successful',
	failureRedirect: '/auth/login',
	failureFlash: 'Facebook login failed'
}));

module.exports = router;