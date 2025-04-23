import React, { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import ClassCard from "../components/ClassCard";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { useUser } from "../context/UserContext";

/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
/**
 * TODO: תאר את הפונקציה HomePage
 */
const HomePage = ({ employee }) => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();

  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes"));
      const classesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const now = new Date();
      const endOfTomorrow = new Date();
      endOfTomorrow.setDate(now.getDate() + 1);
      endOfTomorrow.setHours(23, 59, 59, 999);

      const filteredClasses = classesData.filter((cls) => {
        const classDateTime = new Date(
          `${cls.date.split("/").reverse().join("-")}T${cls.time}`
        );
        return classDateTime >= now && classDateTime <= endOfTomorrow;
      });

      filteredClasses.sort((a, b) => {
        const dateA = new Date(
          `${a.date.split("/").reverse().join("-")}T${a.time}`
        );
        const dateB = new Date(
          `${b.date.split("/").reverse().join("-")}T${b.time}`
        );
        return dateA - dateB;
      });

      setUpcomingClasses(filteredClasses);
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
      console.error("❌ שגיאה בטעינת ההזמנות:", error);
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

  const isAlreadyBooked = (classId) => {
    return bookings.some((booking) => booking.classId === classId);
  };

  const isPastClass = (classDate, classTime) => {
    const classDateTime = new Date(
      `${classDate.split("/").reverse().join("-")}T${classTime}`
    );
    return classDateTime < new Date();
  };

  const handleCancelBooking = async (classId) => {
    // לוגיקת ביטול הזמנה
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <TopHeader title="ברוכים הבאים לסטודיו מילאן" />

        <div className="mt-4">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow-lg mb-6">
            <p className="font-bold text-lg mb-2">✨ המלצת היום! ✨</p>
            {upcomingClasses.length > 0 ? (
              <ClassCard
                classInfo={upcomingClasses[0]}
                employee={employee}
                userData={userData}
                isAlreadyBooked={isAlreadyBooked(upcomingClasses[0].id)}
                refreshBookings={fetchUserBookings}
                isPastClass={isPastClass(
                  upcomingClasses[0].date,
                  upcomingClasses[0].time
                )}
              />
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
                  userData={userData}
                  isAlreadyBooked={isAlreadyBooked(cls.id)}
                  refreshBookings={fetchUserBookings}
                  isPastClass={isPastClass(cls.date, cls.time)}
                  handleCancelBooking={handleCancelBooking}
                />
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default HomePage;
