var express = require('express');
var router = express.Router();

router.get('/', async function (request, response) {
    let result = await MovieService.getMovieList();
    response.json(result)
});

router.get('/:movieID', async function (request, response) {
    try {
        let result = await MovieService.getMovie({pid: request.params.movieID});
        response.send(result)
    } catch (error) {
        response.status(error.statusCode).json(error)
    }

});

router.delete('/:movieID',
    async function (request, response) {
        try {
            let result = await MovieService.deleteMovie({
                movieID: request.params.movieID
            });
            response.send(result)
        } catch (error) {
            response.status(error.statusCode).json(error)
        }
    });

module.exports = router;