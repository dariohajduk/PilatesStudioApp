import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

import { Users, UserCog, ClipboardList, PaintBucket } from "lucide-react";

import AdminUsersPanel from "./AdminUsersPanel";
import AdminInstructorsPanel from "./AdminInstructorsPanel";
import AdminClassesPanel from "./AdminClassesPanel";

const AdminDashboard = ({ employee }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchBookings();
    }
  }, [selectedFilter, users]);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "Users");
      const snapshot = await getDocs(usersRef);
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("❌ שגיאה בטעינת משתמשים:", error);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const bookingsRef = collection(db, "bookings");
      const snapshot = await getDocs(query(bookingsRef, orderBy("date")));

      const data = snapshot.docs.map((doc) => doc.data());
      const filtered = filterBookings(data, selectedFilter);

      setBookings(filtered);
    } catch (error) {
      console.error("❌ שגיאה בטעינת הזמנות:", error);
    }
    setLoading(false);
  };

  const filterBookings = (data, filter) => {
    const today = new Date();

    if (filter === "week") {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      return data.filter((b) => {
        const [day, month, year] = b.date.split("/");
        const bookingDate = new Date(`${year}-${month}-${day}`);
        return bookingDate >= weekStart && bookingDate <= weekEnd;
      });
    }

    if (filter === "month") {
      return data.filter((b) => {
        const [day, month, year] = b.date.split("/");
        const bookingDate = new Date(`${year}-${month}-${day}`);
        return (
          bookingDate.getMonth() === today.getMonth() &&
          bookingDate.getFullYear() === today.getFullYear()
        );
      });
    }

    return data;
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.phone === userId || u.id === userId);
    return user ? user.name : "לא ידוע";
  };

  return (
    <div className="p-4 pt-28 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        ניהול מערכת
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-10">
        <button
          onClick={() => setActiveTab("manageUsers")}
          className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          <div className="flex flex-col items-start text-right">
            <span className="text-lg font-bold">ניהול לקוחות</span>
            <span className="text-sm text-blue-100">הוספה / עריכה / מחיקה</span>
          </div>
          <Users size={28} />
        </button>

        <button
          onClick={() => setActiveTab("manageInstructors")}
          className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-purple-700 text-white py-4 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          <div className="flex flex-col items-start text-right">
            <span className="text-lg font-bold">ניהול מדריכים</span>
            <span className="text-sm text-purple-100">ניהול צוות מדריכים</span>
          </div>
          <UserCog size={28} />
        </button>

        <button
          onClick={() => setActiveTab("manageClasses")}
          className="flex items-center justify-between bg-gradient-to-r from-green-500 to-green-700 text-white py-4 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          <div className="flex flex-col items-start text-right">
            <span className="text-lg font-bold">ניהול שיעורים</span>
            <span className="text-sm text-green-100">לוח שיעורים והזמנות</span>
          </div>
          <ClipboardList size={28} />
        </button>
      </div>

      {/* סוויץ טאבים - מציג את הקומפוננטות לפי הבחירה */}
      {activeTab === "manageUsers" && <AdminUsersPanel />}
      {activeTab === "manageInstructors" && <AdminInstructorsPanel />}
      {activeTab === "manageClasses" && <AdminClassesPanel />}

      {/* תוכן ברירת מחדל אם אין טאב פעיל */}
      {!activeTab && (
        <>
          <div className="flex justify-end gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedFilter === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedFilter("week")}
            >
              שבוע נוכחי
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedFilter === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedFilter("month")}
            >
              חודש נוכחי
            </button>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 mt-6">טוען נתונים...</div>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-4">
                סה"כ הזמנות: {bookings.length}
              </h3>

              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full text-sm text-right">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3">שם משתמש</th>
                      <th className="p-3">תאריך</th>
                      <th className="p-3">שיעור</th>
                      <th className="p-3">שעה</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index} className="border-t hover:bg-gray-50">
                        <td className="p-3">{getUserName(booking.userId)}</td>
                        <td className="p-3">{booking.date}</td>
                        <td className="p-3">{booking.name}</td>
                        <td className="p-3">{booking.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
