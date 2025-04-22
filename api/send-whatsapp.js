// pages/api/send-whatsapp.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  // 🛑 כאן יש לשים את הנתונים מהחשבון הדמו (בפועל יהיו שלך)
  const WHATSAPP_TOKEN = "YOUR_TEMP_TOKEN";
  const PHONE_NUMBER_ID = "YOUR_PHONE_NUMBER_ID";
  const TEST_PHONE = "RECIPIENT_PHONE_NUMBER"; // כולל קידומת בינ"ל

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: TEST_PHONE,
          type: "template",
          template: {
            name: "hello_world", // תבנית ברירת מחדל לחשבונות חדשים
            language: { code: "en_US" },
          },
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(500).json({ success: false, error: data });
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed to send WhatsApp message", details: err });
  }
}
