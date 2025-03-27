// services/fcm.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { messaging } from "./firebase"; // או הנתיב הנכון אצלך
import { onMessage } from "firebase/messaging";
import { toast } from "react-hot-toast";

/**
 * שמירת טוקן FCM במסמך של המשתמש לפי הטלפון
 * @param {string} phone - מספר הטלפון של המשתמש
 * @param {string} token - טוקן FCM שקיבלנו
 */
export const saveFcmToken = async (phone, token) => {
  if (!phone || !token) return;

  try {
    await setDoc(
      doc(db, "fcm_tokens", phone),
      {
        token,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    console.log("📦 FCM token נשמר בהצלחה למשתמש:", phone);
  } catch (error) {
    console.error("❌ שגיאה בשמירת טוקן FCM:", error);
  }
};
export const listenToForegroundMessages = () => {
    onMessage(messaging, (payload) => {
      console.log("📨 קיבלת הודעת FCM:", payload);
  
      const title = payload?.notification?.title || "התראה חדשה";
      const body = payload?.notification?.body || "";
  
      toast.custom((t) => (
        <div
          className={`bg-white border border-blue-300 shadow-lg rounded-lg p-4 max-w-xs text-right ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <p className="text-blue-700 font-semibold mb-1">{title}</p>
          <p className="text-sm text-gray-700">{body}</p>
        </div>
      ));
    });
  };