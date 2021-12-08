var express = require('express');
var router = express.Router();

router.get('/', async function (request, response) {
    let result = await SaloonService.getSaloonList();
    response.json(result)
});

router.get('/:saloonID', async function (request, response) {
    try {
        let result = await SaloonService.getSaloon({pid: request.params.saloonID});
        response.send(result)
    } catch (error) {
        response.status(error.statusCode).json(error)
    }

});

router.delete('/:saloonID',
    async function (request, response) {
        try {
            let result = await SaloonService.deleteSaloon({
                saloonID: request.params.saloonID
            });
            response.send(result)
        } catch (error) {
            response.status(error.statusCode).json(error)
        }
    });

module.exports = router;