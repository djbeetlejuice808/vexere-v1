const License = require('./license-model')

// exports.getById = async (id) => {
//     try {
//         const license = await License.findById(id)
//         return await license.save()
//     } catch (error) {
//         console.error(error)
//         throw "Query: Cannot create License."
//     }
// }

exports.getAll = async () => {
    try {
        const license = await License.find()
                        .populate({
                            path: 'image_preview',
                            model: 'Image',
                        })
        return license
    } catch (error) {
        console.error(error)
        throw "Query: Cannot create License."
    }
}

exports.getOne = async () => {
    try {
        const license = await License.findOne()
                        .populate({
                            path: 'image_preview',
                            model: 'Image',
                        })
        return license
    }catch(error){
        console.error(error)
        throw "Query: Cannot find one License."    
    }
}

exports.createLicense = async (license) => {
    try {
        const newLicense = new License(license);
        return await newLicense.save();
    } catch (error) {
        console.error(error);
        throw "Query: Cannot create License.";
    }
}


