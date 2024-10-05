const transportService = require('./transport-station-service')
const transportQuery = require('./transport-station-queries')
const addressQuery = require('../address/address-queries')
const ccmQuery = require('./license/company-certificates/ccm-queries')
const imageService = require('../image/image-service')
const Joi = require('joi');
const licenseService = require('./license/license-service')
const userService = require('../user/user-service')
const utils = require('../Utils/Random')
const mail = require('../Utils/mail');

const registerTransportStationSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Tên không được để trống.',
        'any.required': 'Tên là bắt buộc.',
    }),
    provinceId: Joi.string().required().messages({
        'string.empty': 'Mã tỉnh không được để trống.',
        'any.required': 'Mã tỉnh là bắt buộc.',
    }),
    districtId: Joi.string().required().messages({
        'string.empty': 'Mã huyện không được để trống.',
        'any.required': 'Mã huyện là bắt buộc.',
    }),
    wardId: Joi.string().required().messages({
        'string.empty': 'Mã xã không được để trống.',
        'any.required': 'Mã xã là bắt buộc.',
    }),
    addressDetail: Joi.string().required().messages({
        'string.empty': 'Địa chỉ chi tiết không được để trống.',
        'any.required': 'Địa chỉ chi tiết là bắt buộc.',
    }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
        .required()
        .messages({
            'string.email': 'Email phải là một địa chỉ email hợp lệ.',
            'string.pattern.base': 'Email phải thuộc miền gmail.com.',
            'string.empty': 'Email không được để trống.',
            'any.required': 'Email là bắt buộc.',
        }),
    telephone: Joi.string()
        .regex(/^(?:\+?84|0)?[1-9]\d{8}$/)
        .required()
        .messages({
            'string.pattern.base': 'Số điện thoại phải thuộc định dạng của Việt Nam.',
            'string.empty': 'Số điện thoại không được để trống.',
            'any.required': 'Số điện thoại là bắt buộc.',
        }),
});


exports.registerTransportStation = async (req, res, next) => {
    try {
        const { error, value } = registerTransportStationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                error: error.details,
            });
        }

        const { name, 
                provinceId, 
                districtId, 
                wardId, 
                addressDetail, 
                email, 
                telephone } = value;
            
        const transportStation = await transportService.registerTransportStation(name, 
            provinceId, 
            districtId, 
            wardId, 
            addressDetail, 
            email, 
            telephone);
        console.log(transportStation)
        if (!transportStation) 
            res.status(201).json({
            message: 'Transport station registered failure, please try again !'
            })
        
        res.status(201).json({
            message: 'Transport station registered successfully, please check your email for confirm !'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

exports.finshedProcessRegister = async (req, res, next) => {
    try {
        const transportStationId = req.params.transportStationId;
        
        let transportStationFromServer;
        try {
            transportStationFromServer = await transportService.findById(transportStationId);
            if (!transportStationFromServer) {
                return res.status(404).json({
                    message: 'Transport station not found',
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Error finding transport station',
                error: error.message,
            });
        }

        let userSaved;
        
            let user = {
                username: utils.generateRandomString(10),
                password: utils.generateRandomString(10)
            }
            userSaved = await userService.createUser(user.username, user.password);
            await userService.findUserByIdAndUpdate(userSaved._id,'transport-station', transportStationFromServer._id)
        
        try {
            await transportQuery.updateUserIdInTransportStation(transportStationFromServer.id, userSaved._id);

            await addressQuery.updateUserIdInAddress(transportStationFromServer.address._id, userSaved._id);
        } catch (error) {
            return res.status(500).json({
                message: 'Error updating user ID in transport station or address',
                error: error.message,
            });
        }

        let imageFromServer;
        try {
            const images = Object.values(req.processedFiles)
                .filter(filePath => filePath.endsWith('.jpg') || filePath.endsWith('.png'))
                .map(filePath => ({
                    filename: filePath,
                    path: `${filePath}`,
                }));
            imageFromServer = await imageService.createImages(images);
        } catch (error) {
            return res.status(500).json({
                message: 'Error creating images',
                error: error.message,
            });
        }

        let licenses;
        try {
            licenses = await licenseService.getAll();
        } catch (error) {
            return res.status(500).json({
                message: 'Error retrieving licenses',
                error: error.message,
            });
        }

        try {
            await Promise.all(imageFromServer.map(async (image, index) => {
                const license = licenses[index % licenses.length];
                const ccm = {
                    transport_station_id: transportStationFromServer._id,
                    licenses_id: license._id,
                    imageId: image.id,
                };

                const ccmExists = await ccmQuery.getOne(transportStationFromServer._id, license._id, image.id);
                if (!ccmExists) {
                    await ccmQuery.createLicenseCMM(ccm);
                }
            }));
        } catch (error) {
            return res.status(500).json({
                message: 'Error creating license CMM',
                error: error.message,
            });
        }        
        await mail.sendEmail(transportStationFromServer.email,"This is your account !",transportStationFromServer._id, true,userSaved.username,user.password);
        return res.status(200).json({
            message: "Bạn đã đăng ký thành công ! Vui lòng kiểm tra email đã đăng ký để nhận Tài khoản và mật khẩu"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

exports.processConfirm = async (req, res, next) => {
    let transportStationId = req.params.transportStationId;
    try {
        let transportStationFromServer = await transportService.findById(transportStationId);
        let licensesFromServer = await licenseService.getAll()
        return res.status(200).json({
            transport: transportStationFromServer,
            licenses: licensesFromServer
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

