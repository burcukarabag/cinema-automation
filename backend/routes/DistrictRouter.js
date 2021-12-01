var express = require('express');
var router = express.Router();

const { check, validationResult, body } = require('express-validator');

var DistrictService = require("../services/DistrictService");
var CinemaService = require("../services/CinemaService");

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


router.post('/:districtID/cinemas',
     check('name')
          .exists()
          .isLength({ min: 3 }),
     async function (request, response) {
          const errors = validationResult(request)
          if (!errors.isEmpty()) {
               return response.status(422).json(errors.array())
          } else {
               try {
                    let result = await CinemaService.createCinema({
                         districtID: request.params.districtID,
                         name: request.body.name,
                         address: request.body.address,
                         telephone: request.body.telephone,
                         email: request.body.email
                    });
                    response.send(result)
               } catch (errors) {
                    return response.status(400).json({ error: errors.toString() });
               }
          }
     });

module.exports = router;