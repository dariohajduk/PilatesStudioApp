import React, { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import ClassCard from "../components/ClassCard";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { toast } from "react-hot-toast";

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
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getStartOfWeek(today)
  ); // תאריך תחילת השבוע הנוכחי
  const [selectedDate, setSelectedDate] = useState(formatDate(today)); // התאריך שנבחר (ברירת מחדל: היום)
  const [classes, setClasses] = useState([]); // רשימת כל השיעורים
  const [bookings, setBookings] = useState([]); // רשימת ההזמנות של המשתמש
  const [loading, setLoading] = useState(true); // אינדיקטור טעינה
  const [participants, setParticipants] = useState([]);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // האם המשתמש הוא מנהל
  const [customers, setCustomers] = useState([]); // רשימת כל המשתמשים

  const openParticipantsPopup = async (classId) => {
    try {
      const q = query(
        collection(db, "bookings"),
        where("classId", "==", classId)
      );
      const snapshot = await getDocs(q);
      const userIds = snapshot.docs.map((doc) => doc.data().userId);

      const usersSnapshot = await getDocs(collection(db, "Users"));
      const usersMap = {};
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        usersMap[doc.id] = data.name || "לא ידוע";
      });

      const fullParticipants = userIds.map((uid) => ({
        id: uid,
        name: usersMap[uid] || "לא ידוע",
        phone: uid,
      }));

      setParticipants(fullParticipants);
      setShowParticipantsModal(true);
    } catch (error) {
      console.error("❌ שגיאה בטעינת נרשמים:", error);
      toast.error("שגיאה בטעינת נרשמים");
    }
  };

  // ========== פונקציות שליפת נתונים ==========
  // שליפת כל השיעורים ממסד הנתונים
  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes")); // שליפת כל מסמכי השיעורים
      setClasses(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      ); // המרת התוצאות למערך ושמירה במצב
    } catch (error) {
      console.error("❌ שגיאה בטעינת השיעורים:", error); // לוג שגיאה
    }
  };
  const fetchCustomers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "Users"));
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(usersList);
    } catch (error) {
      console.error("❌ שגיאה בטעינת רשימת המשתמשים:", error);
      toast.error("שגיאה בטעינת משתמשים");
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
      setBookings(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (error) {
      console.error("❌ שגיאה בטעינת ההזמנות של המשתמש:", error); // לוג שגיאה
    }
  };

  // ========== השפעות (Effects) ==========
  // אפקט לטעינת נתונים בעת טעינת הקומפוננטה או שינוי במשתמש
  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // הפעלת אינדיקטור טעינה

      console.log("פרטי המשתמש:", employee); // לוג לבדיקת פרטי המשתמש

      // בדיקה מרחיבה יותר אם המשתמש הוא מנהל או מדריך
      let userIsAdmin = false;
      if (employee) {
        userIsAdmin = Boolean(
          employee.isAdmin === true ||
            employee.isInstructor === true ||
            employee.role === "מנהל" ||
            employee.role === "מדריך"
        );

        console.log("האם יש הרשאות ניהול:", userIsAdmin);
        console.log("פרטי הרשאות:", {
          isAdmin: employee.isAdmin,
          isInstructor: employee.isInstructor,
          role: employee.role,
        });

        // קביעת הרשאות מנהל
        setIsAdmin(userIsAdmin);
      }

      await fetchClasses(); // טעינת שיעורים
      await fetchUserBookings(); // טעינת הזמנות
      await fetchCustomers(); // תוכל לעטוף בפונקציה אם תרצה

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

  // מעבר לשבוע של היום
  const goToCurrentWeek = () => {
    setCurrentWeekStart(getStartOfWeek(today));
    setSelectedDate(formatDate(today));
  };

  // ========== פונקציות בדיקה ==========
  // בדיקה האם המשתמש כבר רשום לשיעור
  const isAlreadyBooked = (classId) =>
    bookings.some((booking) => booking.classId === classId);

  // בדיקה האם השיעור כבר עבר (שיעור בעבר)
  const isPastClass = (classDate, classTime) => {
    // המרת תאריך ושעה לאובייקט Date
    const classDateTime = new Date(
      `${classDate.split("/").reverse().join("-")}T${classTime}`
    );
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
    <MainLayout employee={employee}>
      {" "}
      {/* תבנית העיצוב הראשית */}
      <TopHeader title="לוח שיעורים" /> {/* כותרת העמוד */}
      {/* ניווט בין שבועות */}
      <div className="flex justify-between items-center p-4">
        {/* כפתור לשבוע הקודם */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handlePrevWeek}
          className="bg-blue-100 p-2 rounded-full shadow"
        >
          <ChevronRight size={20} className="text-blue-600" />
        </motion.button>

        {/* הצגת התאריך הנבחר והיום הנוכחי */}
        <div className="text-center">
          <h3 className="font-bold text-lg">{selectedDate}</h3>
          {selectedDate !== formatDate(today) && (
            <button
              onClick={goToCurrentWeek}
              className="text-xs text-blue-500 mt-1"
            >
              חזור להיום
            </button>
          )}
        </div>

        {/* כפתור לשבוע הבא */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleNextWeek}
          className="bg-blue-100 p-2 rounded-full shadow"
        >
          <ChevronLeft size={20} className="text-blue-600" />
        </motion.button>
      </div>
      {/* תצוגת ימי השבוע */}
      <div className="grid grid-cols-7 w-full px-2 gap-1">
        {Array.from({ length: 7 }).map((_, i) => {
          // חישוב התאריך לכל יום בשבוע
          const dateObj = new Date(currentWeekStart);
          dateObj.setDate(currentWeekStart.getDate() + i);
          const dateStr = formatDate(dateObj);
          const isSelected = selectedDate === dateStr; // האם זה היום שנבחר
          const isToday = formatDate(today) === dateStr; // האם זה היום הנוכחי
          const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"]; // שמות הימים בעברית

          // רינדור כל יום בלוח השבועי
          return (
            <motion.div
              key={i}
              onClick={() => setSelectedDate(dateStr)} // בחירת תאריך בלחיצה
              whileTap={{ scale: 0.95 }}
              className={`text-center py-2 rounded-xl shadow cursor-pointer transition 
                ${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : isToday
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
            >
              <p className="text-xs font-medium">
                {dayNames[dateObj.getDay()]}
              </p>{" "}
              {/* הצגת יום השבוע */}
              <p className="font-semibold text-sm">
                {dateObj.getDate().toString().padStart(2, "0")}/
                {(dateObj.getMonth() + 1).toString().padStart(2, "0")}
              </p>{" "}
              {/* הצגת התאריך */}
              {isToday && !isSelected && (
                <div className="h-1 w-1 bg-blue-500 mx-auto mt-1 rounded-full"></div>
              )}
            </motion.div>
          );
        })}
      </div>
      {/* תצוגת השיעורים ליום שנבחר */}
      <div className="px-4 flex flex-col gap-3 pb-6">
        {classes.filter((cls) => cls.date === selectedDate).length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-2">אין שיעורים מתוכננים להיום.</p>
            <p className="text-3xl">🧘‍♀️</p>
          </div>
        ) : (
          classes
            .filter((cls) => cls.date === selectedDate)
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((cls) => (
              <div key={cls.id} className="relative">
                <ClassCard
                  classInfo={cls}
                  employee={employee}
                  isAlreadyBooked={isAlreadyBooked(cls.id)}
                  refreshBookings={fetchUserBookings}
                  isPastClass={isPastClass(cls.date, cls.time)}
                  customers={customers} // <-- זה הפתרון לשגיאה שלך!
                  isAdmin={isAdmin}
                />
                {/* הכפתור "הזמן מקום" הוסר מכאן */}
              </div>
            ))
        )}
        {/* מודאל לצפייה במשתתפים */}
        {showParticipantsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 max-w-sm w-full">
              <h2 className="text-lg font-bold mb-2">משתתפים בשיעור</h2>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {participants.map((p) => (
                  <li key={p.id} className="border-b pb-1">
                    {p.name} ({p.phone})
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowParticipantsModal(false)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                סגור
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SchedulePage;
