// ward.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WardSchema = new Schema({
    Type: {
        type:String,
        unique: false
    },
    Code: {
        type:String,
        unique: true
    },
    Name: {
        type:String,
        unique: false
    },
    NameEn: {
        type:String,
        unique: false
    },
    FullName: {
        type:String,
        unique: false
    },
    FullNameEn: {
        type:String,
        unique: false
    },
    CodeName: {
        type:String,
        unique: false
    },
    DistrictCode: {
        type:String,
        unique: false
    },
    AdministrativeUnitId: Number
});

const Ward = mongoose.model('Ward', WardSchema);

module.exports = Ward;
