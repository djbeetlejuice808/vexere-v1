const express = require('express');
const handler = require('./transport-booking-method-handler');

const router = express.Router();

module.exports = () => {
    router
    .get('/', handler.getAll)
    .get('/getAllTransportByProvince', handler.getBookingMethodById) 
    .put('/', handler.update) 
    return router;
};