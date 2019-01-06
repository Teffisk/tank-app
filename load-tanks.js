var db = require('./models');
var request = require('request');


var url = "https://api-xbox-console.worldoftanks.com/wotx/encyclopedia/vehicles/?application_id=1713b4e1f4383b7a11a4f24c86f8cefa&fields=tank_id%2Cshort_name%2Cnation%2Ctype%2Ctier%2Cimages.big_icon"
request(url, function(error, response, body){
	var tanks = []
	var tankData = JSON.parse(body).data
	for (var tank in tankData) {
		tanks.push(tankData[tank])
	}
	tanks.forEach(function(t) {
		var images = t.images.big_icon
		t.images = images
		db.tank.create(t);
	})
})