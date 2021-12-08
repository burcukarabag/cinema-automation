var express = require('express');
var router = express.Router();

const {check, validationResult, body} = require('express-validator');

router.get('/', async function (request, response) {
    let result = await CategoryService.getCategoryList();
    response.json(result)
});

router.get('/:categoryID', async function (request, response) {
    try {
        let result = await CategoryService.getCategory({pid: request.params.categoryID});
        response.send(result)
    } catch (error) {
        response.status(error.statusCode).json(error)
    }

});

router.delete('/:categoryID',
    async function (request, response) {
        try {
            let result = await CategoryService.deleteCategory({
                categoryID: request.params.categoryID
            });
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
                let result = await CategoryService.createCategory({
                    name: request.body.name
                });
                response.send(result)
            } catch (error) {
                response.status(error.statusCode).json(error)
            }
        }
    });

router.post('/:categoryID/movies',
    check('name')
        .exists()
        .isLength({min: 3}),
    async function (request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json(errors)
        } else {
            try {
                let result = await MovieService.createMovie({
                    name: request.body.name,
                    director: request.body.director,
                    time: request.body.time,
                    summary: request.body.summary,
                    banner: request.body.banner,
                    categoryID: request.params.catogoryID
                });
                response.send(result)
            } catch (error) {
                response.status(error.statusCode).json(error)
            }
        }
    });

router.get('/:categoryID/movies',
    async function (request, response) {
        try {
            let result = await MovieService.getMovieListWithCategory({
                categoryID: request.body.categoryID
            });
            response.send(result)
        } catch (error) {
            response.status(error.statusCode).json(error)
        }
    });

module.exports = router;