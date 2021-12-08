const express = require('express');
const router = express.Router();

const {check, validationResult, body} = require('express-validator');

router.get('/', async function (request, response) {
    let result = await CityService.getCityList();
    response.json(result)
});

router.get('/:cityID', async function (request, response) {
    try {
        let result = await CityService.getCity({pid: request.params.cityID});
        response.send(result)
    } catch (error) {
        response.status(error.statusCode).json(error)
    }

});

router.post('/',
    check('name')
        .exists()
        .isLength({min: 3}),
    async function (request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json(errors)
        } else {
            try {
                let result = await CityService.createCity({
                    name: request.body.name,
                    zipCode: request.body.zipCode
                });
                response.send(result)
            } catch (error) {
                response.status(error.statusCode).json(error)
            }
        }
    });

router.post('/create.withList',
    check('cityList')
        .isArray().withMessage('Body must be an array'),
    async function (request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json(errors.array())
        } else {
            try {
                let result = await CityService.createCityWithList({
                    cityList: request.body.cityList
                });
                response.send(result)
            } catch (error) {
                response.status(error.statusCode).json(error)
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
        } catch (error) {
            response.status(error.statusCode).json(error)
        }
    });

router.get('/:cityID/districts',
    async function (request, response) {
        try {
            let result = await DistrictService.getCityDistrictList({
                cityID: request.params.cityID
            });
            response.send(result)
        } catch (error) {
            response.status(error.statusCode).json(error)
        }
    });

router.post('/:cityID/districts',
    check('name')
        .exists()
        .isLength({min: 3}),
    async function (request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json(errors.array())
        } else {
            try {
                let result = await DistrictService.createDistrict({
                    cityID: request.params.cityID,
                    name: request.body.name
                });
                response.send(result)
            } catch (error) {
                response.status(error.statusCode).json(error)
            }
        }
    });

router.post('/:cityID/districts/create.withList',
    check('districtList')
        .isArray().withMessage('Body must be an array'),
    async function (request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json(errors.array())
        } else {
            try {
                let result = await DistrictService.createDistrictWithList({
                    districtNameList: request.body.districtList,
                    cityID: request.params.cityID
                });
                response.send(result)
            } catch (error) {
                response.status(error.statusCode).json(error)
            }
        }
    });

router.get('/:cityID/cinemas',
    async function (request, response) {
        try {
            let result = await CinemaService.getCityCinemaList({
                cityID: request.params.cityID
            });
            response.send(result)
        } catch (error) {
            response.status(error.statusCode).json(error)
        }
    });

module.exports = router;