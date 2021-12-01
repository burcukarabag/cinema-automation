const City = require('../models/City')
var uuid = require('uuid').v4;

class CityService {
    static async getCities() {
        return await City.find();
    }

    static async getCity({pid}) {
        let city = await City.collection.findOne({pid: pid})
        if(city){
            return city
        }else{
            throw new Error("Not found")
        }
    }

    static async createCity({ name, zipCode }) {
        return new Promise((resolve, reject) => {
            City.collection.insertOne({ name: name, pid: uuid(), zipCode: zipCode}, (error, docs) => {
                if (error) {
                    reject(error)
                } else {
                    resolve("Successfully created!")
                }
            })
        })

    }

    static async createCityWithList({ cityList }) {
        cityList = cityList.map(city=> ({ name: city, pid: uuid(), zipCode: null}))

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

    static async deleteCity({cityID }) {
        return new Promise((resolve, reject) => {
            City.collection.deleteOne({pid: cityID}, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve("Successfully deleted!")
                }
            })
        })
    }
}

module.exports = CityService