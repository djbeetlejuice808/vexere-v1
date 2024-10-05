const mongoose = require('mongoose');

const bookingMethodSchema = new mongoose.Schema({
    method:{
        type:String,
        required: false,
        enum: [ 'Gọi để xác nhận',
                'Không hỗ trợ chọn trước ghế',
                'Hỗ trợ chọn trước ghế'
                ],
        default: "Gọi để xác nhận"
    },
    status:{
        type: String,
        required: false
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

const BookingMethod = mongoose.model('BookingMethod', bookingMethodSchema);
module.exports = BookingMethod;
