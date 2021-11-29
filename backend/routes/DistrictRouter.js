var express = require('express');
var router = express.Router();

const { check, validationResult, body } = require('express-validator');

var DistrictService = require("../services/DistrictService");

router.get('/', async function (request, response) {
     let districtList = await DistrictService.getDisctrict();
     response.json(districtList)
});

router.delete('/:districtID',
     async function (request, response) {
          try {
               let result = await DistrictService.deleteDistrict({
                districtID: request.params.districtID
               });
               response.send(result)
          } catch (errors) {
               return response.status(400).json({ error: errors.toString() });
          }
     });

module.exports = router;