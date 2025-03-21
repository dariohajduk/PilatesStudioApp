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
} from "firebase/firestore";
import MainLayout from "../components/MainLayout";

const BookingsPage = ({ employee }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
      setMessage("לא ניתן לבטל הזמנה פחות מ-5 שעות לפני השיעור");
      return;
    }

    try {
      // מחיקת ההזמנה
      await deleteDoc(doc(db, "bookings", bookingId));

      // החזרת מקום פנוי בשיעור
      const classRef = doc(db, "classes", classId);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      if (currentClass) {
        await updateDoc(classRef, {
          spots: currentClass.spots + 1,
        });
      }

      setMessage("ההזמנה בוטלה בהצלחה ✅");
      fetchBookings(); // מרענן את רשימת ההזמנות
    } catch (error) {
      console.error("❌ שגיאה בביטול ההזמנה:", error);
      setMessage("שגיאה בביטול ההזמנה");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>טוען הזמנות...</p>
      </div>
    );
  }

  return (
    <MainLayout employee={employee}>
      {" "}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">ההזמנות שלי</h1>

        {message && <p className="text-green-600 mb-4">{message}</p>}

        {bookings.length === 0 ? (
          <p className="text-muted">אין לך הזמנות פעילות כרגע.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="bg-white shadow p-4 rounded relative"
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
                  } // 👈 הוספתי את classId
                  className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  בטל הזמנה
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  );
};

export default BookingsPage;
