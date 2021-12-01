const Cinema = require('../models/Cinema')
const DistrictService = require('../services/DistrictService')
var uuid = require('uuid').v4;

class CinemaService {
    static async getCinemas() {
        return await Cinema.find();
    }

    static async getCinema({pid}) {
        let cinema = await Cinema.findOne({pid: pid});
        if(cinema){
            return cinema
        }else{
            throw new Error("Cinema not found")
        }
    }

    static async createCinema({name, districtID, address, email, telephone}) {
        let district = await DistrictService.getDistrict({pid: districtID})
        console.log(district)
        return new Promise((resolve, reject) => {
            Cinema.collection.insertOne({ name: name, pid: uuid(), districtID: district._id, address: address, email: email, telephone: telephone }, (error, docs) => {
                if (error) {
                    reject(error)
                } else {
                    resolve("Successfully created!")
                }
            })
        })
    }

    static async deleteCinema({cinemaID }) {
        let cinema = await this.getCinemas({pid: cinemaID})
        return new Promise((resolve, reject) => {
            Cinema.collection.deleteOne({_id: cinema._id}, (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve("Successfully deleted!")
                }
            })
        })
    }

}

module.exports = CinemaService