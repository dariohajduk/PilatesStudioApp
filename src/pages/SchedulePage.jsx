import React, { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import ClassCard from "../components/ClassCard";
import { db } from "../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";

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

  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(today));
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes"));
      setClasses(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
      setBookings(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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

  const isAlreadyBooked = (classId) => bookings.some((booking) => booking.classId === classId);

  const isPastClass = (classDate, classTime) => new Date(`${classDate.split("/").reverse().join("-")}T${classTime}`) < new Date();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>טוען שיעורים...</p>
      </div>
    );
  }

  return (
    <MainLayout employee={employee}>
      <TopHeader title="לוח שיעורים" />

      <div className="flex justify-between items-center p-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={handlePrevWeek} className="bg-blue-100 p-2 rounded-full shadow">
          <ChevronRight size={20} className="text-blue-600" />
        </motion.button>
        <h3 className="font-bold text-lg">{selectedDate}</h3>
        <motion.button whileTap={{ scale: 0.9 }} onClick={handleNextWeek} className="bg-blue-100 p-2 rounded-full shadow">
          <ChevronLeft size={20} className="text-blue-600" />
        </motion.button>
      </div>

      <div className="flex overflow-x-auto px-4 pb-4 no-scrollbar">
        {Array.from({ length: 7 }).map((_, i) => {
          const dateObj = new Date(currentWeekStart);
          dateObj.setDate(currentWeekStart.getDate() + i);
          const dateStr = formatDate(dateObj);
          const isSelected = selectedDate === dateStr;
          const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

          return (
            <motion.div
              key={i}
              onClick={() => setSelectedDate(dateStr)}
              whileTap={{ scale: 0.95 }}
              className={`mx-1 w-16 text-center py-3 rounded-xl shadow cursor-pointer transition ${isSelected ? "bg-blue-500 text-white" : "bg-gray-100"}`}
            >
              <p className="text-xs">{dayNames[dateObj.getDay()]}</p>
              <p className="font-semibold text-sm">
                {dateObj.getDate().toString().padStart(2, "0")}/{(dateObj.getMonth() + 1).toString().padStart(2, "0")}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="px-4 flex flex-col gap-3">
        {classes.filter((cls) => cls.date === selectedDate).length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-2">אין שיעורים מתוכננים להיום.</p>
            <p className="text-3xl">🧘‍♀️</p>
          </div>
        ) : (
          classes.filter((cls) => cls.date === selectedDate).map((cls) => (
            <ClassCard
              key={cls.id}
              classInfo={cls}
              employee={employee}
              isAlreadyBooked={isAlreadyBooked(cls.id)}
              refreshBookings={fetchUserBookings}
              isPastClass={isPastClass(cls.date, cls.time)}
            />
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default SchedulePage;
