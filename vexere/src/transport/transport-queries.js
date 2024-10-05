const Transport = require('./transport-model')

exports.findAll = async () => {
    try {
        return await Transport.find({})
                                .select('_id name seats status images transportStationId brandId transportTypeId')
                                .populate({
                                    path: 'images',
                                    model: 'Image',
                                    select: 'filename path'
                                })
                                .populate({
                                    path: 'transportStationId',
                                    model: 'TransportStation',
                                    select: 'name address email telephone status'
                                })
                                .populate({
                                    path: 'brandId',
                                    model: 'Brand',
                                    select: 'name image'
                                })
                                .populate({
                                    path: 'transportTypeId',
                                    model: 'TransportType',
                                    select: '_id type'
                                });
    }catch(error){
        console.log(error)
    }
}
exports.findOne = async (Transport) => {
    try {
        return await Transport
                    .findOne({})
                    
    }catch(error){
        console.log(error)
    }
}
exports.findById = async (id) => {
    try {
        return await Transport
                    .findById({_id: id})
                    
    }catch(error){
        console.log(error)
    }
}
exports.findByName = async (name) => {

}
exports.create = async (transportFromService) => {
    try {
        const transport = new Transport(transportFromService);
        return await transport.save();
    }catch(error){
        console.log(error)
    }
}

exports.update = async (Brand) => {

}

exports.delete = async (Brand) => {
    
}
