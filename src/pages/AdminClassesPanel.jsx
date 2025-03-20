import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // לפורמט תאריך

const AdminClassesPanel = ({ employee }) => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    name: "",
    instructor: "",
    date: "",
    time: "",
    spots: 0,
  });
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // טוען את כל השיעורים
  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes"));
      const classesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classesData);
    } catch (error) {
      console.error("❌ שגיאה בטעינת השיעורים:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // הוספת שיעור חדש
  const handleAddClass = async () => {
    // מפרק את השדות מתוך האובייקט של השיעור החדש
    const { name, instructor, date, time, spots } = newClass;

    // בדיקה שכל השדות מולאו כראוי
    if (!name || !instructor || !date || !time || spots <= 0) {
      setMessage("נא למלא את כל השדות");
      return; // יציאה מהפונקציה במקרה שיש שדה חסר
    }

    try {
      // המרת התאריך מהפורמט של input[type="date"] שהוא YYYY-MM-DD
      // לפורמט DD/MM/YYYY
      const formattedDate = date.split("-").reverse().join("/");

      // הוספת השיעור ל-Collection בשם 'classes' בפיירבייס
      await addDoc(collection(db, "classes"), {
        name, // שם השיעור
        instructor, // שם המדריך
        date: formattedDate, // תאריך בפורמט חדש
        time, // שעה
        spots: parseInt(spots), // כמות מקומות פנויים (כמספר)
        createdAt: new Date(), // תאריך יצירה
      });

      // עדכון הודעה למשתמש
      setMessage("✔️ שיעור נוסף בהצלחה!");

      // איפוס הטופס לשיעור הבא
      setNewClass({
        name: "",
        instructor: "",
        date: "",
        time: "",
        spots: 0,
      });

      // רענון הרשימה לאחר הוספה
      fetchClasses();
    } catch (error) {
      // טיפול בשגיאות
      console.error("❌ שגיאה בהוספת שיעור:", error);
      setMessage("שגיאה בהוספת שיעור");
    }
  };

  // מחיקת שיעור
  const handleDeleteClass = async (id) => {
    try {
      await deleteDoc(doc(db, "classes", id));
      setMessage("🗑️ שיעור נמחק");
      fetchClasses();
    } catch (error) {
      console.error("❌ שגיאה במחיקת שיעור:", error);
      setMessage("שגיאה במחיקה");
    }
  };

  // בדיקה אם זה מנהל
  if (employee?.role !== "מנהל") {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלי מערכת.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ניהול שיעורים</h1>

      {/* טופס הוספת שיעור */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="שם השיעור"
          value={newClass.name}
          onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        <input
          type="text"
          placeholder="שם המדריך"
          value={newClass.instructor}
          onChange={(e) =>
            setNewClass({ ...newClass, instructor: e.target.value })
          }
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setNewClass({ ...newClass, date: format(date, "dd/MM/yyyy") });
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText="בחר תאריך"
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        <input
          type="time"
          value={newClass.time}
          onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        <input
          type="number"
          placeholder="כמות מקומות פנויים"
          value={newClass.spots}
          onChange={(e) => setNewClass({ ...newClass, spots: e.target.value })}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        <button
          onClick={handleAddClass}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          הוסף שיעור
        </button>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>

      {/* רשימת שיעורים */}
      <div>
        <h2 className="text-lg font-bold mb-2">רשימת שיעורים</h2>
        <ul>
          {classes.map((cls) => (
            <li
              key={cls.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <p>
                  <strong>{cls.name}</strong> עם {cls.instructor}
                </p>
                <p>
                  {cls.date} בשעה {cls.time} | מקומות פנויים: {cls.spots}
                </p>
              </div>
              <button
                onClick={() => handleDeleteClass(cls.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
              >
                מחק
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminClassesPanel;
