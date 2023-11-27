const admin = require('firebase-admin');

const serviceAccount = require('./aimt-1b9ec-firebase-adminsdk-nh18f-75c5287103');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'aimt-1b9ec.appspot.com',
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = bucket;