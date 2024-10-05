const transportQuery= require('./transport-queries')
const imageService = require('../image/image-service')
const bookingMethodService = require('./booking-method/booking-method-service')
const transportBookingMethodService = require('./booking-method/transport-booking-method/transport-booking-method-service')
const mongoose = require('mongoose');

exports.createTransport= async (transportStationId,name,images,seats,bookingMethodId,transportTypeId,brandId) => {
    try {
        const imagesProcess = Object.values(images)
                .filter(filePath => filePath.endsWith('.jpg') || filePath.endsWith('.png'))
                .map(filePath => ({
                    filename: filePath.replace('C:\\images\\', ''),
                    path: `${filePath}`,
                }));
        let imagesFromServer = await imageService.createImages(imagesProcess);

        let transport = {
            transportStationId: new mongoose.Types.ObjectId(transportStationId),
            name: name,
            seats: seats,
            brandId: brandId,
            transportTypeId: transportTypeId,
        }
        const transportSaved = await transportQuery.create(transport)
        imagesFromServer.map(image => {
            transportSaved.images.push(image._id)
        })
        await transportQuery.create(transportSaved)

        let someThing = await transportBookingMethodService.create(transportSaved._id,bookingMethodId)
        return transportSaved
    }catch(error){
        console.log(error)
    }
}


exports.findAll= async () => {
    try {
        return await transportQuery.findAll()
    }catch(error){
        console.log(error)
    }
}

exports.findById = async (id) => {
    try {
        return await transportQuery.findById(id)
    }catch(error){
        console.log(error)
    }
}