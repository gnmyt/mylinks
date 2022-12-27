const fs = require('fs');
const crypto = require('crypto');

const JWT_PATH = process.cwd()+"/data/.jwt";
let jwtToken;

module.exports.createToken = () => {
    if (fs.existsSync(JWT_PATH)) {
        jwtToken = fs.readFileSync(JWT_PATH, 'utf8');
        return;
    }

    // Generate new token
    jwtToken = crypto.randomBytes(50).toString('hex');
    fs.writeFile(JWT_PATH, jwtToken, () => {});
}

module.exports.getToken = () => {
    if (!jwtToken) this.createToken();

    return jwtToken;
}