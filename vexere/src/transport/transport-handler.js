const transportService = require('./transport-service')

exports.createTransport= async (req, res, next) => {
    const {transportStationId, name, seats, transportTypeId, brandId} = req.body
    try {
        const imagesFromClient = req.processedFiles
        const transportSaved = await transportService.createTransport(
                                                        transportStationId
                                                    ,   name
                                                    ,   imagesFromClient
                                                    ,   seats
                                                    ,   null
                                                    ,   transportTypeId
                                                    ,   brandId)
        return res.status(201).json({
            success: true,
            transport: transportSaved 
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


exports.findAll= async (req, res, next) => {
    try {
        const transports =  await transportService.findAll()
        return res.status(201).json({
            success: true,
            transport: transports 
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

exports.findById = async (req, res, next) => {
    try {
        const transports =  await transportService.findById(req.params.transportId)
        return res.status(201).json({
            success: true,
            transport: transports 
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const Transport = require('./transport-model')
const mongoose = require('mongoose');

exports.findAllTransportByTransportStation = async (req, res) => {
    try {
        let transports = await Transport.find({
            transportStationId: new mongoose.Types.ObjectId(req.params.transportStationId)
        })
        .populate({
            path: 'transportStationId',
            model: 'TransportStation'  // Đảm bảo tên model chính xác
        })
        .select('');

        return res.status(200).json({
            success: true,
            transports
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
