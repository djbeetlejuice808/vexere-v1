const Brand = require('./brand-model')

exports.findAll = async () => {
    try {
        return await Brand.find()
                            .populate({
                                path: "image",
                                model: "Image"
                            })
    }catch(error){
        console.log(error)
    }
}
exports.findOne = async (Brand) => {
    try {
        return await Brand.findOne({})
                            .populate({
                                path: "image",
                                model: "Image"
                            })
    }catch(error){
        console.log(error)
    }
}
exports.findById = async (id) => {
    try {
        return await Brand.findById(id)
                            .populate({
                                path: "image",
                                model: "Image"
                            })
    }catch(error){
        console.log(error)
    }
}
exports.findByName = async (name) => {
    try {
        return await Brand.findOne({name: name})
                            .populate({
                                path: "image",
                                model: "Image"
                            })
    }catch(error){
        console.log(error)
    }
}
exports.findByQuery = async (query) => {
    try {
        return await Brand.findOne({name: query})
                            .populate({
                                path: "image",
                                model: "Image"
                            })
    }catch(error){
        console.log(error)
    }
}
exports.create = async (brand) => {
    try {
        const brandFromServer = new Brand(brand)
        return await brandFromServer.save()
    }catch(error){
        console.log(error)
    }
}
exports.update = async (id, updateContent) => {
    try{
        const brandFromServer = await Brand.findByIdAndUpdate(
            { _id: id },
            { $set: updateContent },
            { new: true }
        )
        return  brandFromServer
    }catch(error){
        console.log(error)
    }
}
exports.delete = (brand) => {
    
}
