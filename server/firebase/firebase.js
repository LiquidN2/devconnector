const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('../../config/firebaseServiceAccountKey.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://devconnector-1421d.firebaseio.com"
});

// firebaseAdmin.initializeApp({
//   serviceAccountId: process.env.FIREBASE_SERVICE_ACCOUNT_ID
// });

// firebaseAdmin.initializeApp({
//   serviceAccountId: "firebase-adminsdk-1l0fr@devconnector-1421d.iam.gserviceaccount.com"
// });

const createCustomFireBaseToken = userId => {
  return firebaseAdmin.auth().createCustomToken(userId);
};

module.exports = { createCustomFireBaseToken };
