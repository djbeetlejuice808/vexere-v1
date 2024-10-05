const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    routeId:{
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        unique: false,
        ref: 'Route'
    },
    pickUpPoint:{
        type: String,
        require: true,
    },
    pickUpPointTime:{
        type: Date,
        require: true,
    },
    dropOffPoint:{
        type: String,
        require: true,
    },
    dropOffPointTime:{
        type: Date,
        require: true,
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

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
