// district.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ward = require('./ward-model'); 

const DistrictSchema = new Schema({
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
    ProvinceCode: {
        type:String,
        unique: false
    },
    AdministrativeUnitId: Number,
    Ward: [{ type: Schema.Types.ObjectId, ref: 'Ward' }] 
});

const District = mongoose.model('District', DistrictSchema);

module.exports = District;
