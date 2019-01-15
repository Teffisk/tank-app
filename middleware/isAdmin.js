module.exports = function(req, res, next){
	if(req.user && req.user.admin){
		next();
	} else {
		req.flash('error', 'You must be an admin to view this page.');
		res.redirect('/')
	}
}