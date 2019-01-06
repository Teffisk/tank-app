var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.get('/list', function(req, res) {
	db.tank.findAll()
	.then(function(tanks) {
		res.render('tanks/list', { tanks: tanks })
	})
	.catch(function(err){
		console.log("Error:", err)
		res.send("Error:", err)
	})
});

router.get('/show/:id', function(req, res) {
	db.tank.findByPk(req.params.id).
	then(function(tank) {
		const urlTanks = `https://api-xbox-console.worldoftanks.com/wotx/encyclopedia/vehiclepackages/?application_id=1713b4e1f4383b7a11a4f24c86f8cefa&tank_id=${tank.tank_id}`
		request(urlTanks, function(error, response, body) {
			modules = JSON.parse(body);
		})
	})
	.then(function(package) {
		const urlPackages = `https://api-xbox-console.worldoftanks.com/wotx/encyclopedia/vehiclepackages/?application_id=1713b4e1f4383b7a11a4f24c86f8cefa&tank_id=${tank.tank_id}`
		request(urlPackages, function(error, response, body){
			var packageData = JSON.parse(body).data.packagetree
			for (var package in packageData) {
				packages.push(packageData[package])
			}
		})
		res.render('tanks/show', { tank: tank, package: package });
	})
	.catch(function(err){
		console.log("Error:", err)
		res.send("Error:", err)
	})
	
});

module.exports = router;