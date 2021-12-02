const District = require('../models/District')
const CityService = require('../services/CityService')
var uuid = require('uuid').v4;

class DistrictService {

    static async getDistrictList() {
        try{
            return await District.find();
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
    
    static async getDistrict({pid}) {

        let district = await District.collection.findOne({pid: pid});
        if (district) {
            return district
        } else {
            throw new NotFoundError({
                detail: "District not found",
                detailKey: "errors.notFound.district",
                metadata: {
                    districtID: pid
                }
            })
        }
    }

    static async createDistrict({name, cityID}) {
        let city = await CityService.getCity({pid: cityID});

        try{
            await District.collection.insertOne({name: name, pid: uuid(), cityID: city._id});
            return new SuccessMessage({name: "District", message: "Successfully created"})
        }catch(error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    districtName: name,
                    cityID: cityID,
                    error: error
                }
            })
        }
    }

    static async deleteDistrict({districtID}) {

        let district = await this.getDistrict({pid: districtID});
        try{
            await District.collection.deleteOne({id: district._id});
            return new SuccessMessage({name: "District", message: "Successfully deleted", id: district._id})
        }catch(error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    districtID: districtID,
                    error: error
                }
            })
        }
    }

    static async createDistrictWithList({ districtList, cityID }) {
        let city = await CityService.getCity({pid: cityID});
        districtList = districtList.map(district=> ({ name: district, pid: uuid(), cityID: city._id}));

        try{
            await District.collection.insertMany(districtList);
            return new SuccessMessage({name: "District List", message: "Successfully created"})
        }catch(error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    districtList: districtList,
                    error: error
                }
            })
        }
    }

    static async getCityDistrictList({cityID}) {
        let city = await CityService.getCity({pid: cityID});

        try{
            return await District.find({cityID: city._id});
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

module.exports = DistrictService