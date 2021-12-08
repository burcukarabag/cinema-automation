const District = require('../models/District')
var uuid = require('uuid').v4;

class DistrictService {

    static async getDistrictList() {
        try {
            return await District.find();
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

    static async getDistrict({pid, name, cityID, throwError = true}) {

        let district = await District.collection.findOne(
            {
                ...(!!pid && {pid: pid}),
                ...(!!name && {name: name}),
                ...(!!cityID && {cityID: cityID})
            });
        if (district) {
            return district
        } else {
            if (throwError) {
                throw new NotFoundError({
                    detail: "District not found",
                    detailKey: "errors.notFound.district",
                    metadata: {
                        districtID: pid
                    }
                })
            } else {
                return null
            }

        }
    }

    static async createDistrict({name, cityID}) {
        let city = await CityService.getCity({pid: cityID});

        let district = await this.getDistrict({name: name, cityID: city._id, throwError: false});
        if (!district) {
            try {
                await District.collection.insertOne({name: name, pid: uuid(), cityID: city._id});
                return new SuccessMessage({name: name, message: "Successfully created"})
            } catch (error) {
                throw new BusinessError({
                    detail: "An expected error during this operation",
                    detailKey: "errors.businessError",
                    metadata: {
                        districtName: name,
                        cityID: city.pid,
                        error: error
                    }
                })
            }
        } else {
            throw new ValidationError({
                detail: "This district name already exist in this city",
                detailKey: "errors.alreadyExist.district",
                metadata: {
                    cityID: cityID,
                    name: name
                }
            })
        }

    }

    static async deleteDistrict({districtID}) {

        let district = await this.getDistrict({pid: districtID});
        try {
            await District.deleteOne({_id: district._id});
            return new SuccessMessage({name: district.name, message: "Successfully deleted", pid: district.pid})
        } catch (error) {
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

    static async deleteManyDistrict({cityID}) {
        try {
            await District.collection.deleteMany({cityID: cityID});
            return new SuccessMessage({name: "Districts", message: "Successfully deleted", pid: cityID})
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

    static async createDistrictWithList({districtNameList, cityID}) {
        let city = await CityService.getCity({pid: cityID});
        let districtList = districtNameList.map(district => ({name: district, pid: uuid(), cityID: city._id}));
        await this.isDistrictExist({cityID: city.pid, districtNameList: districtNameList});
        // let session = await District.startSession();
        // session.startTransaction();
        // const opts = {session};
        try {
            await District.collection.insertMany(districtList,);
            // await session.commitTransaction();
            // session.endSession();
            return new SuccessMessage({name: "District List", message: "Successfully created"})
        } catch (error) {
            console.log(error)
            // await session.abortTransaction();
            // session.endSession();
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

    static async isDistrictExist({districtNameList, cityID}) {

        try {
            let districtList = await District.find({name: {$in: districtNameList}})
            if(districtList.length>0){
                throw new ValidationError({
                    detail: "District name already exist in this city",
                    detailKey: "errors.alreadyExist.district",
                    metadata: {
                        cityID: cityID,
                        districtNameList: districtNameList
                    }
                })
            }
        } catch (error) {
            console.log(error);
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    districtNameList: districtNameList,
                    error: error
                }
            })
        }
    }

    static async getCityDistrictList({cityID}) {
        let city = await CityService.getCity({pid: cityID});

        try {
            return await District.find({cityID: city._id});
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

module.exports = DistrictService