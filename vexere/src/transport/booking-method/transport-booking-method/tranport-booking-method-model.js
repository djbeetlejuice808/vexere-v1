const mongoose = require('mongoose');

const TransportBookingMethodSchema = new mongoose.Schema({
    transportId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    bookingMethodId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seatId:{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    seatToBuy:{
        type: Number,
        required: false,
        default: 0
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



const TransportBookingMethod = mongoose.model('TransportBookingMethod', TransportBookingMethodSchema);
module.exports = TransportBookingMethod;
