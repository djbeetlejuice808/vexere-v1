const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    provinceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Province',
        required: true
    },
    districtId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true
    },
    wardId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ward',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: new mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date
    },
    delete_at: {
        type: Date
    }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
