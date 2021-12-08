const City = require('../models/City');
var uuid = require('uuid').v4;

class CityService {
    static async getCityList() {
        try {
            return await City.find();
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

    static async getCity({pid}) {
        let city = await City.findOne({pid: pid});
        if (city) {
            return city
        } else {
            throw new NotFoundError({
                detail: "City not found",
                detailKey: "errors.notFound.city",
                metadata: {
                    cityID: pid
                }
            })
        }
    }

    static async createCity({name, zipCode}) {
        try {
            await City.collection.insertOne({name: name, pid: uuid(), zipCode: zipCode});
            return new SuccessMessage({name: name, message: "Successfully created"})
        } catch (error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    cityName: name,
                    error: error
                }
            })
        }
    }

    static async createCityWithList({cityList}) {
        cityList = cityList.map(city => ({name: city, pid: uuid(), zipCode: null}))
        let session = await City.startSession();
        // session.startTransaction();
        // const opts = {session};
        try {
            await City.collection.insertMany(cityList);
            // await session.commitTransaction();
            // session.endSession();
            return new SuccessMessage({name: "City List", message: "Successfully created"})
        } catch (error) {
            console.log(error)
            // await session.abortTransaction();
            // session.endSession();
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    cityList: cityList,
                    error: error
                }
            })
        }
    }

    static async deleteCity({cityID}) {
        let city = await this.getCity({pid: cityID});
        try {
            City.pre('remove', async function (next) {
                await DistrictService.deleteManyDistrict({cityID: city._id});
                next();
            });
            return new SuccessMessage({name: city.name, message: "Successfully deleted", pid: cityID})
        } catch (error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    cityID: cityID,
                    error: error
                }
            })
        }
    }
}

module.exports = CityService