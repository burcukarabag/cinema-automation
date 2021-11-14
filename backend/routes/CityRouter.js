var express = require('express');
var router = express.Router();
var CityService = require("../services/CityService");

router.get('/', async function(req, res, next) {
     let cityList = await CityService.getCities();
     res.json(cityList)
});

module.exports = router;