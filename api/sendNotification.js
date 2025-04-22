// /api/sendNotification.js
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { token, message } = req.body;

  try {
    await getMessaging().send({
      token,
      notification: {
        title: 'התראה חדשה',
        body: message,
      },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ FCM Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
