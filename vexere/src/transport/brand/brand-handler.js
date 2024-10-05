const brandQuery = require('./brand-queries')
const brandService = require('./brand-service')
const imageService = require('../../image/image-service')

exports.create = async (req, res, next) => {
    try {
        const { name, status} = req.body;
        let imageProcess =  req.processedFiles
                            .map(filePath => ({
                                filename: filePath.replace('C:\\images\\', ''),
                                path: `${filePath}`,
                            }));
        const imageSaved = await imageService.createImage(imageProcess[0].filename,imageProcess[0].path)    
        const brand = {
            name: name,
            image: imageSaved._id
        }                
        const brandSaved = await brandQuery.create(brand)

        res.status(200).json({
            success: true,
            brand: brandSaved
        })
    }catch(error){
        console.error(error)
        res.status(200).json({
            success: false,
            message: error.name
        })
    }
}
exports.update = async (req, res, next) => {
    try {
        const brandId = req.params.brandId;
        const {name, status} = req.body;
        const imageFromClient = req.processedFiles
        let brandExitsFromServer = await brandQuery.findById(brandId)
        console.log(brandExitsFromServer.image._id)
        if (!brandExitsFromServer){
            res.status(200).json({
            success: false,
            message: "Cannot find brand by id"
        })
        }
        let imageProcess = imageFromClient
                            .map(image => ({
                                filename: image.replace('C:\\images\\', ''),
                                path: `${image}`
                            }))
        await imageService.updateImage(
                brandExitsFromServer.image._id,
                imageProcess[0].filename,
                imageProcess[0].path
            )
        let updateContent = {
            name,
            status,
        }
        const brandFromServer = await brandQuery.update(brandId, updateContent)

        res.status(200).json({
            success: true,
            brand: await brandQuery.findById(brandFromServer._id)
        })
    }catch(error){
        console.error(error)
        res.status(200).json({
            success: false,
            message: error.name
        })
    }
}

exports.findById = async (req, res, next) => {
    try {
        const brandId = req.params.transportId
        const brandFromServer = await brandQuery.findById(brandId)

        res.status(200).json({
            success: true,
            brand: brandFromServer
        })
    }catch(error){
        console.error(error)
        res.status(200).json({
            success: false,
            message: error.name
        })
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const brandFromServer = await brandQuery.findAll()

        res.status(200).json({
            success: true,
            brand: brandFromServer
        })
    }catch(error){
        console.error(error)
        res.status(200).json({
            success: false,
            message: error.name
        })
    }
}

exports.findQuery = async (req, res, next) => {
    try {
        const brandFromServer = await brandQuery.findByQuery()

        res.status(200).json({
            success: true,
            brand: brandFromServer
        })
    }catch(error){
        console.error(error)
        res.status(200).json({
            success: false,
            message: error.name
        })
    }
}