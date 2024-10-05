const User = require('./user-model');
const Token = require('./token/token-model');

exports.findUserByUsername = async (username) => {
    return await User
        .findOne({ username })
        .populate({
            path: 'tokens',
            model: 'Token',
            select: 'token createdAt'
        })
        .populate({
            path: 'refreshTokens',
            model: 'Token',
            select: 'token createdAt'
        });
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.findUserById = async (id) => {
    return await User.findById(id);
};

exports.findUserByRefreshToken = async (decodedId, refreshToken) => {
    return await User.findOne({ _id: decodedId })
        .populate({
            path: 'tokens',
            model: 'Token',
            match: { type: 'access' }
        })
        .populate({
            path: 'refreshTokens',
            model: 'Token',
            match: { type: 'refresh', token: refreshToken }
        });
};

exports.getAllUsers = async () => {
    return await User.find()
        .populate({
            path: 'tokens',
            model: 'Token',
        })
        .populate({
            path: 'refreshTokens',
            model: 'Token',
        });
};

exports.saveToken = async (tokenData) => {
    const token = new Token(tokenData);
    return await token.save();
};

exports.revokeOldAccessTokens = async (userId, newTokenId) => {
    return await Token.updateMany(
        { user: userId, type: 'access', _id: { $ne: newTokenId } },
        { $set: { revoked: true } }
    );
};
exports.findUserByIdAndUpadate= async (userId, content) => {
    try {
        const user = await User.findByIdAndUpdate(userId,content)
        return user
    }catch(error){
        throw "Cannot update user"
    }
}