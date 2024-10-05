const express = require('express');
const handler = require('./address-handlers');
const router  = express.Router();

module.exports =  () => {
    router
    .get('/init', handler.initAddress)
    .get('/provinces', handler.getAllProvince)
    .get('/provinces/:provinceCode',handler.getProvinceByCode)
    .get('/districts/:provinceCode', handler.getDistrictsByProvince) 
    .get('/wards/:districtCode', handler.getWardByDistrict) 
    return router;
};


