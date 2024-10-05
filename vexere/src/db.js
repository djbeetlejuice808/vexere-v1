const mongoose = require('mongoose');
const { logger } = require('./Utils/log/logger');
const { config } = require('./config');

async function connectDB() {
    try {
        await mongoose.connect(config.database.name);
        logger.info('MongoDB connected');
    } catch (err) {
        logger.error('MongoDB connection error:', err);
    }
}

module.exports = { connectDB };
