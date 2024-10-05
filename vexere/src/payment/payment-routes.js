const express = require('express');
const handler = require('./payment-hander');

const router = express.Router();

module.exports = () => {
    router
    .post('/create-payment-link', handler.createPayment) 
    .get('/thanhtoanthanhcong/:orderId', handler.getSuccessPayment)
    return router;
};