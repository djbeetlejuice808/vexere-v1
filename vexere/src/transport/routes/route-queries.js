const Route = require('./route-model')

exports.findAll = async () => {
    try {
        return await Route.find()
                            .populate({
                                path: 'transportId',
                                model: 'Transport',
                                populate : {
                                    path : 'images',
                                    model: 'Image'
                                }
                            })
                            .populate({
                                path: 'departureLocation',
                                model: 'Province'
                            })
                            .populate({
                                path: 'destination',
                                model: 'Province'
                            })
                            
    }catch(error){
        console.log(error)
        throw "[ROUTE]-Query: Cannot find all routes !"
    }
}
exports.findOne = async () => {

}
exports.findById = async (id) => {
    try {
        return await Route.findById({_id: id})
                            .populate({
                                path: 'departureLocation',
                                model: 'Province'
                            })
                            .populate({
                                path: 'destination',
                                model: 'Province'
                            })
    }catch(error){
        console.log(error)
        throw "[ROUTE]-Query: Cannot find by id route !"
    }
}
exports.findByTransportId = async (transportid) => {
    try {
        return await Route.findById(transportid)
    }catch(error){
        console.log(error)
        throw "[ROUTE]-Query: Cannot find by transportid in route !"
    }
}
exports.findByName = async (name) => {
    
}
exports.create = async (route) => {
    try {
        console.log("route"+route)
        const routeFromServer = new Route(route)
        return await routeFromServer.save()
    }catch(error){
        console.log(error)
        throw "[ROUTE]-Query: Cannot Create route !"
    }
}
exports.update = async (bookingMethod) => {

}
exports.delete = async (bookingMethod) => {
    
}
