const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')
const { connectDB } = require('./db'); 
const { decode2String } = require('./Utils/log/logger-logo');
const { logger } = require('./Utils/log/logger');
// User ROUTES
const userRoutes = require('./user/user-routes');
const addressRoutes = require('./address/address-routes');
const transportStationRoutes = require('./transport-station/transport-station-routes');
const licenseRoutes = require('./transport-station/license/license-routes');
const imageMiddleware = require('./image/middleware/image-middleware');

// Transport ROUTES
const transportBookingMethodRoutes = require('./transport/booking-method/transport-booking-method/transport-booking-method-routes')
const bookingMethodRoutes = require('./transport/booking-method/booking-method-routes')
const brandRoutes = require('./transport/brand/brand-routes')
const transportTypeRoutes = require('./transport/tranport-type/transport-type-routes')
const transportRoutes = require('./transport/transport-routes')
const routetRoutes = require('./transport/routes/route-routes')
    const locationRoutes = require('./transport/routes/Location/location-routes')


// Order
    const orderRoutes = require('./payment/order-routes')
    const paymentRoutes = require('./payment/payment-routes')
// Mongo Connect
connectDB(); 
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1/images/:imagePath(*)', imageMiddleware.preview);
// app.use(express.static('C:\\images\\(*)'));
// Transport Register
app.use('/api/v1/user', userRoutes());
app.use('/api/v1/address', addressRoutes());
app.use('/api/v1/transport-station', transportStationRoutes());
app.use('/api/v1/license', licenseRoutes());


// Transport
app.use('/api/v1/transports/bookingmethods', bookingMethodRoutes());
app.use('/api/v1/transports/bookingmethods/transportBookingMethods/', transportBookingMethodRoutes());
app.use('/api/v1/transports/routes/', routetRoutes());
    // app.use('/api/v1/transports/routes/location/', )
app.use('/api/v1/transports/brands/', brandRoutes());
app.use('/api/v1/transports/transportTypes/', transportTypeRoutes());
app.use('/api/v1/transports', transportRoutes());
app.use('/api/v1/transports/routes/locations', locationRoutes());
app.use('/api/v1/order', orderRoutes());
app.use('/api/v1/payment',paymentRoutes())

// Client api 
// search transport by province
// 

app.listen(process.env.PORT, async () => {
    logger.info(`\n ${await decode2String()}`);
    logger.info(`Server is running on port ${process.env.PORT}`);
});
