// securityController.js
const crypto = require('crypto');
const speakeasy = require('speakeasy');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 32 bytes for AES-256
const iv = crypto.randomBytes(16); // Use 16 bytes for IV in AES-256-CBC

const encrypt = (data) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = ({ iv, encryptedData }) => {
    if (!iv || !encryptedData) {
      return ''; // Or handle appropriately for your use case
    }
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  };

function generateMFASecret() {
  // Generate a time-based one-time password (TOTP) secret
  const secret = speakeasy.generateSecret({ length: 20 });
  return secret.base32;
}

module.exports = {
  encrypt,
  decrypt,
  generateMFASecret,
};
