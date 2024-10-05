const mongoose = require('mongoose');
const moment = require('moment');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    revoked: {
        type: Boolean,
        default: false
    },
    type:{
        type: String,
        enum: ['access', 'refresh'], 
        default: 'access'
    }
});

tokenSchema.virtual('formart-date').get(function() {
    return moment(this.createdAt).format('HH:mm DD/MM/YYYY');
});


tokenSchema.set('toJSON', { virtuals: true });
tokenSchema.set('toObject', { virtuals: true });
const Token = mongoose.model('Token', tokenSchema);
module.exports =  Token ;
