// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendPushNotification = functions.https.onCall(async (data, context) => {
  const token = data.token;
  const message = data.message;

  if (!token || !message) {
    throw new functions.https.HttpsError("invalid-argument", "Token or message missing");
  }

  try {
    const response = await admin.messaging().send({
      token,
      notification: {
        title: "מילאן פילאטיס",
        body: message,
      },
    });

    return { success: true, response };
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new functions.https.HttpsError("internal", "Failed to send notification");
  }
});
