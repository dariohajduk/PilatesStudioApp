// /pages/api/sendNotification.js
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { token, message } = req.body;

  if (!token || !message) {
    return res.status(400).json({ error: 'Missing token or message' });
  }

  try {
    const response = await getMessaging().send({
      token,
      notification: {
        title: 'סטודיו מילאן',
        body: message,
      },
    });
    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error('FCM error:', error);
    return res.status(500).json({ error: 'Failed to send notification', details: error });
  }
}