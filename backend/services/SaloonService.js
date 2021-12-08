const Saloon = require('../models/Saloon');
var uuid = require('uuid').v4;

class SaloonService {

    static async getSaloonList() {
        try {
            return await Saloon.find();
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

    static async getSaloon({pid, name, cinemaID, throwError=true}) {
        let saloon = await Saloon.findOne({
            ...(!!pid && {pid: pid}),
            ...(!!name && {name: name}),
            ...(!!cinemaID && {cinemaID: cinemaID})
        });
        if (saloon) {
            return saloon
        } else {
            if(throwError){
                throw new NotFoundError({
                    detail: "Saloon not found",
                    detailKey: "errors.notFound.saloon",
                    metadata: {
                        saloonID: pid,
                        saloonName: name
                    }
                })
            }else{
                return null
            }
        }
    }

    static async createSaloon({name, capacity, cinemaID}) {
        let cinema = await CinemaService.getCinema({pid: cinemaID});

        let saloon = await this.getSaloon({name: name, cinemaID: cinema._id, throwError: false});
        if (!saloon) {
            try {
                await Saloon.collection.insertOne({name: name, pid: uuid(), capacity: capacity, cinemaID: cinema._id});
                return new SuccessMessage({name: name, message: "Successfully created"})
            } catch (error) {
                throw new BusinessError({
                    detail: "An expected error during this operation",
                    detailKey: "errors.businessError",
                    metadata: {
                        saloonName: name,
                        cinemaID: cinema.pid,
                        error: error
                    }
                })
            }
        } else {
            throw new ValidationError({
                detail: "This saloon name already exist in this cinema",
                detailKey: "errors.alreadyExist.saloon",
                metadata: {
                    name: name
                }
            })
        }

    }

    static async deleteSaloon({saloonID}) {
        let saloon = await this.getSaloon({pid: saloonID});
        try {
            await Saloon.deleteOne({_id: saloon._id});
            return new SuccessMessage({name: saloon.name, message: "Successfully deleted", pid: saloon.pid})
        } catch (error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    saloonID: saloonID,
                    error: error
                }
            })
        }
    }


    static async getSaloonListWithCinema({cinemaID}) {
        let cinema = await CinemaService.getCinema({pid: cinemaID});

        try {
            return await Saloon.find({cinemaID: cinema._id});
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

module.exports = SaloonService;