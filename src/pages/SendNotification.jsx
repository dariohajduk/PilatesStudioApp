import React, { useState } from "react";
import { db } from "../services/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { sendPushNotification } from "./api/sendNotification";


const SendNotification = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // שליחת ההתראה
  const handleSendNotification = async () => {
    if (!phone || !message) {
      toast.error("אנא מלא את כל השדות");
      return;
    }

    setLoading(true);

    try {
      const userRef = doc(db, "Users", phone);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("משתמש לא נמצא");
        setLoading(false);
        return;
      }

      const userData = userSnap.data();
      const token = userData.fcmToken;

      if (token) {
        await sendPushNotification(token, message);
        toast.success("ההתראה נשלחה בהצלחה!");
      } else {
        toast.error("למשתמש אין טוקן FCM");
      }
    } catch (error) {
      console.error("שגיאה בשליחת ההתראה:", error);
      toast.error("שגיאה בשליחת ההתראה");
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">שלח התראה למשתמש</h1>

      <div className="mb-4">
        <label className="block mb-2">מספר טלפון:</label>
        <input
          type="tel"
          className="w-full p-2 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="הזן מספר טלפון"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">הודעת התראה:</label>
        <textarea
          className="w-full p-2 border rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="הזן את ההודעה לשליחה"
        />
      </div>

      <button
        onClick={handleSendNotification}
        className={`w-full p-2 bg-blue-600 text-white rounded ${loading ? "cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "שולח..." : "שלח התראה"}
      </button>
    </div>
  );
};

export default SendNotification;
