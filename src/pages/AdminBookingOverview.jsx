// ✅ גרסה מעודכנת של AdminBookingOverview.jsx - טבלת חודשים עם משתמשים חדשים והרשמות לשיעורים + גרף טרנד

import React, { useEffect, useState, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import {
  format,
  getMonth,
  getYear,
  parse,
} from "date-fns";
import BackToDashboardButton from "../components/BackToDashboardButton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";


/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
const AdminBookingOverview = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const usersSnap = await getDocs(collection(db, "Users"));
      const bookingsSnap = await getDocs(collection(db, "bookings"));

      const usersByMonth = {};
      usersSnap.docs.forEach((doc) => {
        const data = doc.data();
        let date;
      
        // תומך גם ב-Firebase Timestamp וגם במחרוזת
        if (data.joinDate?.toDate) {
          date = data.joinDate.toDate();
        } else if (typeof data.joinDate === "string") {
          date = new Date(data.joinDate);
          if (isNaN(date.getTime())) return; // תאריך לא תקין
        } else {
          return; // ללא joinDate
        }
      
        const label = `${String(getMonth(date) + 1).padStart(2, "0")}/${getYear(date)}`;
        if (!usersByMonth[label]) usersByMonth[label] = 0;
        usersByMonth[label]++;
      });
      

      const bookingsByMonth = {};
      bookingsSnap.docs.forEach((doc) => {
        const data = doc.data();
        if (!data.date) return;
        const date = parse(data.date, "dd/MM/yyyy", new Date());
        const label = `${String(getMonth(date) + 1).padStart(2, "0")}/${getYear(date)}`;
        if (!bookingsByMonth[label]) bookingsByMonth[label] = 0;
        bookingsByMonth[label]++;
      });

      const allMonths = Array.from(new Set([
        ...Object.keys(usersByMonth),
        ...Object.keys(bookingsByMonth),
      ])).sort((a, b) => {
        const [ma, ya] = a.split("/").map(Number);
        const [mb, yb] = b.split("/").map(Number);
        return ya !== yb ? ya - yb : ma - mb;
      });

      const merged = allMonths.map((label) => ({
        month: label,
        newUsers: usersByMonth[label] || 0,
        bookings: bookingsByMonth[label] || 0,
      }));

      setMonthlyData(merged);
      setLoading(false);
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow text-sm">
          <p className="font-semibold text-blue-700">{label}</p>
          <p>משתמשים חדשים: {payload.find((p) => p.dataKey === "newUsers")?.value ?? 0}</p>
          <p>הרשמות לשיעורים: {payload.find((p) => p.dataKey === "bookings")?.value ?? 0}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">דו"ח חודשי: משתמשים חדשים והרשמות</h1>

      <div className="flex justify-between items-center mb-6">
        <BackToDashboardButton />
      </div>

      {loading ? (
        <p className="text-center">טוען נתונים...</p>
      ) : (
        <>
          <table className="w-full mb-6 text-sm border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="p-2 border">חודש</th>
                <th className="p-2 border">משתמשים חדשים</th>
                <th className="p-2 border">הרשמות לשיעורים</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row) => (
                <tr key={row.month} className="text-center">
                  <td className="border p-1">{row.month}</td>
                  <td className="border p-1">{row.newUsers}</td>
                  <td className="border p-1">{row.bookings}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-lg font-semibold text-blue-700 mb-2">גרף מגמה</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="newUsers" fill="#10B981" name="משתמשים חדשים">
                <LabelList dataKey="newUsers" position="top" />
              </Bar>
              <Bar dataKey="bookings" fill="#3B82F6" name="הרשמות לשיעורים">
                <LabelList dataKey="bookings" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default AdminBookingOverview;
