const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { backup } = require('mongodb-backup');
const speakeasy = require('speakeasy');
const GoogleDriveBackup = require('mongodb-backup-googledrive');
const backupDir = 'backup/directory/path';

// set up security schema
const userSchema = new mongoose.Schema({
password: String,
mfa: {
    enabled: Boolean,
    secret: String,
},
});

// hashing a password before saving it to the database
userSchema.pre('save', async function(next) {
try {
    if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    }
    next();
} catch (error) {
    next(error);
}
});

//sensitive data protection
const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encryptMessage(message, secret) {
const cipher = crypto.createCipheriv(algorithm, secret, iv);
const encrypted = Buffer.concat([cipher.update(message), cipher.final()]);
return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
}

function decryptMessage(encryptedMessage, secret) {
const decipher = crypto.createDecipheriv(algorithm, secret, Buffer.from(encryptedMessage.iv, 'hex'));
const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedMessage.content, 'hex')), decipher.final()]);
return decrypted.toString();
}

// Establish a connection to the MongoDB database.
mongoose.connect('mongodb://localhost:27017/mydatabase', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const db = mongoose.connection.db;
const bucket = new GridFSBucket(db);

const backupOptions = {
root: backupDir,
callback: function(err) {
    if (err) {
    console.error('Error while backing up the database:', err);
    } else {
    console.log('Backup successfully created');
    }
},
 collections: ['users', 'agents'], // only backup the 'users' and 'agents' collections
};

//use the googleapis library to authenticate with the Google Drive API using the refreshToken
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2();
oauth2Client.setCredentials({
refresh_token: 'your-refresh-token'
});

const drive = google.drive({
version: 'v3',
auth: oauth2Client
});

// Google Drive backup
const googleDriveOptions = {
serviceAccountKey: 'path/to/serviceAccountKey.json',
root: 'root-folder-id',
clientId: 'client-id',
clientSecret: 'client-secret',
redirectUri: 'redirect-uri',
refreshToken: 'refresh-token',
};

const backupGoogleDrive = new GoogleDriveBackup(googleDriveOptions);

// Create backup to Google Drive
backupGoogleDrive.backup(backupOptions, function(err) {
if (err) {
    console.error('Error while backing up the database to Google Drive:', err);
} else {
    console.log('Backup successfully created and saved to Google Drive');
}
});

// Test MFA
const secret = speakeasy.generateSecret({ length: 20 });
const token = speakeasy.totp({ secret: secret.ascii, encoding: 'ascii' });
const isTokenValid = speakeasy.totp.verify({ secret: secret.ascii, encoding: 'ascii', token: token });
console.log(isTokenValid);


/*
Example usage
const originalMessage = 'This is a secret message';
const encryptedMessage = encryptMessage(originalMessage, secretKey);
const decryptedMessage = decryptMessage(encryptedMessage, secretKey);

console.log('Original message:', originalMessage);
console.log('Encrypted message:', encryptedMessage);
console.log('Decrypted message:', decryptedMessage);
*/
//mongo atlas online 
//extension vscode