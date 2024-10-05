const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number
    },
    routeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity:{
        type: Number
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;


// Lấy tổng số ghế của transport 
// Lấy tổng seat to buy của transportStationMethod

// Hiện ra số ghế còn trống
// Làm sao để biết số ghế còn trống

// 