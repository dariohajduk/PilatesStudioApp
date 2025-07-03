
// firestore-import.js

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');

// Initialize Firebase Admin
initializeApp({
  credential: applicationDefault()
});

const db = getFirestore();

// Load the users JSON file
const users = JSON.parse(fs.readFileSync('FirebaseUsers_Filled.json', 'utf8'));

async function uploadUsers() {
  for (const [docId, userData] of Object.entries(users)) {
    try {
      await db.collection('Users').doc(docId).set(userData);
      console.log(`Uploaded user: ${docId}`);
    } catch (error) {
      console.error(`Failed to upload ${docId}:`, error);
    }
  }

  console.log('✅ Upload complete!');
}

uploadUsers();
