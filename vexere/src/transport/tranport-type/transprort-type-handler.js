const transportQuery = require('./transport-type-queries');

exports.findAll = async (req, res, next) => {
    try {
        const transportTypes = await transportQuery.findAll();
        res.status(200).json({
            success: true,
            transportsType: transportTypes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const criteria = req.body; 
        const transportType = await transportQuery.findOne(criteria);
        res.status(200).json({
            success: true,
            transportsType: transportType
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.findById = async (req, res, next) => {
    try {
        const transportId = req.params.transportId;
        const transportType = await transportQuery.findById(transportId);
        res.status(200).json({
            success: true,
            transportsType: transportType
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.findByName = async (req, res, next) => {
    try {
        const name = req.params.name;
        const transportType = await transportQuery.findByName(name);
        res.status(200).json({
            success: true,
            transportsType: transportType
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.create = async (req, res, next) => {
    try {
        const transportTypeData = req.body;
        const newTransportType = await transportQuery.create(transportTypeData);
        res.status(201).json({
            success: true,
            transportsType: newTransportType
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        const transportId = req.params.transportId;
        const updateContent = req.body;
        const updatedTransportType = await transportQuery.update(transportId, updateContent);
        res.status(200).json({
            success: true,
            transportsType: updatedTransportType
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const transportId = req.params.transportId;
        await transportService.delete(transportId);
        res.status(200).json({
            success: true,
            transportsType: 'Transport type deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
