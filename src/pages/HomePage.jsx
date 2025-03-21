import React, { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import ClassCard from "../components/ClassCard";
import { db } from "../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { motion } from "framer-motion";

const HomePage = ({ employee }) => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [bookings, setBookings] = useState([]); // הזמנות של המשתמש
  const [loading, setLoading] = useState(true);

  // שליפת שיעורים מה-DB
  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes"));
      const classesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const futureClasses = classesData.filter((cls) => {
        const classDateTime = new Date(`${cls.date.split('/').reverse().join('-')}T${cls.time}`);
        return classDateTime > new Date();
      });

      setUpcomingClasses(futureClasses);
    } catch (error) {
      console.error("❌ שגיאה בטעינת השיעורים:", error);
    }
  };

  // שליפת ההזמנות של המשתמש
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
      console.error("❌ שגיאה בטעינת ההזמנות:", error);
    }
  };

  // קריאות ראשוניות
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchClasses();
      await fetchUserBookings();
      setLoading(false);
    };

    loadData();
  }, [employee]);

  // בדיקה אם המשתמש רשום לשיעור מסוים
  const isAlreadyBooked = (classId) => {
    return bookings.some((booking) => booking.classId === classId);
  };

  // בדיקה אם השיעור עבר
  const isPastClass = (classDate, classTime) => {
    const classDateTime = new Date(`${classDate.split('/').reverse().join('-')}T${classTime}`);
    return classDateTime < new Date();
  };

  // ביטול הזמנה
  const handleCancelBooking = async (classId) => {
    // הוספת לוגיקה לביטול הזמנה כאן
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>טוען שיעורים...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <TopHeader title="ברוכים הבאים לסטודיו מילאן" />

      <div className="mt-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="font-medium mb-2">המלצת היום:</p>
          {upcomingClasses.length > 0 ? (
            <p>
              שיעור {upcomingClasses[0].name} עם {upcomingClasses[0].instructor}{" "}
              ב-{upcomingClasses[0].time}! מומלץ במיוחד למתחילים.
            </p>
          ) : (
            <p>אין שיעורים זמינים להמלצה כרגע.</p>
          )}
        </div>

        <h2 className="text-lg font-bold mb-3">שיעורים קרובים</h2>

        {upcomingClasses.length === 0 ? (
          <p className="text-gray-500">לא נמצאו שיעורים קרובים.</p>
        ) : (
          upcomingClasses.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ClassCard
                classInfo={cls}
                employee={employee}
                isAlreadyBooked={isAlreadyBooked(cls.id)} // ✅ בדיקה אם כבר רשום
                refreshBookings={fetchUserBookings}       // ✅ רענון ההזמנות לאחר פעולה
                isPastClass={isPastClass(cls.date, cls.time)} // ✅ בדיקה אם השיעור עבר
                handleCancelBooking={handleCancelBooking} // ✅ פונקציה לביטול הזמנה
              />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default HomePage;
