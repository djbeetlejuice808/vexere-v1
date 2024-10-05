const Route   = require('./route-model')
const Location  = require('../routes/Location/location-model'); 
const mongoose = require('mongoose');
const TransportBookingMethod = require('../booking-method/transport-booking-method/tranport-booking-method-model')

exports.findRoutesByTransport = async (req, res) => {
    try {
            const { transportId } = req.params;
            const routes = await Route.find({
                transportId: transportId,
                locations: { $exists: true, $not: {$size: 0} }  
            }).populate('transportId')
            .populate({
                path: 'departureLocation',
                model: 'Province'
            })
            .populate({
                path: 'destination',
                model: 'Province'
            })
            .populate({
                path: 'locations',
                model: 'Location'
            })
            .populate('locations');

            if (routes.length > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Routes found successfully.',
                    data: routes
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No routes found for this transport.'
                });
            }
    } catch (error) {
        console.error('Error finding routes:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching routes',
            error: error.message
        });
    }
};

exports.createRoute = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    let locationIds;  

    try {
        const {
            transportId,
            price,
            departureLocation,
            destination,
            departureDate,
            returnDate,
            locations
        } = req.body;
        console.log(locations)
        locationIds = locations; 

        const route = new Route({
            transportId: new mongoose.Types.ObjectId(transportId),
            price,
            departureLocation,
            destination,
            departureDate,
            returnDate,
            locations: locationIds
        });
        const routeSaved = await route.save({ session });
        console.log(routeSaved)
        const updateResult = await Location.updateMany(
            { _id: { $in: locationIds }, routeId: null },
            { $set: { routeId: routeSaved._id } },
            { session }
        );
        console.log(updateResult)
        // if (updateResult.nModified !== locationIds.length) {
        //     throw new Error('Failed to update all locations with the routeId');
        // }

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: 'Route and locations updated successfully!',
            route: routeSaved
        });
    } catch (error) {
        await session.abortTransaction();

        if (locationIds && locationIds.length > 0) {
            await Location.deleteMany({
                _id: { $in: locationIds }
            });
        }

        session.endSession();
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create Route, all associated locations have been deleted',
            error: error.message
        });
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const routes = await Route.find()
            .populate({
                path: 'transportId',
                model: 'Transport',
                populate: [
                    {
                        path: 'images',
                        model: 'Image'
                    },
                    {
                        path: 'transportStationId',
                        model: 'TransportStation'  
                    },
                    {
                        path: 'brandId',
                        model: 'Brand'
                    },
                    {
                        path: 'transportTypeId',
                        model: 'TransportType'
                    }
                ]
            })
            .populate({
                path: 'departureLocation',
                model: 'Province'
            })
            .populate({
                path: 'destination',
                model: 'Province'
            })
            .populate({
                path: 'locations',
                model: 'Location'
            });

        res.status(200).json({
            success: true,
            Routes: routes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


exports.searchByCriteria = async (req, res) => {
    console.log('asjlhfjkdshfjk')
    const { destination, departureLocation, departureDate, returnDate } = req.query;

    let query = {};
    if (destination) query.destination = destination;
    if (departureLocation) query.departureLocation = departureLocation;
    if (departureDate) {
        const date = new Date(departureDate);
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);

        query.departureDate = {
            $gte: date,
            $lt: nextDay
        };
    }
    if (returnDate) {
        query.returnDate = new Date(returnDate);
    }

    try {
        const routes = await Route.find(query)
            .populate({
                path: 'transportId',
                model: 'Transport',
                populate: [
                    {
                        path: 'images',
                        model: 'Image'
                    },
                    {
                        path: 'transportStationId',
                        model: 'TransportStation'
                    },
                    {
                        path: 'brandId',
                        model: 'Brand'
                    },
                    {
                        path: 'transportTypeId',
                        model: 'TransportType'
                    }
                ]
            })
            .populate({
                path: 'departureLocation',
                model: 'Province'
            })
            .populate({
                path: 'destination',
                model: 'Province'
            })
            .populate({
                path: 'locations',
                model: 'Location'
            });
            console.log(routes.transportId)
        const routesWithBookingMethods = await Promise.all(routes.map(async (route) => {
            const bookingMethods = await TransportBookingMethod.find({ transportId: route.transportId._id }).
                                                                populate({
                                                                    path: 'bookingMethodId',
                                                                    model: 'BookingMethod'
                                                                });
            return {
                ...route.toObject(), 
                bookingMethods
            };
        }));

        res.status(200).json({ success: true, routes: routesWithBookingMethods });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};