const addressQueries = require('./address-queries')
const Province = require('./vietname-db.js/province-model'); 
const District = require('./vietname-db.js/district-model');
const Ward = require('./vietname-db.js/ward-model');

exports.createAddress = (provinceId, districtId, wardId) => {
    try {
        const address = addressQueries.createAddress(provinceId, districtId, wardId)
        return address != null ? address : null
    }catch (error){
        console.log(error)
        throw "Cannot create address !"
    }
}

exports.getProvinceByCode = async (provinceId) => {
    try {
        const province = await Province.findOne({_id: provinceId})
        return province
    } catch (err) {
        console.error('Error fetching provinces:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};