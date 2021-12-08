var express = require('express');
var router = express.Router();

const {check, validationResult, body} = require('express-validator');

router.get('/', async function (request, response) {
    let result = await CinemaService.getCinemaList();
    response.json(result)
});

router.get('/:cinemaID', async function (request, response) {
    try {
        let result = await CinemaService.getCinema({pid: request.params.cinemaID});
        response.send(result)
    } catch (error) {
        response.status(error.statusCode).json(error)
    }

});

router.delete('/:cinemaID',
    async function (request, response) {
        try {
            let result = await CinemaService.deleteCinema({
                cinemaID: request.params.cinemaID
            });
            response.send(result)
        } catch (error) {
            response.status(error.statusCode).json(error)
        }
    });


router.post('/:cinemaID/saloons',
    check('name')
        .exists()
        .isLength({min: 3}),
    check('capacity')
        .exists(),
    async function (request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(422).json(errors.array())
        } else {
            try {
                let result = await SaloonService.createSaloon({
                    cinemaID: request.params.cinemaID,
                    name: request.body.name,
                    capacity: request.body.capacity
                });
                response.send(result)
            } catch (error) {
                response.status(error.statusCode).json(error)
            }
        }
    });

router.get('/:cinemaID/saloons',
    async function (request, response) {
        try {
            let result = await SaloonService.getSaloonListWithCinema({
                cinemaID: request.params.cinemaID
            });
            response.send(result)
        } catch (error) {
            response.status(error.statusCode).json(error)
        }
    });


module.exports = router;