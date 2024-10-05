const mongoose = require('mongoose');

const transportStationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: new mongoose.Types.ObjectId('569ed8269353e9f4c51617aa')
    },  
    name: {
        type: String,
        required: false
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    addressDetail: {
        type: String
    },
    email: {
        type: String,
        unique: false,
        required: true
    },
    telephone: {
        type: String,
        unique: false,
        required: true
    },
    images:[{
        type: mongoose.Schema.Types.ObjectId,
        require: false
    }],
    status:{
        type: String, 
        enum: ['pass','not-pass','in-process','start'],
        default: 'start'
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

const TransportStation = mongoose.model('TransportStation', transportStationSchema);
module.exports = TransportStation;
