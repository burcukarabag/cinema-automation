const Movie = require('../models/Movie');
var uuid = require('uuid').v4;
const { Binary } = require('mongodb');

class MovieService {

    static async getMovieList() {
        try {
            return await Movie.find();
        } catch (error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    error: error
                }
            })
        }
    }

    static async getMovie({pid, name, throwError=true}) {
        let movie = await Movie.findOne({
            ...(!!pid && {pid: pid}),
            ...(!!name && {name: name})
        });
        if (movie) {
            return movie
        } else {
            if(throwError){
                throw new NotFoundError({
                    detail: "Movie not found",
                    detailKey: "errors.notFound.movie",
                    metadata: {
                        movieID: pid,
                        movieName: name
                    }
                })
            }else{
                return null
            }
        }
    }

    static async createMovie({name, director, summary, time, banner, categoryID}) {
        let category = await CategoryService.getCategory({pid: categoryID});

        let movie = await this.getMovie({name: name, throwError: false});
        if (!movie) {
            try {
                //TODO:BANNER
                let bannerData = banner ? Binary(Buffer.from('/9j/4AAQSkZJRgA...and...so...on../2Q==', 'base64')) : null;
                await Movie.collection.insertOne({name: name, pid: uuid(), director: director, summary: summary,
                    banner: bannerData, time: time, categoryID: category._id});
                return new SuccessMessage({name: name, message: "Successfully created"})
            } catch (error) {
                throw new BusinessError({
                    detail: "An expected error during this operation",
                    detailKey: "errors.businessError",
                    metadata: {
                        movieName: name,
                        categoryID: category.pid,
                        error: error
                    }
                })
            }
        } else {
            throw new ValidationError({
                detail: "This movie name already exist",
                detailKey: "errors.alreadyExist.movie",
                metadata: {
                    name: name
                }
            })
        }

    }

    static async deleteMovie({movieID}) {
        let movie = await this.getMovie({pid: movieID});
        try {
            await Movie.deleteOne({_id: movie._id});
            return new SuccessMessage({name: movie.name, message: "Successfully deleted", pid: movie.pid})
        } catch (error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    movieID: movieID,
                    error: error
                }
            })
        }
    }


    static async getMovieListWithCategory({categoryID}) {
        let category = await CategoryService.getCategory({pid: categoryID});

        try {
            return await Movie.find({categoryID: category._id});
        } catch (error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    error: error
                }
            })
        }
    }

}

module.exports = MovieService;