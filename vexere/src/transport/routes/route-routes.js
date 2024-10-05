const express = require('express');
const handler = require('./route-handler');
const router = express.Router();

module.exports = () => {
        router
        .post('/createRoutes', 
                handler.createRoute)  
        .get('/routes', 
                handler.getAll) 
                .get('/', 
                handler.getAll) 
        .get('/transport/:transportId', handler.findRoutesByTransport)
        .get('/search', handler.searchByCriteria);        
        return router;
};