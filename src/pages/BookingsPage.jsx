import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import MainLayout from "../components/MainLayout";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";


const BookingsPage = ({ employee }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("userId", "==", employee.phone));
      const querySnapshot = await getDocs(q);

      const bookingsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingsList);
    } catch (error) {
      console.error("❌ שגיאה בטעינת ההזמנות:", error);
      toast.error("שגיאה בטעינת ההזמנות");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  const getWeeklyBookingsCount = async (userPhone) => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // ראשון
    startOfWeek.setHours(0, 0, 0, 0);
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
  
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", userPhone)
    );
  
    const snapshot = await getDocs(q);
    const weeklyBookings = snapshot.docs.filter((doc) => {
      const bookingDate = doc.data().date;
      const bookingTime = doc.data().time;
      const bookingDateTime = new Date(`${bookingDate.split("/").reverse().join("-")}T${bookingTime}`);
      return bookingDateTime >= startOfWeek && bookingDateTime <= endOfWeek;
    });
  
    return weeklyBookings.length;
  };
  
  const handleCancelBooking = async (
    bookingId,
    classId,
    classDate,
    classTime
  ) => {
    const classDateTime = new Date(
      `${classDate.split("/").reverse().join("-")}T${classTime}`
    );
    const now = new Date();
    const hoursDifference = (classDateTime - now) / (1000 * 60 * 60);

    if (hoursDifference < 5) {
      toast("❗ לא ניתן לבטל הזמנה פחות מ-5 שעות לפני השיעור");
      return;
    }

    const reason = prompt("(לא חובה) ניתן להזין סיבה לביטול:") || "";

    try {
      await deleteDoc(doc(db, "bookings", bookingId));

      const classRef = doc(db, "classes", classId);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      if (currentClass) {
        await updateDoc(classRef, {
          spots: currentClass.spots + 1,
        });
      }

      await setDoc(doc(db, "cancellations", bookingId), {
        userId: employee.phone,
        classId,
        date: classDate,
        time: classTime,
        reason,
        cancelledAt: new Date(),
      });

      toast.success("✔️ ההזמנה בוטלה בהצלחה");
      fetchBookings();
    } catch (error) {
      console.error("❌ שגיאה בביטול ההזמנה:", error);
      toast.error("❌ שגיאה בביטול ההזמנה");
    }
  };

  const handleBooking = async () => {
    const selectedUser = users.find((u) => u.phone === selectedPhone);
    if (!selectedUser) {
      return toast.error("יש לבחור משתמש תקין");
    }

    // Check if the user has remaining lessons
    if (selectedUser.remainingLessons <= 0) {
      return toast.error("אין למשתמש זה שיעורים זמינים");
    }

    try {
      // Proceed with booking
      await addDoc(collection(db, "bookings"), {
        userId: selectedUser.phone,
        userName: selectedUser.name,
        classId: classInfo.id,
        className: classInfo.name,
        instructor: classInfo.instructor,
        date: classInfo.date,
        time: classInfo.time,
        createdAt: new Date(),
      });

      // Decrease the user's remaining lessons
      const userRef = doc(db, "users", selectedUser.phone);
      await updateDoc(userRef, {
        remainingLessons: selectedUser.remainingLessons - 1,
      });

      toast.success("✔️ ההזמנה בוצעה בהצלחה");
      refreshBookings?.();
      onClose();
    } catch (e) {
      console.error("❌ שגיאה בהזמנה:", e);
      toast.error("❌ שגיאה בהזמנה");
    }
  };

  const isPastClass = (date, time) => {
    const classDateTime = new Date(`${date.split("/").reverse().join("-")}T${time}`);
    return classDateTime < new Date();
  };

  const futureBookings = bookings
    .filter((b) => !isPastClass(b.date, b.time))
    .sort((a, b) => {
      const aDate = new Date(`${a.date.split("/").reverse().join("-")}T${a.time}`);
      const bDate = new Date(`${b.date.split("/").reverse().join("-")}T${b.time}`);
      return aDate - bDate;
    });

  const pastBookings = bookings
    .filter((b) => isPastClass(b.date, b.time))
    .sort((a, b) => {
      const aDate = new Date(`${a.date.split("/").reverse().join("-")}T${a.time}`);
      const bDate = new Date(`${b.date.split("/").reverse().join("-")}T${b.time}`);
      return bDate - aDate;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>טוען הזמנות...</p>
      </div>
    );
  }

  return (
    <MainLayout employee={employee}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">השיעורים שלי</h1>

        {futureBookings.length === 0 && pastBookings.length === 0 ? (
          <p className="text-muted">אין לך הזמנות פעילות כרגע.</p>
        ) : (
          <>
            {futureBookings.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-4 mb-2">שיעורים עתידיים</h2>
                <ul className="space-y-4">
                  <AnimatePresence>
                    {futureBookings.map((booking) => (
                      <motion.li
                        key={booking.id}
                        className="bg-white shadow p-4 rounded relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        layout
                      >
                        <h2 className="text-lg font-bold mb-2">{booking.className}</h2>
                        <p>מדריך: {booking.instructor}</p>
                        <p>תאריך: {booking.date}</p>
                        <p>שעה: {booking.time}</p>
                        <button
                          onClick={() =>
                            handleCancelBooking(
                              booking.id,
                              booking.classId,
                              booking.date,
                              booking.time
                            )
                          }
                          className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          בטל הזמנה
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </>
            )}

            {pastBookings.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-6 mb-2">שיעורים שעברו</h2>
                <ul className="space-y-4">
                  <AnimatePresence>
                    {pastBookings.map((booking) => (
                      <motion.li
                        key={booking.id}
                        className="bg-gray-100 shadow p-4 rounded"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        layout
                      >
                        <h2 className="text-lg font-bold mb-2">{booking.className}</h2>
                        <p>מדריך: {booking.instructor}</p>
                        <p>תאריך: {booking.date}</p>
                        <p>שעה: {booking.time}</p>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default BookingsPage;
