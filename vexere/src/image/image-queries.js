const Image = require('./image-model')


exports.createImage = async (image) => {
    try {
        const imageSaved = new Image(image);
        return await imageSaved.save();
    }catch(error){
        console.error(error)
        throw "Query: Cannot create Image"
    }
}
exports.updateImage = async (fileId, fileContent) => {
    try {
        const imageFromServer = await Image.findOneAndUpdate(
            {_id: fileId},
            {$set: fileContent},
            {new: true}
        )
        console.log(imageFromServer)
        return imageFromServer
    }catch(error){
        console.error(error)
        throw "Query: Cannot update Image"
    }
}
// exports.findImageByName = async (filename) => {
//     try {
//         const imageFromServer = find
//     }catch(error){
//         console.error(error)
//         throw "Query: Cannot find Image by filename"
//     }
// }

exports.getAll = async () => {
    try {
        return await Image.find()
    }catch(error){
        console.error(error)
        throw "Query: Cannot get Image by Id"
    }
}

exports.getById = async (id) => {
    try {
        const imageId = id;
        return await Image.findById({_id: id})
    }catch(error){
        console.error(error)
        throw "Query: Cannot get Image by Id"
    }
}