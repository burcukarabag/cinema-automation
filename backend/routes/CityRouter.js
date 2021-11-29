var express = require('express');
var router = express.Router();

const { check, validationResult, body } = require('express-validator');

var CityService = require("../services/CityService");
var DistrictService = require("../services/DistrictService");

router.get('/', async function (request, response) {
     let cityList = await CityService.getCities();
     response.json(cityList)
});

router.post('/',
     check('name')
          .exists()
          .isLength({ min: 3 }),
     async function (request, response, next) {
          const errors = validationResult(request)
          if (!errors.isEmpty()) {
               return response.status(422).json(errors.array())
          } else {
               try {
                    let result = await CityService.createCity({
                         name: request.body.name,
                         zipCode: request.body.zipCode
                    });
                    response.send(result)
               } catch (errors) {
                    console.log(errors)
                    return response.status(400).json({ error: errors.toString() });
               }
          }
     });

router.post('/withList',
     check('cityList')
          .isArray().withMessage('Body must be an array'),
     check("cityList.*.name")
          .exists().withMessage("City list must required name field"),
     async function (request, response) {
          const errors = validationResult(request)
          if (!errors.isEmpty()) {
               return response.status(422).json(errors.array())
          } else {
               try {
                    let result = await CityService.createCityWithList({
                         cityList: request.body.cityList
                    });
                    response.send(result)
               } catch (errors) {
                    console.log(errors)
                    return response.status(400).json({ error: errors.toString() });
               }
          }
     });

router.delete('/:cityID',
     async function (request, response) {
          try {
               let result = await CityService.deleteCity({
                    cityID: request.params.cityID
               });
               response.send(result)
          } catch (errors) {
               return response.status(400).json({ error: errors.toString() });
          }
     });

router.get('/:cityID/districts',
     async function (request, response) {
          try {
               let result = await CityService.deleteCity({
                    cityID: request.params.cityID
               });
               response.send(result)
          } catch (errors) {
               return response.status(400).json({ error: errors.toString() });
          }
     });

router.post('/:cityID/districts',
     check('name')
          .exists()
          .isLength({ min: 3 }),
     async function (request, response) {
          const errors = validationResult(request)
          if (!errors.isEmpty()) {
               return response.status(422).json(errors.array())
          } else {
               try {
                    let result = await DistrictService.createDistrict({
                         cityID: request.params.cityID,
                         name: request.body.name
                    });
                    response.send(result)
               } catch (errors) {
                    return response.status(400).json({ error: errors.toString() });
               }
          }
     });

module.exports = router;