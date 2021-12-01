var express = require('express');
var router = express.Router();

const { check, validationResult, body } = require('express-validator');

var CinemaService = require("../services/CinemaService");

router.get('/', async function (request, response) {
    let cinemaList = await CinemaService.getCinemas();
    response.json(cinemaList)
});

router.post('/:cityID/districts/create.withList',
    check('districtList')
        .isArray().withMessage('Body must be an array'),
    async function (request, response) {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response.status(422).json(errors.array())
        } else {
            try {
                let result = await DistrictService.createDistrictWithList({
                    districtList: request.body.districtList,
                    cityID: request.params.cityID
                });
                response.send(result)
            } catch (errors) {
                return response.status(400).json({ error: errors.toString() });
            }
        }
    });

module.exports = router;