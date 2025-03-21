import React, { useState, useEffect } from "react";

// קומפוננטות
import TopHeader from "../components/TopHeader";
import ClassCard from "../components/ClassCard";

// Firebase
import { db } from "../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Icons
import { ChevronRight, ChevronLeft } from "lucide-react";

const SchedulePage = ({ employee }) => {
  // היום הנוכחי
  const today = new Date();

  // פורמט תאריך DD/MM/YYYY
  const formatDate = (dateObj) => {
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // קביעת היום הראשון של השבוע (ראשון)
  const getStartOfWeek = (date) => {
    const dayOfWeek = date.getDay(); // 0 ראשון - 6 שבת
    const diff = date.getDate() - dayOfWeek;
    return new Date(date.getFullYear(), date.getMonth(), diff);
  };

  // סטייטים
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(today));
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]); // הזמנות של המשתמש
  const [loading, setLoading] = useState(true);

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

  // טוען את כל ההזמנות של המשתמש המחובר
  const fetchUserBookings = async () => {
    if (!employee) return;

    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("userId", "==", employee.phone));
      const querySnapshot = await getDocs(q);

      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingsData);
    } catch (error) {
      console.error("❌ שגיאה בטעינת ההזמנות של המשתמש:", error);
    }
  };

  // קריאות ראשוניות לטעינת שיעורים והזמנות
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchClasses();
      await fetchUserBookings();
      setLoading(false);
    };

    loadData();
  }, [employee]); // ירוץ כל פעם שמשתמש מתחבר/מתנתק

  // מעבר שבוע קודם
  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeekStart(prevWeek);
    setSelectedDate(formatDate(prevWeek));
  };

  // מעבר שבוע הבא
  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeekStart(nextWeek);
    setSelectedDate(formatDate(nextWeek));
  };

  // ספינר בזמן טעינה
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>טוען שיעורים...</p>
      </div>
    );
  }

  // בדיקה אם המשתמש כבר נרשם לשיעור מסוים
  const isAlreadyBooked = (classId) => {
    return bookings.some((booking) => booking.classId === classId);
  };

  return (
    <div>
      {/* כותרת עליונה */}
      <TopHeader title="לוח שיעורים" />

      {/* ניווט שבועי */}
      <div className="flex justify-between items-center p-4">
        <button className="flex items-center text-blue-600" onClick={handlePrevWeek}>
          <ChevronRight size={16} className="ml-1" />
          הקודם
        </button>

        <h3 className="font-bold">{selectedDate}</h3>

        <button className="flex items-center text-blue-600" onClick={handleNextWeek}>
          הבא
          <ChevronLeft size={16} className="mr-1" />
        </button>
      </div>

      {/* גלילה של ימים */}
      <div className="flex overflow-x-auto px-4 pb-4 no-scrollbar">
        {Array.from({ length: 7 }).map((_, i) => {
          const dateObj = new Date(currentWeekStart);
          dateObj.setDate(currentWeekStart.getDate() + i);

          const dateStr = formatDate(dateObj);
          const isSelected = selectedDate === dateStr;

          const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
          const weekDay = dateObj.getDay(); // 0 ראשון

          return (
            <div
              key={i}
              onClick={() => setSelectedDate(dateStr)}
              className={`flex-shrink-0 mx-2 w-16 text-center py-3 px-1 rounded-lg shadow-sm cursor-pointer ${
                isSelected ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              <p className="text-xs mb-1">{dayNames[weekDay]}</p>
              <p className="font-bold">
                {dateObj.getDate().toString().padStart(2, "0")}/
                {(dateObj.getMonth() + 1).toString().padStart(2, "0")}
              </p>
            </div>
          );
        })}
      </div>

      {/* הצגת שיעורים */}
      <div className="px-4">
        {classes.filter((cls) => cls.date === selectedDate).length === 0 ? (
          <p className="text-center text-gray-500 mt-6">אין שיעורים ליום זה</p>
        ) : (
          classes
            .filter((cls) => cls.date === selectedDate)
            .map((cls) => (
              <ClassCard
                key={cls.id}
                classInfo={cls}
                employee={employee}
                isAlreadyBooked={isAlreadyBooked(cls.id)} // ✅ מעביר אינדיקציה אם רשום
                refreshBookings={fetchUserBookings} // ✅ רענון הזמנות אחרי רישום
              />
            ))
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
