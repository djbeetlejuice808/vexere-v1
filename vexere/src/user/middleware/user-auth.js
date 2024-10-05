const User = require('../user-model'); // Adjust the path to your user model
const utilsToken = require('../utils/utils-token'); // Adjust the path to your utilsToken file

const authentication = async (req, res, next) => {
    console.log("Authentication middleware called");
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            message: "You need to sign in"
        });
    }
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token || token === 'Bearer') {
        return res.status(401).json({
            message: "You need to sign in"
        });
    }
    if (utilsToken.isTokenExpired(token)) {
        return res.status(401).json({
            message: "Access token is expired!"
        });
    }
    
    const decodedToken = utilsToken.deCodeToken(token);
    if (!decodedToken) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }

    try {
        const userFromToken = decodedToken.payload;
        const userFromServer = await User.findById({_id: userFromToken.id});
        if (userFromServer === null) {
            return res.status(401).json({
                message: "Cannot find user!"
            });
        }
        req.user = userFromServer;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const authorize = (requiredRoles) => {
    return (req, res, next) => {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }
        
        const userRole = req.user.role;

        if (!requiredRoles.includes(userRole)) {
            return res.status(403).json({
                message: "You don't have the required permissions to access this route"
            });
        }

        next();
    };
};

module.exports = { authentication, authorize };
