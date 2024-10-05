const mongoose = require('mongoose');

const transportTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        require: false,
    },
    status:{
        type: String,
        require: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    deletedAt: {
        type: Date
    }
});

const TransportType = mongoose.model('TransportType', transportTypeSchema);
module.exports = TransportType;
