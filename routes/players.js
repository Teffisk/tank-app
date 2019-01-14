var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

router.get('/', function(req, res){
	res.render('players/search');
});

router.get('/results/', function(req, res){
	var account;
	var player;
	var urlAccount = `https://api-xbox-console.worldoftanks.com/wotx/account/list/?application_id=1713b4e1f4383b7a11a4f24c86f8cefa&search=${req.query.name}`
	request(urlAccount, function(error, response, body){
		if (error || JSON.parse(body).meta.count != 1){
			res.render('error', { error: error })
		} else {
			console.log("Seached Player:", req.query.name)
			account = JSON.parse(body).data
			console.log("Player's account", account[0])
			var urlPlayer = `https://api-xbox-console.worldoftanks.com/wotx/account/info/?application_id=1713b4e1f4383b7a11a4f24c86f8cefa&account_id=${account[0].account_id}`
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
					res.render('players/profile', {
						player: player,
						account: account[0],
						tanks: tanksObj,
						});
				})
			})
		}
	})
});

router.get('/recents', function(req, res){
	res.render('recents');
});

router.get('/tanks', function(req, res){
	res.render('tanks')
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




