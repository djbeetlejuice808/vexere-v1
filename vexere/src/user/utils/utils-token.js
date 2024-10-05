require('dotenv').config();
const jwt = require('jsonwebtoken');


exports.generateAccessToken  = (payload, expiresIn) => {
    let secretKeyProcess = process.env.JWT_SECRET
    let expiresInProcess = expiresIn != null ? expiresIn  : process.env.JWT_EXPIRES_IN 
    try {
        const tokenAfterSign = jwt.sign(
                {
                    payload
                },
                secretKeyProcess,
                {
                    expiresIn: '2y'
                }
        )  
        return tokenAfterSign
    } catch (error) {
        console.log(error)
    }
};

exports.generateRefreshToken  = (payload, expiresIn) => {
    let secretKeyProcess = process.env.JWT_REFRESH
    let expiresInProcess = expiresIn != null ? expiresIn  : process.env.JWT_REFRESH_EXPIRES_IN
    
    try {
        const tokenAfterSign = jwt.sign(
                {
                    payload
                },
                secretKeyProcess,
                {
                    expiresIn: expiresInProcess
                }
        )  
        return tokenAfterSign
    } catch (error) {
        console.log(error)
    }
};

exports.isTokenExpired = (token) => {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    const expired = (Date.now() >= exp * 1000)
    return expired
}

// exports.isTokenExpired = (token) => {
//     const payload = jwt.decode(token);
//     return payload.exp * 1000 < Date.now();
// }


exports.deCodeToken  = (token) => {
    let secretKeyProcess = process.env.JWT_SECRET
    try {
        return jwt.verify(token,secretKeyProcess)  
    } catch (error) {
        console.log('Cant Decode Token')
        console.log(error)
    }
};

exports.deCodeRefreshToken  = (token) => {
    let secretKeyProcess = process.env.JWT_REFRESH
    try {
        return jwt.verify(
                token,
                secretKeyProcess
        )  
    } catch (error) {
        console.log('Cant Decode Token')
        console.log(error)
    }
};