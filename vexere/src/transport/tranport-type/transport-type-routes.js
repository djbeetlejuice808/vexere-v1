const express = require('express');
const handler = require('./transprort-type-handler');
const router = express.Router();

module.exports = () => {
    router
        .get('/', handler.findAll) .post('/findOne', handler.findOne)
        .get('/:transportId', handler.findById) 
        .get('/name/:name', handler.findByName) 
        .post('/', handler.create) 
        .put('/:transportId', handler.update) 
        .delete('/delete/:transportId', handler.delete); 
    return router;
};
