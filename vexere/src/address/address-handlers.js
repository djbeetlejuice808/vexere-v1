const fs = require('fs');
const Province = require('./vietname-db.js/province-model'); 
const District = require('./vietname-db.js/district-model');
const Ward = require('./vietname-db.js/ward-model');


exports.initAddress = async (req, res, next) => {
    const addressFilePath = 'src/address/vietname-db.js/crawl_data/mongo_data_vn_unit.json'
    const data = fs.readFileSync(addressFilePath);
    const addressData = JSON.parse(data);
    try{
        for (let provinceData of addressData) {
            // Service Address
            let province = await Province.create({
                Type: provinceData.Type,
                Code: provinceData.Code,
                Name: provinceData.Name,
                NameEn: provinceData.NameEn,
                FullName: provinceData.FullName,
                FullNameEn: provinceData.FullNameEn,
                CodeName: provinceData.CodeName,
                AdministrativeUnitId: provinceData.AdministrativeUnitId,
                AdministrativeRegionId: provinceData.AdministrativeRegionId
            });
            console.log(`Created province: ${province.Name}`);
            for (let districtData of provinceData.District) {
                districtData.ProvinceCode = province.Code; 
                let district = await District.create({
                    Type: districtData.Type,
                    Code: districtData.Code,
                    Name: districtData.Name,
                    NameEn: districtData.NameEn,
                    FullName: districtData.FullName,
                    FullNameEn: districtData.FullNameEn,
                    CodeName: districtData.CodeName,
                    ProvinceCode: districtData.ProvinceCode,
                    AdministrativeUnitId: districtData.AdministrativeUnitId
                });
                console.log(`Created district: ${district.Name} (${district.ProvinceCode})`);

                for (let wardData of districtData.Ward) {
                    wardData.DistrictCode = district.Code; 
                    let ward = await Ward.create({
                        Type: wardData.Type,
                        Code: wardData.Code,
                        Name: wardData.Name,
                        NameEn: wardData.NameEn,
                        FullName: wardData.FullName,
                        FullNameEn: wardData.FullNameEn,
                        CodeName: wardData.CodeName,
                        DistrictCode: wardData.DistrictCode,
                        AdministrativeUnitId: wardData.AdministrativeUnitId
                    });
                    console.log(`Created ward: ${ward.Name} (${ward.DistrictCode})`);
                }
            }
        }
        res.status(200).json({
            data: "Create Success Provinces, Districts, Wards"
        })
    }catch(err){
        console.error('Error Init Address', err);
        res.status(500).json({
            err: err.errorResponse.errmsg
        })
    }
}

exports.getAllProvince = async (req, res, next) => {
    try {
        const provinces = await Province.find()
        res.status(200).json(provinces);
    } catch (err) {
        console.error('Error fetching provinces:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProvinceByCode = async (req, res, next) => {
    const provinceCode = req.params.provinceCode
    try {
        const provinces = await Province.findOne({Code: provinceCode})
        res.status(200).json(provinces);
    } catch (err) {
        console.error('Error fetching provinces:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getDistrictsByProvince = async (req, res, next) => {
    const provinceCode = req.params.provinceCode;
    try {
        let districts = await District.find({ProvinceCode: provinceCode})
        res.status(200).json({
            districts: districts
        })
    }catch(err){
        res.status(401).json({
            error: err,
            districts: "Can't not find any District contraint your Province code !"
        })
    }
}

exports.getWardByDistrict = async (req, res, next) => {
    const districtCode = req.params.districtCode;
    try {
        let wards = await Ward.find({DistrictCode: districtCode})
        res.status(200).json({
            wards: wards
        })
    }catch(err){
        res.status(401).json({
            error: err,
            distrwardsicts: "Can't not find any ward contraint your District code !"
        })
    }
}