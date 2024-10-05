const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required']
    },
    password: {
        salt: {
            type: String,
            required: true
        },
        hash: {
            type: String,
            required: true
        },
        iterations: {
            type: Number,
            required: true
        }
    },
    tokens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Token'
    }],
    refreshTokens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Token'
    }],
    role: { 
        type: String, 
        enum: ['user', 'admin', 'transport-station'], 
        default: 'user' 
    }
});

const User = mongoose.model('User', userSchema);

module.exports =  User ;
