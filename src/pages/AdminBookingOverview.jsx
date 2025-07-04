import React, { useEffect, useState, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import {
  getWeek,
  parse,
  format,
  getMonth,
  startOfWeek,
  startOfMonth,
  subWeeks,
  subMonths,
  addWeeks,
  addMonths,
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
  Line,
  LabelList,
  Legend,
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
  const [bookingsByGroup, setBookingsByGroup] = useState({});
  const [filterType, setFilterType] = useState("week");
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [usersMap, setUsersMap] = useState({});
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, "bookings"));
      const allUsers = await getDocs(collection(db, "Users"));
      const usersMapTemp = {};
      allUsers.forEach((doc) => {
        usersMapTemp[doc.id] = doc.data().name || "לא ידוע";
      });
      setUsersMap(usersMapTemp);

      const grouped = {};
      snapshot.docs.forEach((docSnap) => {
        const booking = docSnap.data();
        if (!booking.date) return;
        const dateObj = parse(booking.date, "dd/MM/yyyy", new Date());
        const year = dateObj.getFullYear();
        let groupKey = "";
        if (filterType === "week") {
          const weekNum = getWeek(dateObj, { weekStartsOn: 0 });
          groupKey = `שבוע ${weekNum}`;
        } else if (filterType === "month") {
          groupKey = `${year}/${getMonth(dateObj) + 1}`;
        } else {
          groupKey = format(dateObj, "dd/MM/yyyy");
        }
        if (!grouped[groupKey]) grouped[groupKey] = [];
        grouped[groupKey].push({
          ...booking,
          userName: usersMapTemp[booking.userId] || "לא ידוע",
        });
      });

      const allPeriods = generateLastPeriods();
      allPeriods.forEach((period) => {
        if (!grouped[period.label]) {
          grouped[period.label] = [];
        }
      });

      setPeriods(allPeriods);
      setBookingsByGroup(grouped);
      setLoading(false);
    };

    fetchBookings();
  }, [filterType]);

  const generateLastPeriods = () => {
    const now = new Date();
    const periods = [];
    for (let i = 4; i >= -1; i--) {
      let d;
      if (filterType === "week") {
        d = i > 0
          ? subWeeks(startOfWeek(now, { weekStartsOn: 0 }), i)
          : addWeeks(startOfWeek(now, { weekStartsOn: 0 }), Math.abs(i));
        periods.push({ label: `שבוע ${getWeek(d, { weekStartsOn: 0 })}` });
      } else if (filterType === "month") {
        d = i > 0 ? subMonths(startOfMonth(now), i) : addMonths(startOfMonth(now), Math.abs(i));
        periods.push({ label: `${d.getFullYear()}/${d.getMonth() + 1}` });
      }
    }
    return periods;
  };

  const chartData = useMemo(() => {
    const orderedPeriods = [...periods].sort((a, b) => {
      if (filterType === "week") {
        const weekA = parseInt(a.label.split(" ")[1]);
        const weekB = parseInt(b.label.split(" ")[1]);
        return weekA - weekB;
      }
      return 0;
    });

    return orderedPeriods.map((period, i) => {
      const label = period.label;
      const count = bookingsByGroup[label]?.length || 0;
      const prevLabel = i > 0 ? orderedPeriods[i - 1].label : null;
      const prevCount = prevLabel ? bookingsByGroup[prevLabel]?.length || 0 : 0;

      let change = 0;
      if (prevCount === 0 && count > 0) change = 100;
      else if (prevCount > 0 && count === 0) change = -100;
      else if (prevCount > 0) change = ((count - prevCount) / prevCount) * 100;

      return {
        name: label,
        count,
        change: parseFloat(change.toFixed(1)),
      };
    });
  }, [bookingsByGroup, periods, filterType]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const count = payload.find((p) => p.dataKey === "count")?.value ?? 0;
      const change = payload.find((p) => p.dataKey === "change")?.value ?? 0;
      return (
        <div className="bg-white p-2 border rounded shadow text-sm">
          <p className="font-semibold text-blue-700">{label}</p>
          <p>כמות נרשמים: {count}</p>
          <p>שינוי מהתקופה הקודמת: {change}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        מגמת הרשמות לשיעורים ({filterType === "week" ? "שבועי" : filterType === "month" ? "חודשי" : "יומי"})
      </h1>

      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <BackToDashboardButton />
        <select
          className="border p-2 rounded text-sm"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setLoading(true);
            setSelectedGroup(null);
          }}
        >
          <option value="week">שבועי</option>
          <option value="month">חודשי</option>
          <option value="day">יומי</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">טוען נתונים...</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                yAxisId="left"
                orientation="left"
                allowDecimals={false}
                label={{ value: "כמות נרשמים", angle: -90, position: "insideLeft" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[-100, 100]}
                tickFormatter={(v) => `${v}%`}
                label={{ value: "שינוי באחוזים", angle: -90, position: "insideRight" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#3B82F6" animationDuration={800} onClick={(data) => setSelectedGroup(data.name)}>
                <LabelList dataKey="count" position="top" fill="#111827" fontSize={12} />
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="change" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="% שינוי">
                <LabelList dataKey="change" position="top" fill="#EF4444" fontSize={12} formatter={(value) => `${value}%`} />
              </Line>
            </BarChart>
          </ResponsiveContainer>

          {selectedGroup && (
            <div className="mt-6 bg-white border rounded shadow p-4">
              <h2 className="text-lg font-semibold text-blue-600 mb-2">
                פירוט הרשמות לתקופה: {selectedGroup}
              </h2>
              <div className="mb-2 text-sm">
                <span className="font-medium">סה"כ רשומים: </span>
                <span>{totalSelected}</span>
                {chartData.find((item) => item.name === selectedGroup)?.change !== 0 && (
                  <span className="mr-4">
                    <span className="font-medium">שינוי מהתקופה הקודמת: </span>
                    <span className={chartData.find((item) => item.name === selectedGroup)?.change > 0 ? "text-green-600" : "text-red-600"}>
                      {chartData.find((item) => item.name === selectedGroup)?.change}%
                    </span>
                  </span>
                )}
              </div>
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-center">
                    <th className="p-2 border">מתאמן</th>
                    <th className="p-2 border">מספר הרשמות</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(selectedDetails)
                    .sort(([, a], [, b]) => b - a)
                    .map(([name, count]) => (
                      <tr key={name} className={`text-center ${count >= 3 ? "bg-green-100" : ""}`}>
                        <td className="border p-1">{name}</td>
                        <td className="border p-1">{count}</td>
                      </tr>
                    ))}
                  <tr className="font-bold bg-gray-50 text-center">
                    <td className="border p-1">סה"כ</td>
                    <td className="border p-1">{totalSelected}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBookingOverview;