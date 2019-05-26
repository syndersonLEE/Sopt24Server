const crypto = require('crypto');

const cryptoManager = {
    makeRandomByte : () => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(32, (err, buffer) => {
                if(err) {
                    reject(err);
                }
                resolve(buffer.toString('base64'));
            })
        })
    },
    makeEncryption : (data, salt) => {
        const hashedPw = crypto.pbkdf2Sync(data, salt, 10000, 64, 'sha512').toString('base64')
        return hashedPw
    }
}

module.exports = cryptoManager;