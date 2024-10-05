const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    purpose: {
        type: String,
        unique: true,
        required: true
    },
    image_preview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        unique: true,
        required: true
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

const License = mongoose.model('License', licenseSchema);
module.exports = License;
