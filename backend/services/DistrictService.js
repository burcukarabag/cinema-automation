const District = require('../models/District')
const CityService = require('../services/CityService')
var uuid = require('uuid').v4;

class DistrictService {
    static async getDistrict() {
        return await District.find();
    }

    static async createDistrict({ name, cityID }) {
        let city = await CityService.getCity({pid: cityID})
        console.log(city);

        return new Promise((resolve, reject) => {
            District.collection.insertOne({ name: name, pid: uuid(), city: city._id }, (error, docs) => {
                if (error) {
                    reject(error)
                } else {
                    resolve("Successfully created!")
                }
            })
        })

    }

    static async createCityWithList({ cityList }) {
        cityList = cityList.map(city=> ({ ...city, pid: uuid() }))

        return new Promise((resolve, reject) => {
            City.collection.insertMany(cityList, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve("Successfully created!")
                }
            })
        })
    }

    static async deleteDistrict({districtID }) {
        return new Promise((resolve, reject) => {
            District.collection.deleteOne({pid: districtID}, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve("Successfully deleted!")
                }
            })
        })
    }
}

module.exports = DistrictService