async function encrypt(value)
{
    var crypto = require('crypto');
    var algorithm = 'aes256';
    var key = 'password';
    var cipher = crypto.createCipher(algorithm, key);  
    var encrypted = cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
}

async function decrypt(value)
{
    var crypto = require('crypto');
    var algorithm = 'aes256';
    var key = 'password';
    var decipher = crypto.createDecipher(algorithm, key);
    var decrypted = decipher.update(value, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
}

module.exports = 
{
    encrypt,
    decrypt
}