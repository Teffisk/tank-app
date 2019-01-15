require('dotenv').config();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	db.user.findByPk(id)
	.then(function(user){
		done(null, user)
	})
	.catch(function(err){
		done(err, null)
	})
})

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, callback){
	db.user.findOne({
		where: { email: email }
	})
	.then(function(foundUser){
		if(!foundUser || !foundUser.validPassword(password)){
			console.log('Failure to login')
			callback(null, null);
		} else {
			console.log('Success!');
			callback(null, foundUser);
		}
	})
	.catch(function(err){
		callback(err, null);
	});
}));

passport.use(new FacebookStrategy({
	clientID: process.env.FB_APP_ID,
	clientSecret: process.env.FB_SECRET,
	callbackURL: process.env.BASE_URL+'auth/callback/facebook',
	profileFields: ['id', 'email', 'displayName', 'photos'],
	enableProof: true
}, function(accesssToken, refreshToken, profile, callback){
	var facebookEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
	db.user.findOne({
		where: { email: facebookEmail }
	})
	.then(function(existingUser){
		if(existingUser && facebookEmail != null){
			//EXISTING USER
			existingUser.updateAttributes({
				facebookId: profile.id,
				facebookToken: accesssToken
			})
			.then(function(updatedUser){
				callback(null, updatedUser);
			})
			.catch(callback)
		} else {
			//NEW USER
			//var usernameArr = profile.displayName.split(' ');
			var photo = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : 'https://png.icons8/ios/1600/person-female-filled.png';
			db.user.findOrCreate({
				where: {
					facebookToken: accesssToken,
					email: facebookEmail,
					admin: false,
					image: photo
				}
			})
			.spread(function(newUser, wasCreated){
				if(wasCreated){
					//This is expected
					callback(null, newUser);
				} else {
					//User was not new, they likely just updated their fb email since using your site
					newUser.facebookToken = accesssToken;
					newUser.email = facebookEmail;
					newUser.save()
					.then(function(savedUser){
						callback(null, savedUser)
					})
					.catch(callback);
				}
			})
			.catch(callback);
		}
	})
	.catch(callback)
}))

module.exports = passport










