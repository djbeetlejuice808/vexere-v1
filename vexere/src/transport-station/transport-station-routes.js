const express = require('express');
const handler = require('./transport-station-handler');

const { upload, 
        injectSVG,  
        } = require('../image/utils/image-upload'); 
const auth = require('../user/middleware/user-auth')
const router = express.Router();

module.exports = () => {
        router
        .post('/register',handler.registerTransportStation) // user
        .get('/confirmInformation/:transportStationId',handler.processConfirm) // admin
        .post('/allDone/:transportStationId', 
                upload.array('images', 4), 
                injectSVG,
                handler.finshedProcessRegister) // transport-station
        return router;
};