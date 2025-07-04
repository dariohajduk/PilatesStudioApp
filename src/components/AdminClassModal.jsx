import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { Trash2, UserPlus, X } from "lucide-react";
import toast from "react-hot-toast";
import { getDoc } from "firebase/firestore"; // ← זה חסר אצלך


/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
/**
 * TODO: תאר את הפונקציה AdminClassModal
 */
const AdminClassModal = ({ cls, onClose, refresh, handleRemoveParticipant }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userToAddPhone, setUserToAddPhone] = useState("");

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const q = query(collection(db, "bookings"), where("classId", "==", cls.id));
        const snapshot = await getDocs(q);
        
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setParticipants(data);
      } catch (error) {
        console.error("Error loading participants:", error);
      }
    };
    fetchParticipants();
  }, [cls.id, refresh]);

  const handleAddParticipant = async () => {
    if (!userToAddPhone.trim()) {
      toast.error("יש להזין טלפון של מתאמן");
      return;
    }

    setLoading(true);
    const phone = userToAddPhone.trim();

    try {
      // בדיקה אם כבר רשום לשיעור
      const existingBookingQuery = query(
        collection(db, "bookings"),
        where("classId", "==", cls.id),
        where("userId", "==", phone)
      );
      const existingBookingSnap = await getDocs(existingBookingQuery);
      

      if (!existingBookingSnap.empty) {
        toast.error("המשתמש כבר רשום לשיעור זה");
        setLoading(false);
        return;
      }

      // שלב חדש: טעינת שם המשתמש מאוסף Users
      const userDocRef = doc(db, "Users", phone); // ← גישה ישירה לפי ID
      const userDocSnap = await getDoc(userDocRef);
      
      let userName = "מתאמן לא מזוהה";
      if (userDocSnap.exists()) {
        userName = userDocSnap.data().name || userName;
      }

      // הוספת המשתמש לשיעור כולל userName
      await addDoc(collection(db, "bookings"), {
        classId: cls.id,
        userId: phone,
        userName,
        className: cls.name,
        date: cls.date,
        time: cls.time,
        instructor: cls.instructor,
        createdAt: new Date(),
      });

      toast.success("המשתמש נוסף בהצלחה");
      setUserToAddPhone("");
      refresh();
    } catch (error) {
      console.error("Error adding participant:", error);
      toast.error("שגיאה בהוספת המשתמש");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">ניהול שיעור: {cls.name}</h2>
        <p className="mb-2">
          <strong>תאריך:</strong> {cls.date} &nbsp;&nbsp;
          <strong>שעה:</strong> {cls.time}
        </p>
        <p className="mb-4"><strong>מדריך:</strong> {cls.instructor}</p>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">משתתפים רשומים:</h3>
          {participants.length === 0 ? (
            <p>עדיין אין משתתפים.</p>
          ) : (
            <ul className="max-h-48 overflow-auto border rounded p-2 space-y-1">
              {participants.map((p) => (
                <li key={p.id} className="flex justify-between items-center border-b border-gray-200 pb-1">
                  <span>{p.userName || p.userId}</span>
                  <button
                    onClick={() => handleRemoveParticipant(p.id)}
                    className="text-red-600 hover:text-red-800"
                    title="הסר משתמש מהשיעור"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2">הוסף מתאמן חדש לפי טלפון:</h3>
          <input
            type="text"
            placeholder="מספר טלפון"
            value={userToAddPhone}
            onChange={(e) => setUserToAddPhone(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleAddParticipant}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "שולח..." : "הוסף מתאמן"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClassModal;
