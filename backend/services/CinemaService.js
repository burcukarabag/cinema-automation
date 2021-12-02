const Cinema = require('../models/Cinema')
const District = require('../models/District')
const DistrictService = require('../services/DistrictService')
const CityService = require('../services/CityService')
var uuid = require('uuid').v4;

class CinemaService {

    static async getCinemaList() {
        try{
            return await Cinema.find();
        }catch(error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    error: error
                }
            })
        }
    }

    static async getCinema({pid, name, districtID, throwError=true}) {
        let cinema = await Cinema.findOne({ ...(!!pid && {pid: pid}),
            ...(!!name && {name: name}), ...(!!districtID && {districtID: districtID})});
        if (cinema) {
            return cinema
        } else {
            if(throwError){
                throw new NotFoundError({
                    detail: "Cinema not found",
                    detailKey: "errors.notFound.cinema",
                    metadata: {
                        cinemaID: pid
                    }
                })
            }else{
                return null
            }
        }
    }

    static async createCinema({name, districtID, address, email, telephone}) {
        let district = await DistrictService.getDistrict({pid: districtID});
        let cinema = await this.getCinema({name: name, districtID: district._id, throwError: false});
        if(!cinema){
            try{
                await Cinema.collection.insertOne({ name: name, pid: uuid(), districtID: district._id, address: address, email: email, telephone: telephone});
                return new SuccessMessage({name: "Cinema", message: "Successfully created"})
            }catch(error) {
                throw new BusinessError({
                    detail: "An expected error during this operation",
                    detailKey: "errors.businessError",
                    metadata: {
                        cinemaName: name,
                        districtID: districtID,
                        error: error
                    }
                })
            }
        }else{
            throw new ValidationError({
                detail: "This cinema name already exist in this district",
                detailKey: "errors.alreadyExist.cinema",
                metadata: {
                    districtID: districtID,
                    name: name
                }
            })
        }
    }

    static async deleteCinema({cinemaID}) {
        let cinema = await this.getCinemaList({pid: cinemaID});
        try{
            await Cinema.collection.deleteOne({id: cinema._id});
            return new SuccessMessage({name: "Cinema", message: "Successfully deleted", id: cinema._id})
        }catch(error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    cinemaID: cinemaID,
                    error: error
                }
            })
        }
    }

    static async getCityCinemaList({cityID}) {
        let city = await CityService.getCity({pid: cityID});

        try{
            // return await Cinema.find()
        }catch(error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    error: error
                }
            })
        }
    }

    static async getDistrictCinemaList({districtID}) {
        let district = await DistrictService.getDistrict({pid: districtID});

        try{
            return await Cinema.find({districtID: district._id});
        }catch(error) {
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

module.exports = CinemaService