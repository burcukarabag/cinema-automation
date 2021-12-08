const Category = require('../models/Category');
var uuid = require('uuid').v4;

class CategoryService {

    static async getCategoryList() {
        try {
            return await Category.find();
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

    static async getCategory({pid, name, throwError=true}) {
        let category = await Category.findOne({
            ...(!!pid && {pid: pid}),
            ...(!!name && {name: name})
        });
        if (category) {
            return category
        } else {
            if(throwError){
                throw new NotFoundError({
                    detail: "Category not found",
                    detailKey: "errors.notFound.category",
                    metadata: {
                        categoryID: pid
                    }
                })
            }else{
                return null
            }
        }
    }

    static async createCategory({name}) {
        let category = await this.getCategory({name: name, throwError: false});
        if(!category){
            try {
                await Category.collection.insertOne({
                    name: name,
                    pid: uuid()
                });
                return new SuccessMessage({name: name, message: "Successfully created"})
            } catch (error) {
                console.log(error)
                throw new BusinessError({
                    detail: "An expected error during this operation",
                    detailKey: "errors.businessError",
                    metadata: {
                        categoryName: name,
                        error: error
                    }
                })
            }
        }else{
            throw new ValidationError({
                detail: "This category name already exist",
                detailKey: "errors.alreadyExist.category",
                metadata: {
                    name: name
                }
            })
        }

    }

    static async deleteCategory({categoryID}) {
        let category = await this.getCategory({pid: categoryID});
        try {
            await Category.deleteOne({_id: category._id});
            return new SuccessMessage({name: category.name, message: "Successfully deleted", pid: category.pid})
        } catch (error) {
            throw new BusinessError({
                detail: "An expected error during this operation",
                detailKey: "errors.businessError",
                metadata: {
                    categoryID: categoryID,
                    error: error
                }
            })
        }
    }

    static async getCityCinemaList({cityID}) {
        let city = await CityService.getCity({pid: cityID});

        try {
            return await Cinema.aggregate([
                {
                    '$lookup': {
                        'from': 'districts',
                        'localField': 'districtID',
                        'foreignField': '_id',
                        'as': 'districts'
                    }
                }, {
                    '$match': {
                        'districts.cityID': city._id
                    }
                }
            ])
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

    static async getDistrictCinemaList({districtID}) {
        let district = await DistrictService.getDistrict({pid: districtID});

        try {
            return await Cinema.find({districtID: district._id});
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

module.exports = CategoryService;