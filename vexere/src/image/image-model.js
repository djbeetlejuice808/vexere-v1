let  mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        require: false,
    },
    path: {
        type: String,
        require: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
    deleteAt: {
        type: Date
    }
});


const Image = mongoose.model('Image', imageSchema);
module.exports = Image  

