const District = require('../models/District')
const CityService = require('../services/CityService')
var uuid = require('uuid').v4;

class DistrictService {
    
    static async getDistrict({pid}) {
        let district = await District.findOne({pid: pid});
        if(district){
            return district
        }else{
            throw new Error("City not found")
        }
    }

    static async createDistrict({ name, cityID }) {
        let city = await CityService.getCity({pid: cityID})

        return new Promise((resolve, reject) => {
            District.collection.insertOne({ name: name, pid: uuid(), cityID: city._id }, (error, docs) => {
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


    static async createDistrictWithList({ districtList, cityID }) {
        let city = await CityService.getCity({pid: cityID})
        districtList = districtList.map(district=> ({ name: district, pid: uuid(), cityID: city._id}))


        return new Promise((resolve, reject) => {
            District.collection.insertMany(districtList, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve("Successfully created!")
                }
            })
        })
    }

}

module.exports = DistrictService