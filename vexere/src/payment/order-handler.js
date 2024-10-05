const Order = require('./order-model');


exports.createOrder = async (req, res) => {
    try {
        const {
            userId,
            routeId,
            quantity,
            totalPrice
        } = req.body;

        const newOrder = new Order({
            userId:null,
            routeId,
            quantity,
            totalPrice
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId)
        .populate({
            path: 'routeId',
            model: 'Route',
            populate: [
                    {
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
                    },
                    {
                        path: 'departureLocation',
                        model: 'Province'
                    },
                    {
                        path: 'destination',
                        model: 'Province'
                    },
                    {
                        path: 'locations',
                        model: 'Location'
                    },
                    
                ]
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAll = async (req, res) => {
    try {       
        const order = await Order.find().populate({
            path: 'routeId',
            model: 'Route'
        });
        console.log(order)
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};