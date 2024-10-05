const mongoose = require('mongoose');

const companyCertificatesSchema = new mongoose.Schema({
    transport_station_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TransportStation',
        required: true
    },
    licenses_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'License',
        required: true
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
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

const CompanyCertificates = mongoose.model('CompanyCertificates', companyCertificatesSchema);
module.exports = CompanyCertificates;
