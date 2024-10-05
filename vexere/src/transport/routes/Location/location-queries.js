const Location = require('./location-model'); 

const createLocation = async (data) => {
    try {
        const location = new Location(data);
        await location.save();
        return location;
    } catch (error) {
        throw new Error(`Unable to create location: ${error.message}`);
    }
};

// Get a location by ID
const getLocationById = async (id) => {
    try {
        const location = await Location.findById(id).exec();
        if (!location) {
            throw new Error('Location not found');
        }
        return location;
    } catch (error) {
        throw new Error(`Unable to get location: ${error.message}`);
    }
};

// Update a location by ID
const updateLocation = async (id, data) => {
    try {
        const location = await Location.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!location) {
            throw new Error('Location not found');
        }
        return location;
    } catch (error) {
        throw new Error(`Unable to update location: ${error.message}`);
    }
};

// Delete a location by ID
const deleteLocation = async (id) => {
    try {
        const location = await Location.findByIdAndDelete(id).exec();
        if (!location) {
            throw new Error('Location not found');
        }
        return location;
    } catch (error) {
        throw new Error(`Unable to delete location: ${error.message}`);
    }
};

// Get all locations
const getAllLocations = async () => {
    try {
        const locations = await Location.find().exec();
        return locations;
    } catch (error) {
        throw new Error(`Unable to get locations: ${error.message}`);
    }
};



module.exports = {
    createLocation,
    getLocationById,
    updateLocation,
    deleteLocation,
    getAllLocations
};
