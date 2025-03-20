// ייבוא React
import React, { useState, useEffect } from "react";

// ייבוא כותרת עליונה
import TopHeader from "../components/TopHeader";

// ייבוא כרטיס שיעור
import ClassCard from "../components/ClassCard";

// ייבוא Firebase
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

// ייבוא אייקונים לנווט שבועות
import { ChevronRight, ChevronLeft } from "lucide-react";

// קומפוננטת עמוד לוח השיעורים
const SchedulePage = () => {
  // היום הנוכחי
  const today = new Date();

  // פונקציה שמחזירה את יום ראשון של השבוע
  const getStartOfWeek = (date) => {
    const dayOfWeek = date.getDay(); // 0 ראשון - 6 שבת
    const diff = date.getDate() - dayOfWeek; // תאריך תחילת השבוע
    return new Date(date.getFullYear(), date.getMonth(), diff);
  };

  // סטייט של יום ראשון של השבוע הנוכחי
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(today));

  // סטייט של תאריך נבחר - מתחיל מהיום
  const formattedToday = formatDate(today);
  const [selectedDate, setSelectedDate] = useState(formattedToday);

  // סטייט לשיעורים
  const [classes, setClasses] = useState([]);

  // סטייט לטעינה
  const [loading, setLoading] = useState(true);

  // טוען שיעורים מ-DB
  const fetchClasses = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "classes"));
      const classesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("🎯 טענו שיעורים:", classesData);
      setClasses(classesData);
    } catch (error) {
      console.error("❌ שגיאה בטעינת השיעורים:", error);
    }
    setLoading(false);
  };

  // טען שיעורים בהעלאה ראשונית
  useEffect(() => {
    fetchClasses();
  }, []);

  // פונקציה לפורמט תאריך ל-DD/MM/YYYY
  function formatDate(dateObj) {
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // מעבר לשבוע קודם
  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeekStart(prevWeek);
    setSelectedDate(formatDate(prevWeek));
  };

  // מעבר לשבוע הבא
  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeekStart(nextWeek);
    setSelectedDate(formatDate(nextWeek));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>טוען שיעורים...</p>
      </div>
    );
  }

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

      {/* גלילה אופקית של ימים בשבוע */}
      <div className="flex overflow-x-auto px-4 pb-4 no-scrollbar">
        {Array.from({ length: 7 }).map((_, i) => {
          const dateObj = new Date(currentWeekStart);
          dateObj.setDate(currentWeekStart.getDate() + i);

          const dateStr = formatDate(dateObj);
          const isSelected = selectedDate === dateStr;

          const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
          const weekDay = dateObj.getDay(); // 0 ראשון - 6 שבת

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

      {/* הצגת שיעורים ליום הנבחר */}
      <div className="px-4">
        {classes.filter((cls) => cls.date === selectedDate).map((cls) => (
          <ClassCard key={cls.id} classInfo={cls} isBooking={false} />
        ))}

        {classes.filter((cls) => cls.date === selectedDate).length === 0 && (
          <p className="text-center text-gray-500 mt-6">אין שיעורים ליום זה</p>
        )}
      </div>
    </div>
  );
};

// ייצוא הקומפוננטה
export default SchedulePage;
