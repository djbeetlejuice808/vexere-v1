const locationQuery = require('./location-queries')
const Location = require('./location-model'); 
const BookingTransportMethod = require('../../booking-method/transport-booking-method/tranport-booking-method-model')

exports.getAll = async (req, res) => {
    try {
        const locationFromServer = await locationQuery.getAllLocations()
        return res.status(200).json({
            success: true,
            message: locationFromServer
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Cant not find all Location !"
        })
    }
}

exports.createLocation = async (req, res, next) => {
    try {
        const { pickUpPoint, pickUpPointTime, dropOffPoint, dropOffPointTime } = req.body;
        
        const locationObject = new Location({
            routeId: null, // Tạm thời không có routeId
            pickUpPoint,
            pickUpPointTime,
            dropOffPoint,
            dropOffPointTime
        });

        const savedLocation = await locationObject.save();
        return res.status(201).json({
            success: true,
            message: 'Location temporarily created!',
            location: savedLocation
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getLocationByRouteId = async (req, res) => {
    try {
        const routeId = req.params.routeId
        const locationSaved = await Location.find({routeId: routeId})        
        return res.status(200).json({
            success: true,
            locations: locationSaved
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message
        });    
    }
}