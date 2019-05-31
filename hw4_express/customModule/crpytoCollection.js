const crypto = require('crypto');

const cryptoCollection = {
    encodeRandomBytes : () => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(64, (err, buf) => {
                if(err) {
                    reject(err);
                    return err;
                }
                resolve(buf.toString('base64'));
                return buf.toString('base64');
            })
        }) 
    },
    pbkdf2 : (pw, salt) => {
        // console.log(`${pw} and ${salt}`);
        const encodePassword = crypto.pbkdf2Sync(pw, salt, 10000, 64, 'sha512').toString('base64');
        return encodePassword;
    }
    

}

module.exports = cryptoCollection;