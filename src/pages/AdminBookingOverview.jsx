import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { getWeek } from "date-fns";
import { parse } from "date-fns";
import BackToDashboardButton from "../components/BackToDashboardButton";

const AdminBookingOverview = () => {
  const [bookingsByWeek, setBookingsByWeek] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, "bookings"));
      const allUsers = await getDocs(collection(db, "Users"));
      const usersMap = {};
      allUsers.forEach((doc) => {
        usersMap[doc.id] = doc.data().name || "לא ידוע";
      });

      const grouped = {};
      snapshot.docs.forEach((docSnap) => {
        const booking = docSnap.data();
        const dateObj = parse(booking.date, "dd/MM/yyyy", new Date());
        const year = dateObj.getFullYear(); // ✅ נוספה שורה זו
        const weekNum = getWeek(dateObj, { weekStartsOn: 0 });
        const weekKey = `${year}-W${weekNum}`;

        if (!grouped[weekKey]) grouped[weekKey] = [];

        grouped[weekKey].push({
          ...booking,
          userName: usersMap[booking.userId] || "לא ידוע",
          registeredAtFormatted: booking.bookedAt
            ? new Date(booking.bookedAt).toLocaleString("he-IL")
            : "לא ידוע",
        });
      });

      setBookingsByWeek(grouped);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        סטטוס נרשמים לשיעורים (שבועי)
      </h1>

      <BackToDashboardButton />

      {loading ? (
        <p className="text-center">טוען נתונים...</p>
      ) : (
        Object.entries(bookingsByWeek).map(([weekKey, bookings]) => (
          <div
            key={weekKey}
            className="mb-6 bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              שבוע {weekKey.replace("-W", " מספר ")}
            </h2>
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-2 border">תאריך</th>
                  <th className="p-2 border">שעה</th>
                  <th className="p-2 border">שיעור</th>
                  <th className="p-2 border">מתאמן</th>
                  <th className="p-2 border">זמן הרשמה</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={i} className="text-center">
                    <td className="border p-1">{b.date}</td>
                    <td className="border p-1">{b.time}</td>
                    <td className="border p-1">{b.className}</td>
                    <td className="border p-1">{b.userName}</td>
                    <td className="border p-1">{b.registeredAtFormatted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminBookingOverview;