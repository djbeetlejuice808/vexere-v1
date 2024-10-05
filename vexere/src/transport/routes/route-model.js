const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    transportId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        unique: false,
        ref: 'Transport'
    },
    price: {
        type: Number,
        require: true,
    },
    departureLocation:{ 
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Province'
    },
    destination:{ 
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Province'
    },
    departureDate:{
        type: Date,
        require: true,
    },
    returnDate:{ 
        type: Date,
        require: true,
    },
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }],
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

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;
