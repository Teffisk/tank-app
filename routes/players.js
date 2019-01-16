//env variables
require('dotenv').config();

var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

router.get('/', function(req, res){
	res.render('players/search');
});

router.get('/results/', function(req, res){
	var account;
	var urlAccount = process.env.urlAccount + req.query.name
	request(urlAccount, function(error, response, body){
		if (error){
			res.render('error', { error: error })
		} else if (JSON.parse(body).meta.count > 1) {
			var names = [];
			playerData = JSON.parse(body)
			for (var tanker in playerData) {
				names.push(playerData[tanker]);
			}
			res.render('players/multiple-results', { names: names[2] })
		} else {
			console.log("Searched Player:", req.query.name)
			account = JSON.parse(body).data
			console.log("Player's account", account[0])
			res.redirect('/players/account/' + account[0].account_id);
		}
	})
});

router.get('/account/:id', function(req, res){
	var account = req.params.id
	var urlPlayer = process.env.urlPlayer + account
	request(urlPlayer, function(error, response, body){
		result = JSON.parse(body).data
		for (var accountId in result){
			player = result[accountId]
		}
		db.tank.findAll({
			where: { tank_id: 
				[
					player.statistics.max_frags_tank_id,
					player.statistics.max_damage_tank_id,
					player.statistics.max_xp_tank_id
				]
			}
		})
		.then(function(tanks){
			tanksObj = {};
			tanks.forEach(function(t){
				if(!tanksObj[t.tank_id]){
					tanksObj[t.tank_id] = t;
				}
			})
			res.render('players/tanker', {
				player: player,
				tanks: tanksObj,
			})
		})
	})
})

router.get('/tanks', function(req, res){
	res.render('tanks')
});

router.get('/account/:id/recent-vehicles', function(req, res){
	var account = req.params.id
	console.log("Player Name:",req.query.player)
	var recentTanks;
	var recentTankStats = [];
	var urlRecent = process.env.urlRecentVehicles + account;
	request(urlRecent, function(error, response, body){
		result = JSON.parse(body).data;
		
		for(var id in result){
			recentTanks = result[id];
		}
		var tankIds = recentTanks.map(function(tank){
			return tank.tank_id;
		});

		db.tank.findAll({ 
			where: { tank_id: tankIds },
			attributes: ['tank_id', 'name', 'nation', 'tier', 'type']
		})
		.then(function(tanks){
			let obj = {};
			tanks.forEach((t) => {
				obj[t.tank_id] = {
					name: t.name,
					tier: t.tier,
					nation: t.nation,
					type: t.type
				};
			});
			var sortedTanks = recentTanks.sort(function(a, b){
				return b.last_battle_time - a.last_battle_time;
			});
			// console.log(sortedTanks)
			res.render('players/recent-vehicles', { recentTanks: sortedTanks, dbTanks: obj, player: player })
		});
	})
})

module.exports = router;


function convertDate(stamp){
	var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var date = new Date(stamp*1000);
	var year = date.getFullYear();
	var month = months_arr[date.getMonth()];
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	var displayDate = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return displayDate
}

function convertTime(stamp){
	var seconds = stamp/100;
	var minutes = Math.floor(seconds/60);
	var remainder = seconds%60;
	return minutes+':'+remainder
}





