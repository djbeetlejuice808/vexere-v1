const express = require('express');
const handler = require('./booking-method-handler');

const router = express.Router();

module.exports = () => {
    router
    .get('/init', handler.createBookingMethod) 
    .get('/', handler.getall) 
    return router;
};