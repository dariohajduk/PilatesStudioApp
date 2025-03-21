import React, { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import ClassCard from "../components/ClassCard";
import { db } from "../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ChevronRight, ChevronLeft } from "lucide-react";
import MainLayout from "../components/MainLayout"; // או הנתיב הנכון אצלך

const SchedulePage = ({ employee }) => {
  const today = new Date();

  const formatDate = (dateObj) => {
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getStartOfWeek = (date) => {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek;
    return new Date(date.getFullYear(), date.getMonth(), diff);
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(
    getStartOfWeek(today)
  );
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchClasses();
      await fetchUserBookings();
      setLoading(false);
    };

    loadData();
  }, [employee]);

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeekStart(prevWeek);
    setSelectedDate(formatDate(prevWeek));
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeekStart(nextWeek);
    setSelectedDate(formatDate(nextWeek));
  };

  const isAlreadyBooked = (classId) => {
    return bookings.some((booking) => booking.classId === classId);
  };

  const isPastClass = (classDate, classTime) => {
    const classDateTime = new Date(
      `${classDate.split("/").reverse().join("-")}T${classTime}`
    );
    return classDateTime < new Date();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>טוען שיעורים...</p>
      </div>
    );
  }

  return (
    <MainLayout employee={employee}>
      {" "}
        <div>
        <TopHeader title="לוח שיעורים" />
        <div className="flex justify-between items-center p-4">
          <button
            className="flex items-center text-blue-600"
            onClick={handlePrevWeek}
          >
            <ChevronRight size={16} className="ml-1" />
            הקודם
          </button>

          <h3 className="font-bold">{selectedDate}</h3>

          <button
            className="flex items-center text-blue-600"
            onClick={handleNextWeek}
          >
            הבא
            <ChevronLeft size={16} className="mr-1" />
          </button>
        </div>

        <div className="flex overflow-x-auto px-4 pb-4 no-scrollbar">
          {Array.from({ length: 7 }).map((_, i) => {
            const dateObj = new Date(currentWeekStart);
            dateObj.setDate(currentWeekStart.getDate() + i);

            const dateStr = formatDate(dateObj);
            const isSelected = selectedDate === dateStr;

            const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
            const weekDay = dateObj.getDay();

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

        <div className="px-4">
          {classes.filter((cls) => cls.date === selectedDate).length === 0 ? (
            <p className="text-center text-gray-500 mt-6">
              אין שיעורים ליום זה
            </p>
          ) : (
            classes
              .filter((cls) => cls.date === selectedDate)
              .map((cls) => (
                <ClassCard
                  key={cls.id}
                  classInfo={cls}
                  employee={employee}
                  isAlreadyBooked={isAlreadyBooked(cls.id)}
                  refreshBookings={fetchUserBookings}
                  isPastClass={isPastClass(cls.date, cls.time)} // Pass the new prop
                />
              ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SchedulePage;
