const express = require('express');
const handler = require('./brand-handler');
const router = express.Router();
const { upload, 
        injectSVG,  
        } = require('../../image/utils/image-upload'); 
// const auth = require('../user/middleware/user-auth')
module.exports = () => {
        router
        .get('/:transportId',handler.findById)
        .get('/',handler.findAll)
        .post('/create',
                upload.array('images', 20), 
                injectSVG,
                handler.create)
        .post('/:brandId',
                upload.array('images', 20), 
                injectSVG,
                handler.update)
                
        return router;
};