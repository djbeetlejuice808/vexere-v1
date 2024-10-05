const transportStationQueries = require('./transport-station-queries');
const addressService = require('../address/address-service');
const mail = require('../Utils/mail');

exports.createTransportStation = async (userId, name, provinceId, districtId, wardId, addressDetail, email, telephone) => {
    try {
        const transportStationFromServer = await transportStationQueries.findByEmail(email);
        if (!transportStationFromServer) {
            let address;
            try {
                address = await addressService.createAddress(userId, provinceId, districtId, wardId);
            } catch (error) {
                console.error(error);
                throw new Error("Cannot create address!");
            }
            const transportStation = await transportStationQueries.createTransportStation({
                name: name,
                address: address._id,
                addressDetail: addressDetail,
                email: email,
                telephone: telephone,
            });

            return await transportStation.save();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.registerTransportStation = async (name, provincesCode, districtCode, wardCode, addressDetail, email, telephone) => {
    try {
        let address = await addressService.createAddress(provincesCode, districtCode, wardCode);
        console.log(address)
        let transportStation = await transportStationQueries.createTransportStation({
            name: name,
            address: address._id,
            addressDetail: addressDetail,
            email: email,
            telephone: telephone
        });
        let mailFromClient = email;
        await mail.sendEmail(mailFromClient, "Vui lòng xác nhận thông tin !", transportStation._id,false,null,null);
        return transportStation;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.findById = async (transportStationId) => {
    try {
        let transportStation = await transportStationQueries.findById(transportStationId);
        if (!transportStation) {
            throw new Error("Service Transport: Cannot find By id");
        }
        return transportStation;
    } catch (error) {
        throw error;
    }
};
