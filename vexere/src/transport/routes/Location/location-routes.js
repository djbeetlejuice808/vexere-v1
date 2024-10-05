const express = require('express');
const handler = require('./location-handler');
const router = express.Router();

module.exports = () => {
        router
        .get('/', 
                handler.getAll)  
        .get('/:routeId', 
        handler.getLocationByRouteId) 
        .post('/', 
        handler.createLocation)        
        return router;
};

