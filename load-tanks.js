var db = require('./models');
var request = require('request');


var url = "https://api-xbox-console.worldoftanks.com/wotx/encyclopedia/vehicles/?application_id=1713b4e1f4383b7a11a4f24c86f8cefa"
request(url, function(error, response, body){
	var tanks = []
	var tankData = JSON.parse(body).data
	for (var tank in tankData) {
		tanks.push(tankData[tank])
	}
	tanks.forEach(function(t) {
		var nextTanks = [];
		if (t.next_tanks){
			for(var key in t.next_tanks){
				nextTanks.push(key)
			}
			//nextTanks = Object.keys(t.next_tanks)
		}
		console.log("From the API:",t.next_tanks)
		console.log("From the DB:",nextTanks)
		var images = t.images.big_icon
		t.images = images
		db.tank.findOrCreate({
			where: { tank_id: t.tank_id },
			defaults: {
			short_name: t.short_name,
			name: t.name,
			description: t.description,
			price_gold: t.price_gold,
			nation: t.nation,
			is_premium: t.is_premium,
			tag: t.tag,
			price_credit: t.price_credit,
			type: t.type,
			tier: t.tier,
			images: t.images,
			next_tanks: nextTanks
			}			
		})
	})
})

