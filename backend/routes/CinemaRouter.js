var express = require('express');
var router = express.Router();

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

module.exports = router;