const City = require('../models/City');
var uuid = require('uuid').v4;

class CityService {
    static async getCityList() {
        try{
            return await City.find();
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
        try{
            await City.collection.insertOne({name: name, pid: uuid(), zipCode: zipCode});
            return new SuccessMessage({name: "City", message: "Successfully created"})
        }catch(error) {
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

        try{
            await City.collection.insertMany(cityList);
            return new SuccessMessage({name: "City List", message: "Successfully created"})
        }catch(error) {
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
        try{
            await City.collection.deleteOne({id: city._id});
            return new SuccessMessage({name: "City", message: "Successfully deleted", id: cityID})
        }catch(error) {
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