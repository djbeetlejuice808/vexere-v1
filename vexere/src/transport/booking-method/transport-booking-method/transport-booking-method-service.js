const TransportBookingMethodQuery = require('./transport-booking-method-queries')
const TransportService = require('../../transport-service')
const BookingMethodService = require('../booking-method-service')
const BookingMethodQueries = require('../booking-method-queries')

const mongoose = require('mongoose');
exports.create = async (transportId,bookingMethodId,seatId,seatToBuy) => {
    try {
        const transportFromTransportBookingMethod = await TransportBookingMethodQuery.findTransportIdInTransportBookingMethod(transportId);        
        if (transportFromTransportBookingMethod) return;
        let bookingMethodSaved;
        if (bookingMethodId === null) {
            bookingMethodSaved = await BookingMethodQueries.findOne('Gọi để xác nhận')
        }
        const bookingMethodFromServer = await BookingMethodService.findById(bookingMethodId);
        const newTransportBookingMethod = {
            transportId: new mongoose.Types.ObjectId(transportId),
            bookingMethodId: bookingMethodId === null ? bookingMethodSaved._id: bookingMethodFromServer._id,
            seatId: seatId ? new mongoose.Types.ObjectId(seatId) : null,
            seatToBuy: seatToBuy
        };

        return await TransportBookingMethodQuery.create(newTransportBookingMethod);
    }catch(error){
        console.log(error)
        throw "[TRANSPORT-BOOKING-METHOD]-Service: Cannot Create transport booking method !"
    }
}

exports.findById = async (id) => {
    try {
        return await TransportBookingMethodQuery.findById(id)
    }catch(error){
        console.log(error)
        throw "[TRANSPORT-BOOKING-METHOD]-Service: Cannot find by id transport booking method !"
    }
}

exports.findByAll= async () => {
    try {
        return await TransportBookingMethodQuery.findAll()
    }catch(error){
        console.log(error)
        throw "[TRANSPORT-BOOKING-METHOD]-Service: Cannot find all transport booking method !"
    }
}

// exports.update = async (transportId,bookingMethodId,seatId,seatToBuy) => {
//     try {
//         const transportFromServer = TransportService.findById(transportId)
//         const BookingService = BookingMethodService.findById(bookingMethodId)
        
//         return await TransportBookingMethodQuery.create(transportId,bookingMethodId,null,seat) 
//     }catch(error){
//         console.log(error)
//         throw "[TRANSPORT-BOOKING-METHOD]-Service: Cannot Create transport booking method !"
//     }
// }