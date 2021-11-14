var express = require('express');
var express = require('express');
var express = require('express');
var router = express.Router();
var City = require("../models/City");

router.get('/', function(req, res, next) {
    City.find().then((todos) => {
      res.json(todos);
    }).catch((err) => {
      res.json(err);
    });
  
  
});

module.exports = router;