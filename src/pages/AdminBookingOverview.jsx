// src/pages/AdminBookingOverview.jsx
import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../services/firebase";
import BackToDashboardButton from "../components/BackToDashboardButton";
import toast from "react-hot-toast";
import {
  BarChart as BarChartIcon,
  RefreshCw,
  CalendarRange,
  Download,
  Loader2,
  Info,
} from "lucide-react";
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

/* ---------------- Utils ---------------- */
const pad = (n) => String(n).padStart(2, "0");

// month value: 'YYYY-MM'
const lastNMonths = (n = 12) => {
  const arr = [];
  const d = new Date();
  d.setDate(1); // normalize to 1st of month
  for (let i = 0; i < n; i++) {
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    arr.unshift(`${y}-${pad(m)}`);
    d.setMonth(d.getMonth() - 1);
  }
  return arr;
};
const monthLabel = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  return `${pad(m)}/${y}`;
};
const firstDayYMD = (ym) => `${ym}-01`;
const lastDayYMD = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  const last = new Date(y, m, 0).getDate();
  return `${y}-${pad(m)}-${pad(last)}`;
};
// Parse "dd/MM/yyyy" safely
const parseDMY = (str) => {
  if (!str || typeof str !== "string") return null;
  const [d, m, y] = str.split("/").map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return isNaN(dt.getTime()) ? null : dt;
};
const toMonthKey = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;

// Skeleton row for table
const RowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="border p-2"><div className="h-4 bg-gray-200 rounded w-20 mx-auto" /></td>
    <td className="border p-2"><div className="h-4 bg-gray-200 rounded w-16 mx-auto" /></td>
    <td className="border p-2"><div className="h-4 bg-gray-200 rounded w-16 mx-auto" /></td>
  </tr>
);

const AdminBookingOverview = () => {
  // Controls
  const [fromMonth, setFromMonth] = useState(lastNMonths(12)[0]); // YYYY-MM
  const [toMonth, setToMonth] = useState(lastNMonths(12).slice(-1)[0]); // YYYY-MM
  // Data
  const [loading, setLoading] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(false);

  const monthsRange = useMemo(() => {
    // build inclusive months between fromMonth and toMonth
    const [fy, fm] = fromMonth.split("-").map(Number);
    const [ty, tm] = toMonth.split("-").map(Number);
    const start = new Date(fy, fm - 1, 1);
    const end = new Date(ty, tm - 1, 1);
    const out = [];
    const d = new Date(start);
    while (d <= end) {
      out.push(`${d.getFullYear()}-${pad(d.getMonth() + 1)}`);
      d.setMonth(d.getMonth() + 1);
    }
    return out;
  }, [fromMonth, toMonth]);

  const totals = useMemo(() => {
    const users = monthlyData.reduce((s, r) => s + r.newUsers, 0);
    const bookings = monthlyData.reduce((s, r) => s + r.bookings, 0);
    return { users, bookings };
  }, [monthlyData]);

  const load = async () => {
    setLoading(true);
    setFallbackUsed(false);
    try {
      // ---- Users: single read + client filter (supports Timestamp/ISO) ----
      const usersSnap = await getDocs(collection(db, "Users"));
      const users = usersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const usersByMonth = {};
      for (const u of users) {
        let dt = null;
        if (u.joinDate && typeof u.joinDate?.toDate === "function") {
          dt = u.joinDate.toDate();
        } else if (typeof u.joinDate === "string") {
          const t = new Date(u.joinDate);
          if (!isNaN(t.getTime())) dt = t;
        }
        if (!dt) continue;
        const mk = toMonthKey(dt);
        // keep only in requested range
        if (mk < monthsRange[0] || mk > monthsRange[monthsRange.length - 1]) continue;
        usersByMonth[mk] = (usersByMonth[mk] || 0) + 1;
      }

      // ---- Bookings: prefer server filtering by dayKey (YYYY-MM-DD) ----
      const startYMD = firstDayYMD(monthsRange[0]);
      const endYMD = lastDayYMD(monthsRange[monthsRange.length - 1]);
      let bookingsDocs = [];
      try {
        // Single-field where + orderBy on same field – לא דורש אינדקס מרוכב
        const q1 = query(
          collection(db, "bookings"),
          where("dayKey", ">=", startYMD),
          where("dayKey", "<=", endYMD),
          orderBy("dayKey", "asc")
        );
        const s1 = await getDocs(q1);
        bookingsDocs = s1.docs.map((d) => ({ id: d.id, ...d.data() }));
      } catch (e) {
        // אם אין dayKey / או טעות – מפעילים Fallback
        console.warn("No dayKey query, falling back to client aggregation.", e);
      }

      let bookingsByMonth = {};
      if (bookingsDocs.length > 0) {
        // Aggregate via dayKey
        for (const b of bookingsDocs) {
          let mk = null;
          if (b.dayKey) {
            // dayKey: YYYY-MM-DD
            mk = b.dayKey.slice(0, 7);
          } else if (b.date) {
            const dt = parseDMY(b.date);
            if (dt) mk = toMonthKey(dt);
          }
          if (!mk) continue;
          if (mk < monthsRange[0] || mk > monthsRange[monthsRange.length - 1]) continue;
          bookingsByMonth[mk] = (bookingsByMonth[mk] || 0) + 1;
        }
      } else {
        // Fallback – קורא את כל ה-bookings (או עד תקרה) ומחשב מקומית
        setFallbackUsed(true);
        const sAll = await getDocs(
          // אם יש הרבה מאוד מסמכים, אפשר להעלות/להוריד את התקרה
          query(collection(db, "bookings"), limit(5000))
        );
        const all = sAll.docs.map((d) => ({ id: d.id, ...d.data() }));
        for (const b of all) {
          let mk = null;
          if (b.dayKey) {
            mk = b.dayKey.slice(0, 7);
          } else if (b.date) {
            const dt = parseDMY(b.date);
            if (dt) mk = toMonthKey(dt);
          }
          if (!mk) continue;
          if (mk < monthsRange[0] || mk > monthsRange[monthsRange.length - 1]) continue;
          bookingsByMonth[mk] = (bookingsByMonth[mk] || 0) + 1;
        }
      }

      // ---- Merge to array for table & chart ----
      const merged = monthsRange.map((mk) => ({
        monthKey: mk,
        month: monthLabel(mk),
        newUsers: usersByMonth[mk] || 0,
        bookings: bookingsByMonth[mk] || 0,
      }));

      setMonthlyData(merged);
    } catch (e) {
      console.error(e);
      toast.error("שגיאה בטעינת הדוח");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // auto load on range change
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromMonth, toMonth]);

  const refresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const exportCSV = () => {
    const rows = [["חודש", "משתמשים חדשים", "הרשמות"]];
    monthlyData.forEach((r) => rows.push([r.month, r.newUsers, r.bookings]));
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monthly_overview.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const getVal = (k) => payload.find((p) => p.dataKey === k)?.value ?? 0;
      return (
        <div className="bg-white p-2 border rounded shadow text-sm">
          <p className="font-semibold text-blue-700">{label}</p>
          <p>משתמשים חדשים: {getVal("newUsers")}</p>
          <p>הרשמות לשיעורים: {getVal("bookings")}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div dir="rtl" className="p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <BarChartIcon size={22} />
          דו״ח חודשי: משתמשים חדשים והרשמות
        </h1>
        <BackToDashboardButton />
      </div>

      {/* Controls */}
      <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-3 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-end">
          <div>
            <label className="text-xs text-gray-500 block mb-1">מתאריך (חודש)</label>
            <input
              type="month"
              value={fromMonth}
              max={toMonth}
              onChange={(e) => setFromMonth(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">עד תאריך (חודש)</label>
            <input
              type="month"
              value={toMonth}
              min={fromMonth}
              onChange={(e) => setToMonth(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                const arr = lastNMonths(12);
                setFromMonth(arr[0]);
                setToMonth(arr[arr.length - 1]);
              }}
              className="px-3 py-2 border rounded-lg text-sm flex items-center gap-1"
            >
              <CalendarRange size={16} /> 12 חודשים אחרונים
            </button>
          </div>

          <div className="flex gap-2 md:col-span-2 md:justify-end">
            <button
              onClick={refresh}
              disabled={refreshing || loading}
              className="px-3 py-2 border rounded-lg text-sm flex items-center gap-1"
            >
              <RefreshCw size={16} className={(refreshing || loading) ? "animate-spin" : ""} />
              רענון
            </button>
            <button
              onClick={exportCSV}
              disabled={!monthlyData.length}
              className="px-3 py-2 border rounded-lg text-sm flex items-center gap-1"
            >
              <Download size={16} />
              ייצוא CSV
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">
            משתמשים חדשים: <strong>{totals.users}</strong>
          </span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">
            הרשמות: <strong>{totals.bookings}</strong>
          </span>

          {fallbackUsed && (
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg">
              <Info size={16} />
              אין שדה <code className="px-1 bg-amber-100 rounded">dayKey</code> לכל ההרשמות, הופעל Fallback (מוגבל עד 5000 מסמכים).
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="[&>th]:px-3 [&>th]:py-2 text-gray-600 text-center">
              <th>חודש</th>
              <th>משתמשים חדשים</th>
              <th>הרשמות לשיעורים</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <RowSkeleton key={i} />)
              : monthlyData.map((row) => (
                  <tr key={row.monthKey} className="border-t last:border-b-0 hover:bg-gray-50">
                    <td className="p-2">{row.month}</td>
                    <td className="p-2">{row.newUsers}</td>
                    <td className="p-2">{row.bookings}</td>
                  </tr>
                ))}
            {!loading && !monthlyData.length && (
              <tr>
                <td colSpan={3} className="py-6 text-gray-500">
                  אין נתונים בטווח שנבחר
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">גרף מגמה</h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-3">
          {loading ? (
            <div className="h-[320px] flex items-center justify-center text-gray-500">
              <Loader2 className="animate-spin mr-2" /> טוען גרף...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={monthlyData}
                margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookingOverview;
