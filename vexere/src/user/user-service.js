const { 
    createUser, 
    findUserByUsername, 
    findUserById, 
    findUserByRefreshToken, 
    getAllUsers, 
    saveToken, 
    revokeOldAccessTokens,
    findUserByIdAndUpadate
} = require('./user-queries');

const {   
    generateRefreshToken,
    generateAccessToken,
    deCodeRefreshToken,
    isTokenExpired,
} = require('./utils/utils-token');

const {   
    generateHashPassword, 
    comparePassword 
} = require('../Utils/Hash');
const Token = require('./token/token-model');


exports.createUser = async (username, password) => {
    const userFromServer = await findUserByUsername(username);
    if (!userFromServer) {
        const hashedPassword = await generateHashPassword(password);
        const user = {
            username,
            password: {
                salt: hashedPassword.salt,
                hash: hashedPassword.hash,
                iterations: hashedPassword.iterations,
            }
        };
        const userSaved = await createUser(user);

        const accessToken = generateAccessToken({   
            id: userSaved._id, 
            username: userSaved.username, 
            role: userSaved.role
        });

        const token = await saveToken({
            token: accessToken,
            user: userSaved._id,
        });
        
        userSaved.tokens.push(token._id);
        
        const refreshToken = generateRefreshToken({ id: userSaved._id });
        const tokenRef = await saveToken({
            token: refreshToken,
            user: userSaved._id,
            type: 'refresh'
        });
        
        userSaved.refreshTokens.push(tokenRef._id);
        await userSaved.save();

        return userSaved;
    }
    return null;
};

exports.findUserByUsername = findUserByUsername;

exports.verifyUserPassword = async (user, password) => {
    const { iterations, salt, hash } = user.password;
    const dividePassword = { iterations, salt, hash };
    return await comparePassword(dividePassword, password);
};

exports.findUserByRefreshToken = async (refreshToken) => {
    const decoded = deCodeRefreshToken(refreshToken);
    return findUserByRefreshToken(decoded.payload.id, refreshToken);
};

exports.refreshAccessToken = async (user, refreshToken) => {
    if (!user || !user.refreshTokens || user.refreshTokens.length === 0) {
        throw new Error('Refresh token is invalid or expired.');
    }

    const accessToken = user.tokens.find(token => token.type === 'access' && !token.revoked);

    if (accessToken && !isTokenExpired(accessToken.token)) {
        return {
            message: 'Token is not expired!',
            accessToken: accessToken.token
        };
    } else {
        const newAccessToken = generateAccessToken({
            id: user._id,
            username: user.username,
            role: user.role
        });

        const token = await saveToken({
            token: newAccessToken,
            user: user._id,
        });

        user.tokens.push(token._id);
        await user.save();

        await revokeOldAccessTokens(user._id, token._id);

        return {
            accessToken: newAccessToken
        };
    }
};

exports.getAllUsers = getAllUsers;

exports.getUserById = findUserById;

exports.findUserByIdAndUpdate = async (userId, newRole,transport_station_id) => {
    const validRoles = ['user', 'admin', 'transport-station'];
    if (!validRoles.includes(newRole)) {
        throw new Error('Invalid role provided');
    }

    try {
        const updatedUser = await findUserByIdAndUpadate(
            userId,
            { role: newRole },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        if (!updatedUser.tokens || updatedUser.tokens.length === 0) {
            throw new Error('User has no tokens');
        }

        const currentTokenId = updatedUser.tokens[0];
        const newAccessToken = generateAccessToken({
            id: updatedUser._id,
            username: updatedUser.username,
            transportStationId:transport_station_id,
            role: newRole 
        });

        const tokenSaved = await Token.findByIdAndUpdate(
            currentTokenId,
            { token: newAccessToken },
            { new: true, runValidators: true }
        );

        if (!tokenSaved) {
            throw new Error('Error updating token');
        }

        console.log('Updated User:', updatedUser);
        console.log('New Access Token:', newAccessToken);

        return updatedUser;
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
}

