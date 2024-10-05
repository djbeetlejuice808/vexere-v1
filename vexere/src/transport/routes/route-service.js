const RouteQuery = require('./route-queries')
const TransportService = require('../transport-service')
const ProvinceService = require('../../address/address-service')
const mongoose = require('mongoose');

exports.findAll = async () => {
    try {
        
    }catch(error){
        console.log(error)
        throw "[ROUTE-METHOD]-Service: Cannot find all routes !"
    }
}
exports.findOne = async () => {

}
exports.findById = async (id) => {
    try {
        
    }catch(error){
        console.log(error)
        throw "[ROUTE-METHOD]-Service: Cannot find by id route !"
    }
}
exports.findByTransportId = async (id) => {
    try {
        return await RouteQuery.findByTransportId(id)
    }catch(error){
        console.log(error)
        throw "[ROUTE-METHOD]-Service: Cannot find by id route !"
    }
}
exports.findByName = async (name) => {

}
exports.create = async ( transportId, departureLocation, destination, departureDate, returnDate, pickUpPoint, pickUpPointTime, dropOffPoint, dropOffPointTime) => {
    try {

        // Chưa viết check xe đang trong chuyến thì chưa được tạo
        let transportIdFromClient = new mongoose.Types.ObjectId(transportId);
        let departureLocationFromlient = new mongoose.Types.ObjectId(departureLocation);
        let destinationFromClient = new mongoose.Types.ObjectId(destination);
        let departureDateFromClient = Date.parse(departureDate);
        let returnDateFromClient = Date.parse(returnDate);

        let transportFromSever = await TransportService.findById(transportIdFromClient)
        if (!transportFromSever) {
            console.log("[ROUTE]-Service: Cannot find transport in ROUTE !")
            return 
        }
        let departureLocationFromServer = await ProvinceService.getProvinceByCode(departureLocationFromlient)
        if(!departureLocationFromServer){
            console.log("[ROUTE]-Service: Cannot Find departureLocationFromServer!")
            return 
        }
        
        let destinationFromServer = await ProvinceService.getProvinceByCode(destinationFromClient)
        if(!destinationFromServer){
            console.log("[ROUTE]-Service: Cannot Find destinationFromServer!")
            return 
        }
        let route = {
            transportId: transportFromSever._id,
            departureLocation: departureLocationFromServer._id,
            destination: destinationFromServer._id,
            departureDate: departureDateFromClient,
            returnDate: returnDateFromClient,
            location: location
        }
        const routeSaved = await RouteQuery.create(route)
        return await RouteQuery.findById(routeSaved._id)
    }catch(error){
        console.log(error)
        throw "[ROUTE]-Service: Cannot Create route !"
    }
}
exports.update = async (bookingMethod) => {

}
exports.delete = async (bookingMethod) => {
    
}
