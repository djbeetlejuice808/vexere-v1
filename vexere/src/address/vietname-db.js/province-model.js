// province.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const District = require('./district-model'); // Import District model if needed

const ProvinceSchema = new Schema({
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
    AdministrativeUnitId: Number,
    AdministrativeRegionId: Number,
    District: [{ type: Schema.Types.ObjectId, ref: 'District' }] 
});

const Province = mongoose.model('Province', ProvinceSchema);

module.exports = Province;
