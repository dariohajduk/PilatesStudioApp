import React, { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import ClassCard from "../components/ClassCard";
import { db } from "../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";

// ==================== קומפוננטת דף לוח השיעורים ====================
const SchedulePage = ({ employee }) => {
  // ========== הגדרות זמן ותאריך ==========
  const today = new Date(); // תאריך היום

  // פונקציה להמרת תאריך לפורמט DD/MM/YYYY
  const formatDate = (dateObj) => {
    const day = dateObj.getDate().toString().padStart(2, "0"); // יום עם אפסים מובילים
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // חודש עם אפסים מובילים
    const year = dateObj.getFullYear(); // שנה
    return `${day}/${month}/${year}`; // החזרת התאריך המפורמט
  };

  // פונקציה לקבלת תחילת השבוע
  const getStartOfWeek = (date) => {
    const dayOfWeek = date.getDay(); // מספר יום בשבוע (0-6, 0 זה יום ראשון)
    const diff = date.getDate() - dayOfWeek; // מחשב את היום הראשון בשבוע
    return new Date(date.getFullYear(), date.getMonth(), diff); // מחזיר תאריך של תחילת השבוע
  };

  // ========== משתני מצב (State) ==========
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(today)); // תאריך תחילת השבוע הנוכחי
  const [selectedDate, setSelectedDate] = useState(formatDate(today)); // התאריך שנבחר (ברירת מחדל: היום)
  const [classes, setClasses] = useState([]); // רשימת כל השיעורים
  const [bookings, setBookings] = useState([]); // רשימת ההזמנות של המשתמש
  const [loading, setLoading] = useState(true); // אינדיקטור טעינה

  // ========== פונקציות שליפת נתונים ==========
  // שליפת כל השיעורים ממסד הנתונים
  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes")); // שליפת כל מסמכי השיעורים
      setClasses(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))); // המרת התוצאות למערך ושמירה במצב
    } catch (error) {
      console.error("❌ שגיאה בטעינת השיעורים:", error); // לוג שגיאה
    }
  };

  // שליפת ההזמנות של המשתמש הנוכחי
  const fetchUserBookings = async () => {
    if (!employee) return; // אם אין משתמש מחובר, יציאה מהפונקציה
    try {
      // יצירת שאילתה לשליפת ההזמנות של המשתמש הנוכחי
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("userId", "==", employee.phone));
      const querySnapshot = await getDocs(q);
      
      // המרת התוצאות למערך ושמירה במצב
      setBookings(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("❌ שגיאה בטעינת ההזמנות של המשתמש:", error); // לוג שגיאה
    }
  };

  // ========== השפעות (Effects) ==========
  // אפקט לטעינת נתונים בעת טעינת הקומפוננטה או שינוי במשתמש
  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // הפעלת אינדיקטור טעינה
      await fetchClasses(); // טעינת שיעורים
      await fetchUserBookings(); // טעינת הזמנות
      setLoading(false); // כיבוי אינדיקטור טעינה
    };
    loadData(); // הפעלת פונקציית הטעינה
  }, [employee]); // ביצוע מחדש כאשר המשתמש משתנה

  // ========== פונקציות טיפול בניווט ==========
  // מעבר לשבוע הקודם
  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeekStart); // יצירת אובייקט תאריך חדש
    prevWeek.setDate(prevWeek.getDate() - 7); // חיסור 7 ימים
    setCurrentWeekStart(prevWeek); // עדכון תאריך תחילת השבוע
    setSelectedDate(formatDate(prevWeek)); // עדכון התאריך הנבחר
  };

  // מעבר לשבוע הבא
  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart); // יצירת אובייקט תאריך חדש
    nextWeek.setDate(nextWeek.getDate() + 7); // הוספת 7 ימים
    setCurrentWeekStart(nextWeek); // עדכון תאריך תחילת השבוע
    setSelectedDate(formatDate(nextWeek)); // עדכון התאריך הנבחר
  };

  // ========== פונקציות בדיקה ==========
  // בדיקה האם המשתמש כבר רשום לשיעור
  const isAlreadyBooked = (classId) => bookings.some((booking) => booking.classId === classId);

  // בדיקה האם השיעור כבר עבר (שיעור בעבר)
  const isPastClass = (classDate, classTime) => {
    // המרת תאריך ושעה לאובייקט Date
    const classDateTime = new Date(`${classDate.split("/").reverse().join("-")}T${classTime}`);
    return classDateTime < new Date(); // בדיקה האם השיעור בעבר
  };

  // ========== רינדור ממשק המשתמש ==========
  // רינדור מסך טעינה
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>טוען שיעורים...</p> {/* הודעת טעינה */}
      </div>
    );
  }

  // רינדור הדף העיקרי
  return (
    <MainLayout employee={employee}> {/* תבנית העיצוב הראשית */}
      <TopHeader title="לוח שיעורים" /> {/* כותרת העמוד */}

      {/* ניווט בין שבועות */}
      <div className="flex justify-between items-center p-4">
        {/* כפתור לשבוע הקודם */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={handlePrevWeek} className="bg-blue-100 p-2 rounded-full shadow">
          <ChevronRight size={20} className="text-blue-600" />
        </motion.button>
        
        {/* הצגת התאריך הנבחר */}
        <h3 className="font-bold text-lg">{selectedDate}</h3>
        
        {/* כפתור לשבוע הבא */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={handleNextWeek} className="bg-blue-100 p-2 rounded-full shadow">
          <ChevronLeft size={20} className="text-blue-600" />
        </motion.button>
      </div>

      {/* תצוגת ימי השבוע */}
      <div className="flex overflow-x-auto px-4 pb-4 no-scrollbar">
        {Array.from({ length: 7 }).map((_, i) => { // יצירת 7 אלמנטים (ימי השבוע)
          // חישוב התאריך לכל יום בשבוע
          const dateObj = new Date(currentWeekStart);
          dateObj.setDate(currentWeekStart.getDate() + i);
          const dateStr = formatDate(dateObj);
          const isSelected = selectedDate === dateStr; // האם זה היום שנבחר
          const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"]; // שמות הימים בעברית

          // רינדור כל יום בלוח השבועי
          return (
            <motion.div
              key={i}
              onClick={() => setSelectedDate(dateStr)} // בחירת תאריך בלחיצה
              whileTap={{ scale: 0.95 }}
              className={`mx-1 w-16 text-center py-3 rounded-xl shadow cursor-pointer transition ${isSelected ? "bg-blue-500 text-white" : "bg-gray-100"}`}
            >
              <p className="text-xs">{dayNames[dateObj.getDay()]}</p> {/* הצגת יום השבוע */}
              <p className="font-semibold text-sm">
                {dateObj.getDate().toString().padStart(2, "0")}/{(dateObj.getMonth() + 1).toString().padStart(2, "0")}
              </p> {/* הצגת התאריך */}
            </motion.div>
          );
        })}
      </div>

      {/* תצוגת השיעורים ליום שנבחר */}
      <div className="px-4 flex flex-col gap-3">
        {classes.filter((cls) => cls.date === selectedDate).length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-2">אין שיעורים מתוכננים להיום.</p>
            <p className="text-3xl">🧘‍♀️</p>
          </div>
        ) : (
          classes
            .filter((cls) => cls.date === selectedDate)
            .sort((a, b) => a.time.localeCompare(b.time)) // מיון השיעורים לפי שעה בסדר עולה
            .map((cls) => (
              <ClassCard
                key={cls.id}
                classInfo={cls}
                employee={employee}
                isAlreadyBooked={isAlreadyBooked(cls.id)} // האם כבר רשום
                refreshBookings={fetchUserBookings} // פונקציה לרענון הזמנות
                isPastClass={isPastClass(cls.date, cls.time)} // האם השיעור עבר
              />
            ))
        )}
      </div>
    </MainLayout>
  );
};

export default SchedulePage;
