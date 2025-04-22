import { initializeApp, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

initializeApp({ credential: cert(serviceAccount) });

export const sendNotification = async (token, message) => {
  try {
    const messaging = getMessaging();
    const res = await messaging.send({
      token,
      notification: {
        title: "מילאן פילאטיס",
        body: message,
      },
    });
    console.log("✅ נשלח:", res);
  } catch (err) {
    console.error("❌ שגיאה:", err);
  }
};
