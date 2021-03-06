var express = require("express");
var router = express.Router();
var db = require("../models");
var request = require("request");

router.get("/list", function(req, res) {
  if (req.query.nation && req.query.tier && req.query.type) {
    db.tank
      .findAll({
        where: {
          nation: req.query.nation,
          tier: req.query.tier,
          type: req.query.type
        }
      })
      .then(function(tanks) {
        res.render("tanks/list", { tanks: tanks });
      })
      .catch(function(err) {
        console.log("Error:", err);
        res.send("Error:", err);
      });
  } else if (req.query.nation && req.query.tier) {
    db.tank
      .findAll({
        where: {
          nation: req.query.nation,
          tier: req.query.tier
        }
      })
      .then(function(tanks) {
        res.render("tanks/list", { tanks: tanks });
      })
      .catch(function(err) {
        console.log("Error:", err);
        res.send("Error:", err);
      });
  } else if (req.query.nation && req.query.type) {
    db.tank
      .findAll({
        where: {
          nation: req.query.nation,
          type: req.query.type
        }
      })
      .then(function(tanks) {
        res.render("tanks/list", { tanks: tanks });
      })
      .catch(function(err) {
        console.log("Error:", err);
        res.send("Error:", err);
      });
  } else if (req.query.tier && req.query.type) {
    db.tank
      .findAll({
        where: {
          tier: req.query.tier,
          type: req.query.type
        }
      })
      .then(function(tanks) {
        res.render("tanks/list", { tanks: tanks });
      })
      .catch(function(err) {
        console.log("Error:", err);
        res.send("Error:", err);
      });
  } else if (req.query.nation) {
    db.tank
      .findAll({
        where: {
          nation: req.query.nation
        }
      })
      .then(function(tanks) {
        res.render("tanks/list", { tanks: tanks });
      })
      .catch(function(err) {
        console.log("Error:", err);
        res.send("Error:", err);
      });
  } else if (req.query.type) {
    db.tank
      .findAll({
        where: {
          type: req.query.type
        }
      })
      .then(function(tanks) {
        res.render("tanks/list", { tanks: tanks });
      })
      .catch(function(err) {
        console.log("Error:", err);
        res.send("Error:", err);
      });
  } else if (req.query.tier) {
    db.tank
      .findAll({
        where: {
          tier: req.query.tier
        }
      })
      .then(function(tanks) {
        res.render("tanks/list", { tanks: tanks });
      })
      .catch(function(err) {
        console.log("Error:", err);
        res.send("Error:", err);
      });
  }
});

router.get("/", function(req, res) {
  res.render("tanks/tanks");
});

router.get("/show/:id", function(req, res) {
  var packageNums = [];
  console.log("PARAMS passed to tank list route:", req.params.id);
  db.tank.findByPk(req.params.id).then(function(tank) {
    console.log(tank.name);
    const urlPackages = `https://api-xbox-console.worldoftanks.com/wotx/encyclopedia/vehiclepackages/?application_id=1713b4e1f4383b7a11a4f24c86f8cefa&tank_id=${
      tank.tank_id
    }`;
    request(urlPackages, function(error, response, body) {
      var packageData = JSON.parse(body).data;
      for (var packages in packageData) {
        packageNums.push(packageData[packages]);
      }
      res.render("tanks/show", { packageNums: packageNums, tank: tank });
    });
  });
});

module.exports = router;
