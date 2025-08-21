// src/pages/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  UserCog,
  ClipboardList,
  ShieldCheck,
  AlarmClock,
  UserPlus,
  ListChecks,
  Ban,
  RotateCw,
} from "lucide-react";

import { db } from "../services/firebase";
import {
  collection,
  query,
  where,
  getCountFromServer,
  getDocs,
} from "firebase/firestore";

/* ---------- Reusable cards ---------- */
const StatCard = ({ title, value, loading }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
    <div className="text-sm text-gray-500 mb-1">{title}</div>
    {loading ? (
      <div className="h-7 rounded-md bg-gray-200 animate-pulse w-16" />
    ) : (
      <div className="text-3xl font-bold text-gray-900">{value ?? 0}</div>
    )}
  </div>
);

/* גרסה מוקטנת לסלולר – בלי גלילה, נכנס בשתי/שלוש/ארבע עמודות לפי הרוחב */
const MicroStat = ({ title, value, loading, Icon }) => (
  <div className="flex items-center justify-between gap-2 bg-white/90 border border-gray-200 rounded-xl px-2 py-1.5 shadow-sm">
    <div className="flex items-center gap-1.5 min-w-0">
      <span className="p-1 bg-gray-100 rounded-md shrink-0">
        <Icon size={14} />
      </span>
      <span className="text-[11px] leading-3 text-gray-500 truncate">
        {title}
      </span>
    </div>
    {loading ? (
      <span className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
    ) : (
      <span className="text-sm font-semibold text-gray-900">{value ?? 0}</span>
    )}
  </div>
);

/* ---------- Helpers ---------- */
const countWithFallback = async (refOrQuery) => {
  try {
    const agg = await getCountFromServer(refOrQuery);
    const n = agg?.data()?.count;
    if (typeof n === "number") return n;
  } catch {
    // ignore & fall back
  }
  const snap = await getDocs(refOrQuery);
  return snap.size;
};

const safePrefetch = async (modulePath) => {
  try {
    if (!modulePath) return;
    await import(/* @vite-ignore */ modulePath);
  } catch {}
};

/* ---------- Page ---------- */
const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    instructors: 0,
    classes: 0,
    bookings: 0,
  });
  const [loadingStats, setLoadingStats] = useState(false);

  const routes = useMemo(
    () => [
      {
        to: "/admin/users",
        label: "ניהול לקוחות",
        sub: "הוספה / עריכה / מחיקה",
        Icon: UserPlus,
        gradient: "from-blue-500 to-blue-700",
        file: "./AdminUsersPanel.jsx",
      },
      {
        to: "/admin/instructors",
        label: "ניהול מדריכים",
        sub: "ניהול צוות מדריכים",
        Icon: UserCog,
        gradient: "from-purple-500 to-purple-700",
        file: "./AdminInstructorsPanel.jsx",
      },
      {
        to: "/admin/classes",
        label: "ניהול שיעורים",
        sub: "לוח שיעורים והזמנות",
        Icon: AlarmClock,
        gradient: "from-green-500 to-green-700",
        file: "./AdminClassesPanel.jsx",
      },
      {
        to: "/admin/bookings",
        label: "ניהול הרשמות",
        sub: "מחיקה לפי משתמש / תאריך",
        Icon: ClipboardList,
        gradient: "from-indigo-500 to-indigo-700",
        file: "./AdminBookingsPanel.jsx",
      },
      {
        to: "/admin/declarations",
        label: "הצהרות בריאות",
        sub: "צפייה בחתימות משתמשים",
        Icon: ShieldCheck,
        gradient: "from-red-500 to-red-700",
        file: "./AdminDeclarationsPanel.jsx",
      },
      {
        to: "/admin/bookings-overview",
        label: "סטטוס נרשמים",
        sub: "צפייה במשתתפים לפי שבוע",
        Icon: ListChecks,
        gradient: "from-blue-500 to-blue-700",
        file: "./BookingsOverview.jsx",
      },
      {
        to: "/admin/cancellations",
        label: 'דו"ח ביטולים',
        sub: "צפייה בביטולים לפי מתאמן",
        Icon: Ban,
        gradient: "from-pink-500 to-pink-700",
        file: "./CancellationsReport.jsx",
      },
      {
        to: "/admin/send-notification",
        label: "שליחת התראה",
        sub: "שלח התראה למשתמש",
        Icon: Users,
        gradient: "from-amber-500 to-amber-700",
        file: "./SendNotification.jsx",
      },
    ],
    []
  );

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const usersRef = collection(db, "Users");
      const instructorsQ = query(usersRef, where("isInstructor", "==", true));
      const classesRef = collection(db, "classes");
      const bookingsRef = collection(db, "bookings");

      const [users, instructors, classes, bookings] = await Promise.all([
        countWithFallback(usersRef),
        countWithFallback(instructorsQ),
        countWithFallback(classesRef),
        countWithFallback(bookingsRef),
      ]);

      setStats({ users, instructors, classes, bookings });
    } catch (e) {
      console.error("שגיאה בטעינת סטטיסטיקות:", e);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div dir="rtl" className="p-6 pt-2 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        ניהול מערכת
      </h2>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <Link
          to="/admin/send-notification"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow transition"
          onMouseEnter={() => safePrefetch("./SendNotification.jsx")}
        >
          שלח התראה למשתמש
        </Link>

        <button
          onClick={fetchStats}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow-sm transition"
          aria-label="רענן סטטיסטיקות"
          title="רענן סטטיסטיקות"
        >
          <RotateCw size={18} />
          רענון
        </button>
      </div>

      {/* --- Mobile: NO SCROLL, compact grid --- */}
      <div className="sm:hidden bg-white/70 backdrop-blur border border-gray-200 rounded-2xl p-2 mb-5">
        {/* שתי עמודות בברירת מחדל; כשיש קצת יותר רוחב – 3/4 עמודות */}
        <div className="grid grid-cols-2 min-[380px]:grid-cols-3 min-[480px]:grid-cols-4 gap-2">
          <MicroStat title={'סה"כ משתמשים'} value={stats.users} loading={loadingStats} Icon={Users} />
          <MicroStat title={'סה"כ מדריכים'} value={stats.instructors} loading={loadingStats} Icon={UserCog} />
          <MicroStat title={'סה"כ שיעורים'} value={stats.classes} loading={loadingStats} Icon={AlarmClock} />
          <MicroStat title={'סה"כ הרשמות'} value={stats.bookings} loading={loadingStats} Icon={ClipboardList} />
        </div>
      </div>

      {/* --- Tablet & Desktop --- */}
      <div className="hidden sm:block bg-white/70 backdrop-blur border border-gray-200 rounded-2xl p-4 mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title={'סה"כ משתמשים'} value={stats.users} loading={loadingStats} />
          <StatCard title={'סה"כ מדריכים'} value={stats.instructors} loading={loadingStats} />
          <StatCard title={'סה"כ שיעורים'} value={stats.classes} loading={loadingStats} />
          <StatCard title={'סה"כ הרשמות'} value={stats.bookings} loading={loadingStats} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {routes.map(({ to, label, sub, Icon, gradient, file }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            onMouseEnter={() => safePrefetch(file)}
            onFocus={() => safePrefetch(file)}
            className={`flex items-center justify-between bg-gradient-to-r ${gradient} text-white py-4 px-6 rounded-2xl shadow-md hover:scale-[1.02] active:scale-[0.99] transition-transform`}
          >
            <div className="flex flex-col items-start text-right">
              <span className="text-lg font-bold">{label}</span>
              <span className="text-sm opacity-80">{sub}</span>
            </div>
            <Icon size={28} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
