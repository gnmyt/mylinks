const jwt = require('jsonwebtoken');
const {getToken} = require("./token");

module.exports.validateSession = async (jwtToken) => {
    try {
        return jwt.verify(jwtToken, getToken());
    } catch (e) {
        return null;
    }
}