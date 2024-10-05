const TransportType = require('./transport-type-model');

exports.findAll = async () => {
    try {
        const transportTypes = await TransportType.find();
        return transportTypes;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.findOne = async (criteria) => {
    try {
        const transportType = await TransportType.findOne(criteria);
        return transportType;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.findById = async (id) => {
    try {
        const transportType = await TransportType.findById(id);
        return transportType;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.findByName = async (name) => {
    try {
        const transportType = await TransportType.findOne({ type: name });
        return transportType;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.create = async (transportTypeData) => {
    try {
        const transportType = new TransportType(transportTypeData);
        const savedTransportType = await transportType.save();
        return savedTransportType;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

exports.update = async (id, updateContent) => {
    try {
        const updatedTransportType = await TransportType.findByIdAndUpdate(
            id,
            { $set: updateContent },
            { new: true }
        );
        return updatedTransportType;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Delete a transport type
exports.delete = async (id) => {
    try {
        await TransportType.findByIdAndUpdate(id, { $set: { deletedAt: new Date() } });
        return { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
