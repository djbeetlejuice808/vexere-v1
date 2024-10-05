const express = require('express');
const handler = require('./user-handlers');
const router = express.Router();
const { authentication, authorize } = require('./middleware/user-auth');

require('dotenv').config();



module.exports = () => {
    router
    .post('/signin',handler.signin)
    .get('/',authentication,authorize(['admin']), handler.getAllUser)
    .get('/:userId',authentication, authorize(['user', 'admin', 'transport-station']),handler.getById) 
    .post('/signup', handler.signup)
    .post('/refresh', handler.refresh)
    return router;
};


