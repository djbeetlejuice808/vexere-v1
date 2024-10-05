const Ccm = require('./company-certificates-model')


exports.createLicenseCMM = async (ccm) => {
    try {
        const newCcm = new Ccm(ccm);
        return await newCcm.save();
    } catch (error) {
        console.error(error);
        throw "Query: Cannot create Ccm.";
    }
}



exports.getAll = async () => {
    try {
        
        return await Ccm.find()
                        .populate({
                            path: 'transport_station_id',
                            model: 'TransportStation',
                            select: '_id'
                        })
                        .populate({
                            path: 'licenses_id',
                            model: 'License',
                            select: ''
                        })
                        .populate({
                            path: 'imageId',
                            model: 'Image',
                            select: ''
                        })
    } catch (error) {
        console.error(error);
        throw "Query: Cannot find Ccm.";
    }
}

exports.getOne = async (transportStationId,licenseId,imageId) => {
    try {
        const ccm = await Ccm.findOne({
                        transport_station_id:  transportStationId,
                        licenses_id: licenseId,
                        imageId: imageId
                        })
                        .populate({
                            path: 'transport_station_id',
                            model: 'TransportStation',
                            select: '_id'
                        })
                        .populate({
                            path: 'licenses_id',
                            model: 'License',
                            select: ''
                        })
                        .populate({
                            path: 'imageId',
                            model: 'Image',
                            select: ''
                        })
        return ccm
    }catch(error){
        console.error(error)
        throw "Query: Cannot find one License."    
    }
}