const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Image'
    },
    status:{
        type: String,
        required: false,
        default: 'valid'
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

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
