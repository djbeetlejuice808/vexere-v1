    const userService = require('./user-service')
const  {    
            userJoiSchema
        } = require('./validation/user-schema');

exports.signup = async (req, res, next) => {
    try {
        const { error } = userJoiSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }
        const { username, password } = req.body;
        const user = await userService.createUser(username, password)
        if (user === null ) {
            return res.status(201).json({
            Message: "Username is exits: " + username
            });
        }
        return res.status(200).send({ 
                user 
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
};

exports.signin = async (req, res, next) => {
    try {
        console.log(req.body)
        const { error } = userJoiSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }
        const { username, password } = req.body;
        const userFromServer = await userService.findUserByUsername(username);
        if (!userFromServer) {
            return res.status(400).json({ error: 'Username does not exist.' });
        }
        const verifySuccess = await userService.verifyUserPassword(userFromServer, password);
        if (verifySuccess) {
            return res.status(200).json({
                _id: userFromServer._id,
                username: userFromServer.username,
                accessToken: userFromServer.tokens,
                refreshToken: userFromServer.refreshTokens
            });
        } else {
            return res.status(401).json({
                status: 'Invalid username or password.'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.refresh = async (req, res, next) => {
    const refreshToken = req.header('Authorization').replace('Bearer ', '');
    try {
        const user = await userService.findUserByRefreshToken(refreshToken);
        const result = await userService.refreshAccessToken(user, refreshToken);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error refreshing token:', error.message);
        return res.status(401).json({ message: error.message });
    }
};

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.loginByThirdParty = async (req, res, next) => {
    
}