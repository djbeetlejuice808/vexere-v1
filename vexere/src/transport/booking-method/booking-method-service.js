const bookingMethod = require('./booking-method-queries')

exports.create = async (method) => {
    try {
        return await bookingMethod.create(method)
    }catch(error){
        console.log(error)
        throw "[BOOKING METHOD]-Service: Cannot Create booking Method !"
    }
}

exports.findById = async (id) => {
    try {
        return await bookingMethod.findById(id)
    }catch(error){
        console.log(error)
        throw "[BOOKING METHOD]-Service: Cannot find by id booking Method !"
    }
}

exports.findByAll= async () => {
    try {
        return await bookingMethod.findAll()
    }catch(error){
        console.log(error)
        throw "[BOOKING METHOD]-Service: Cannot find by all booking Method !"
    }
}