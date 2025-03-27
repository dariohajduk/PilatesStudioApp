// fcm.js – שירות התראות FCM
import { getMessaging, getToken } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { messaging } from "./firebase"; // messaging מיובא מתוך firebase.js
import { db } from "./firebase";

// בקשת הרשאה ושליפת טוקן
export const requestNotificationPermission = async (phone) => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "🔑 הכנס כאן את ה־VAPID Public Key שלך",
      });

      if (token) {
        await saveFcmToken(phone, token);
        alert("📱 טוקן שלך:\n" + token); // ✅ זמני לבדיקה
      } else {
        console.warn("⚠️ לא התקבל טוקן FCM");
      }
    } else {
      console.warn("🔕 המשתמש לא אישר קבלת התראות");
    }
  } catch (err) {
    console.error("❌ שגיאה בקבלת הרשאות התראות:", err);
  }
};


// שמירת הטוקן במסמך המשתמש ב-Firestore
export const saveFcmToken = async (phone, token) => {
  if (!phone || !token) return;
  try {
    const userRef = doc(db, "Users", phone);
    await setDoc(userRef, { fcmToken: token }, { merge: true });
    console.log("📥 הטוקן נשמר בהצלחה במסמך המשתמש");
  } catch (error) {
    console.error("❌ שגיאה בשמירת טוקן FCM:", error);
  }
};
