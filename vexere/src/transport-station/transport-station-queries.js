const TransportStation = require('./transport-station-model')


exports.createTransportStation = (transportStation) => {
    try {
        const transportStationSaved = new TransportStation(transportStation)
        return transportStationSaved.save()
    }catch(error){
        console.log(error)
        throw "Cannot create Transport Station"
    }
}

exports.findByEmail = (email) => {
    try {
        const transportStation = TransportStation.findOne({email: email})
        return transportStation != null ? transportStation : null 
    }catch(error){
        console.log(error)
        throw ""
    }
}




exports.findById= (id) => {
    try {
        const transportStation = TransportStation.findOne({_id: id})
                                                    .populate({
                                                            path: 'address',
                                                            model: 'Address'
                                                    })
        return transportStation != null ? transportStation : null 
    }catch(error){
        console.log(error)
        throw "cannot find transport station by id"
    }
}

exports.updateUserIdInTransportStation = async (transportStationId, userId) => {
    try {
        const updatedStation = await TransportStation.findByIdAndUpdate(
            transportStationId,
            { userId: userId },
            { new: true } 
        )
        return updatedStation != null ? updatedStation : null
    } catch (error) {
        console.log(error)
        throw "Cannot update user ID in transport station"
    }
}
