const City = require('../models/City')

class CityService {
    static async getCities(){
        console.log("selamcnm")
        return await City.find();
    }
}

module.exports = CityService