const express = require('express');
const handler = require('./order-handler');

const router = express.Router();

module.exports = () => {
    router
    .post('/', handler.createOrder) 
    .get('/:id', handler.getOrderById) 
    .get('/', handler.getAll) 
    return router;
};