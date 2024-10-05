const TransportBookingMethod = require('./tranport-booking-method-model')

exports.findAll = async () => {
    try {
        return await TransportBookingMethod.find()
                        .populate({
                                    path: "transportId",
                                    model: "Transport"
                                })
                        .populate({
                                    path: "bookingMethodId",
                                    model: "BookingMethod"                
                                })                                           
    }catch(error){
        console.log(error)
        throw "[TRANSPORT-BOOKING-METHOD]-Query: Cannot find all transport booking method !"
    }
}
exports.findOne = async (qu) => {
    try {

    }catch(error){

    }
}
exports.findTransportIdInTransportBookingMethod= async (id) => {
    try {
        return await TransportBookingMethod.findOne({
            transportId: id
        })
    }catch(error){
        console.log(error)
        throw "[TRANSPORT-BOOKING-METHOD]-Query: Cannot find TransportId In Transport Booking Method method !"
    }
}
exports.findById = async (id) => {
    try {
        return await TransportBookingMethod.findById(id)
    }catch(error){
        console.log(error)
        throw "[TRANSPORT-BOOKING-METHOD]-Query: Cannot find by id transport booking method !"

    }
}
exports.findByName = async (name) => {
    try {

    }catch(error){

    }
}
exports.create = async (transportBookingMethod) => {
    try {
        const transportBookingMethodSaved = new TransportBookingMethod(transportBookingMethod)
        return await transportBookingMethodSaved.save()
    }catch(error){
        console.log(error)
        throw "[TRANSPORT-BOOKING-METHOD]-Query: Cannot create transport booking method !"
    }
}
exports.update = async () => {
    try {
    }catch(error){

    }
}
exports.delete = async (Brand) => {
    try {

    }catch(error){

    }
}

exports.getTransportMethodBookingByTransportId = (transportId) => {
    try {
        return TransportBookingMethod.findById()
    }catch(error){

    }
}