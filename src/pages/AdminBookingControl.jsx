import React, { useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import toast from "react-hot-toast";
import BackToAdminButton from "../components/BackToAdminButton";
import { useNavigate } from "react-router-dom";

/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
/**
 * TODO: תאר את הפונקציה AdminBookingControl
 */
const AdminBookingControl = () => {
  const navigate = useNavigate(); // בתוך הקומפוננטה
  const [dateToDelete, setDateToDelete] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [loading, setLoading] = useState(false);

  // מחיקת כל ההרשמות
  const handleDeleteAll = async () => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק את כל ההרשמות?")) return;

    setLoading(true);
    try {
      const bookingsRef = collection(db, "bookings");
      const snapshot = await getDocs(bookingsRef);
      const batch = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "bookings", docSnap.id))
      );
      await Promise.all(batch);
      toast.success("כל ההרשמות נמחקו בהצלחה!");
    } catch (err) {
      console.error(err);
      toast.error("שגיאה במחיקת כל ההרשמות");
    }
    setLoading(false);
  };

  // מחיקה לפי תאריך
  const handleDeleteByDate = async () => {
    if (!dateToDelete) return toast.error("יש להזין תאריך");

    setLoading(true);
    try {
      const q = query(
        collection(db, "bookings"),
        where("date", "==", dateToDelete)
      );
      const snapshot = await getDocs(q);
      const batch = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "bookings", docSnap.id))
      );
      await Promise.all(batch);
      toast.success("ההרשמות בתאריך נמחקו!");
    } catch (err) {
      console.error(err);
      toast.error("שגיאה במחיקת הרשמות לפי תאריך");
    }
    setLoading(false);
  };

  // מחיקה לפי מזהה משתמש
  const handleDeleteByUser = async () => {
    if (!userIdToDelete) return toast.error("יש להזין מזהה משתמש");

    setLoading(true);
    try {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", userIdToDelete)
      );
      const snapshot = await getDocs(q);
      const batch = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "bookings", docSnap.id))
      );
      await Promise.all(batch);
      toast.success("ההרשמות של המשתמש נמחקו!");
    } catch (err) {
      console.error(err);
      toast.error("שגיאה במחיקת הרשמות לפי משתמש");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center text-indigo-700">
        ניהול הרשמות
      </h2>
      <BackToAdminButton />

      <div className="space-y-6">
        {/* מחיקה לפי תאריך */}
        <div>
          <label className="block font-medium mb-1 text-right">
            מחיקה לפי תאריך (למשל: 08/04/2025):
          </label>
          <input
            type="text"
            value={dateToDelete}
            onChange={(e) => setDateToDelete(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="dd/mm/yyyy"
          />
          <button
            onClick={handleDeleteByDate}
            disabled={loading}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            מחק לפי תאריך
          </button>
        </div>

        {/* מחיקה לפי משתמש */}
        <div>
          <label className="block font-medium mb-1 text-right">
            מחיקה לפי מזהה משתמש (טלפון):
          </label>
          <input
            type="text"
            value={userIdToDelete}
            onChange={(e) => setUserIdToDelete(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="לדוג' 0541234567"
          />
          <button
            onClick={handleDeleteByUser}
            disabled={loading}
            className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
          >
            מחק לפי משתמש
          </button>
        </div>

        {/* מחיקה של הכול */}
        <div>
          <button
            onClick={handleDeleteAll}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold transition"
          >
            מחק את כל ההרשמות ❌
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingControl;
