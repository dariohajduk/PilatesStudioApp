// src/pages/HomePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import MainLayout from "../components/MainLayout";
import { useUser } from "../context/UserContext";
import { FiX, FiTrash2 } from "react-icons/fi";

/* ===========================
   Utilities
=========================== */
const heDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

const pad2 = (n) => String(n).padStart(2, "0");
const parseHebDate = (ddmmyyyy) => {
  if (!ddmmyyyy) return null;
  const [d, m, y] = ddmmyyyy.split("/").map(Number);
  if (!d || !m || !y) return null;
  const dt = new Date(y, m - 1, d);
  return isNaN(dt.getTime()) ? null : dt;
};
const toISOyyyy_mm_dd = (ddmmyyyy) => {
  const d = parseHebDate(ddmmyyyy);
  if (!d) return "";
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};
const fromISOToHeb = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};
const sundayThisWeek = (() => {
  const t = new Date();
  const s = new Date(t);
  s.setDate(t.getDate() - t.getDay()); // ראשון
  s.setHours(0, 0, 0, 0);
  return s;
})();
const sundayNextWeek = (() => {
  const s = new Date(sundayThisWeek);
  s.setDate(s.getDate() + 7);
  return s;
})();
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const isDateInCurrentOrNextWeek = (ddmmyyyy) => {
  const classDate = parseHebDate(ddmmyyyy);
  if (!classDate) return false;
  const startOfThisWeek = new Date(sundayThisWeek);
  const endOfNextWeek = addDays(startOfThisWeek, 13); // שבת בשבוע הבא
  return classDate >= startOfThisWeek && classDate <= endOfNextWeek;
};

/* ===========================
   DayStrip - בחירת יום מהירה
=========================== */
function DayStrip({ baseDate, days = 7, value, onChange }) {
  const items = Array.from({ length: days }, (_, i) => addDays(baseDate, i));
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
      {items.map((d) => {
        const iso = d.toISOString().slice(0, 10);
        const active = value === iso;
        return (
          <button
            key={iso}
            onClick={() => onChange?.(iso)}
            className={
              "min-w-[66px] px-3 py-2 rounded-xl border text-sm text-center " +
              (active
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-200")
            }
          >
            <div className="text-[11px] opacity-70">{heDays[d.getDay()]?.[0]}</div>
            <div className="font-semibold">
              {pad2(d.getDate())}/{pad2(d.getMonth() + 1)}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ===========================
   CompactClassCard - כרטיס שיעור קומפקטי
=========================== */
function CompactClassCard({
  title,
  instructor,
  date,
  time,
  spots,
  enrolled,
  booked,
  onClick,
  onCta,
  ctaText,
}) {
  const cap = spots != null ? (enrolled || 0) + (spots || 0) : null;
  const taken = enrolled || 0;
  const pct = cap ? Math.min(100, Math.round((taken / cap) * 100)) : null;
  const isFull = spots != null && spots <= 0;

  return (
    <div
      onClick={onClick}
      className="group bg-white border border-gray-200 rounded-2xl p-3 hover:shadow-md transition cursor-pointer active:scale-[0.99]"
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold text-blue-800">{title}</div>
        <span
          className={`px-2 py-0.5 text-xs rounded-full ${
            isFull
              ? "bg-red-100 text-red-700 border border-red-200"
              : "bg-emerald-100 text-emerald-700 border border-emerald-200"
          }`}
        >
          {isFull ? "מלא" : "פתוח"}
        </span>
      </div>

      <div className="text-xs text-gray-600 mt-0.5">
        {date} · {time}
      </div>
      <div className="text-xs mt-1">מדריך: {instructor || "—"}</div>

      {cap != null && (
        <div className="mt-2">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-[11px] text-gray-500 mt-1">
            נרשמו {taken} / {cap} {booked ? "· ✓ נרשמתי" : ""}
          </div>
        </div>
      )}

      {onCta && (
        <div className="mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCta();
            }}
            className={`w-full py-2 rounded-lg text-sm ${
              booked
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {ctaText || (booked ? "בטל הרשמה" : "הירשם")}
          </button>
        </div>
      )}
    </div>
  );
}

/* ===========================
   AdminClassesTable - טבלת מנהלים/מדריכים
=========================== */
function AdminClassesTable({ classes = [], onRowClick }) {
  return (
    <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="[&>th]:px-3 [&>th]:py-2 text-gray-600 text-right">
            <th>תאריך</th>
            <th>שעה</th>
            <th>מדריך</th>
            <th className="w-[220px]">תפוסה</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => {
            const cap =
              cls.spots != null
                ? (cls.participantsCount || 0) + (cls.spots || 0)
                : null;
            const taken = cls.participantsCount || 0;
            const pct = cap ? Math.round((taken / cap) * 100) : null;

            return (
              <tr
                key={cls.id}
                className="border-t last:border-b-0 hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick?.(cls)}
              >
                <td className="px-3 py-2">{cls.date}</td>
                <td className="px-3 py-2">{cls.time}</td>
                <td className="px-3 py-2">{cls.instructor}</td>
                <td className="px-3 py-2">
                  {cap != null ? (
                    <>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            pct >= 100 ? "bg-red-500" : "bg-blue-500"
                          }`}
                          style={{ width: `${Math.min(100, pct)}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-gray-500 mt-1">
                        {taken} / {cap} ({pct}%)
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
          {!classes.length && (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-500">
                אין שיעורים להצגה
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ===========================
   AdminClassModal - מודאל ניהול שיעור
=========================== */
function AdminClassModal({
  cls,
  onClose,
  participants = [],
  handleRemoveParticipant,
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return participants;
    const l = q.toLowerCase();
    return participants.filter(
      (p) =>
        (p.userName || "").toLowerCase().includes(l) ||
        (p.userId || "").includes(q) ||
        (p.phone || "").includes(q)
    );
  }, [participants, q]);

  const exportCSV = () => {
    const headers = ["שם", "טלפון", "זמן הרשמה", "נרשם ע\"י"];
    const rows = filtered.map((p) => [
      p.userName || "",
      p.phone || p.userId || "",
      p.bookedAt || "",
      p.bookedBy || "",
    ]);
    const csv =
      [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `participants-${cls?.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!cls) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-4 w-[92%] max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-blue-700">{cls.name}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <FiX />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-2">
          <div><span className="text-gray-500">תאריך:</span> {cls.date}</div>
          <div><span className="text-gray-500">שעה:</span> {cls.time}</div>
          <div><span className="text-gray-500">מדריך:</span> {cls.instructor || "—"}</div>
          <div>
            <span className="text-gray-500">נרשמים:</span>{" "}
            {cls.participantsCount || 0}
          </div>
        </div>

        <div className="mt-4 bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="flex-1 border rounded-lg p-2 text-sm"
              placeholder="חיפוש משתתף לפי שם/טלפון…"
            />
            <button
              onClick={exportCSV}
              className="px-3 py-2 rounded-lg border text-sm hover:bg-white bg-white"
            >
              ייצוא CSV
            </button>
          </div>

          <div className="max-h-[50vh] overflow-y-auto">
            {!filtered.length ? (
              <div className="text-center text-gray-500 py-6">
                אין משתתפים להצגה
              </div>
            ) : (
              <ul className="divide-y">
                {filtered.map((p) => (
                  <li key={p.id} className="py-2 flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium text-blue-800">
                        {p.userName || p.userId}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {p.phone || p.userId} · נרשם ע"י {p.bookedBy || "—"}
                      </div>
                    </div>
                    <button
                      title="הסר משתתף מהשיעור"
                      onClick={() => handleRemoveParticipant?.(p.id)}
                      className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-3 text-left">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===========================
   Skeletons
=========================== */
function ClassSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 animate-pulse">
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
      <div className="h-3 w-1/3 bg-gray-200 rounded mb-2" />
      <div className="h-2 w-full bg-gray-100 rounded" />
    </div>
  );
}

/* ===========================
   Main Page
=========================== */
const HomePage = ({ employee }) => {
  const { userData } = useUser();

  const isAdmin =
    userData?.isAdmin || userData?.role === "admin" || userData?.role === "מנהל";
  const isInstructor =
    userData?.isInstructor ||
    userData?.role === "instructor" ||
    userData?.role === "מדריך";
  const isRegularUser = !isAdmin && !isInstructor;

  const userPhone = employee?.phone || userData?.phone || userData?.id || "";

  const [allClasses, setAllClasses] = useState([]);
  const [participantsMap, setParticipantsMap] = useState({});
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // UI Filters
  const [activeStrip, setActiveStrip] = useState("both"); // "this" | "next" | "both"
  const [selectedDayISO, setSelectedDayISO] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  // Load data
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);

      // 1) classes (מעמיסים רק שבוע נוכחי+בא)
      const classesSnap = await getDocs(collection(db, "classes"));
      const classesRaw = classesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const classes = classesRaw.filter((c) => isDateInCurrentOrNextWeek(c.date));

      // 2) bookings
      let bookingsList = [];
      if (isRegularUser) {
        const qUser = query(collection(db, "bookings"), where("userId", "==", userPhone));
        const sUser = await getDocs(qUser);
        bookingsList = sUser.docs.map((d) => ({ id: d.id, ...d.data() }));
      } else {
        const sAll = await getDocs(collection(db, "bookings"));
        bookingsList = sAll.docs.map((d) => ({ id: d.id, ...d.data() }));
      }

      // 3) participantsMap
      const map = {};
      for (const b of bookingsList) {
        if (!map[b.classId]) map[b.classId] = [];
        map[b.classId].push(b);
      }

      setAllClasses(classes);
      setBookings(bookingsList);
      setParticipantsMap(map);
      setLoading(false);
    };
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee, isRegularUser, userPhone, refreshFlag]);

  // Visible classes (role-based)
  let visibleClasses = allClasses;
  if (isInstructor) {
    visibleClasses = visibleClasses.filter((cls) => cls.instructorId === userPhone);
  }

  // Add participants counts
  const classesWithCounts = useMemo(() => {
    return visibleClasses
      .map((cls) => ({
        ...cls,
        participants: participantsMap[cls.id] || [],
        participantsCount: participantsMap[cls.id]?.length || 0,
      }))
      .sort((a, b) => {
        const da = new Date(`${toISOyyyy_mm_dd(a.date)}T${a.time}`);
        const db = new Date(`${toISOyyyy_mm_dd(b.date)}T${b.time}`);
        return da - db;
      });
  }, [visibleClasses, participantsMap]);

  // Day filter
  const dayFiltered = useMemo(() => {
    if (activeStrip === "both" || !selectedDayISO) return classesWithCounts;
    return classesWithCounts.filter(
      (c) => toISOyyyy_mm_dd(c.date) === selectedDayISO
    );
  }, [classesWithCounts, activeStrip, selectedDayISO]);

  // User bookings (for regular users)
  const userBookings = useMemo(() => {
    if (!isRegularUser) return [];
    const ids = new Set(bookings.map((b) => b.classId));
    return bookings
      .filter((b) => ids.has(b.classId))
      .sort((a, b) => {
        const ca = allClasses.find((c) => c.id === a.classId);
        const cb = allClasses.find((c) => c.id === b.classId);
        const da = ca ? new Date(`${toISOyyyy_mm_dd(ca.date)}T${ca.time}`) : 0;
        const db = cb ? new Date(`${toISOyyyy_mm_dd(cb.date)}T${cb.time}`) : 0;
        return da - db;
      });
  }, [isRegularUser, bookings, allClasses]);

  // Next booking for hero
  const nextBooking = useMemo(() => {
    if (!isRegularUser) return null;
    return userBookings
      .map((b) => {
        const c = allClasses.find((x) => x.id === b.classId);
        return {
          ...b,
          _dt: c ? new Date(`${toISOyyyy_mm_dd(c.date)}T${c.time}`) : null,
          classInfo: c,
        };
      })
      .filter((x) => x._dt && x._dt > new Date())
      .sort((a, b) => a._dt - b._dt)[0];
  }, [isRegularUser, userBookings, allClasses]);

  /* Actions */
  const handleCancelBooking = async (bookingId) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      toast.success("ההרשמה בוטלה");
      setRefreshFlag((x) => !x);
    } catch (e) {
      toast.error("שגיאה בביטול ההרשמה");
    }
  };
  const handleRemoveParticipant = async (bookingId) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      toast.success("המשתמש הוסר מהשיעור");
      setRefreshFlag((x) => !x);
    } catch (e) {
      toast.error("שגיאה בהסרת המשתתף");
    }
  };

  /* Render */
  return (
    <MainLayout employee={employee}>
      <div dir="rtl" className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-3">
          {isAdmin ? "כל השיעורים במערכת" : isInstructor ? "השיעורים שלי" : "השיעורים שלי"}
        </h1>

        {/* Filters + DayStrip */}
        <div className="bg-white/80 backdrop-blur border rounded-2xl p-3 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => {
                setActiveStrip("this");
                setSelectedDayISO(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                activeStrip === "this" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              השבוע
            </button>
            <button
              onClick={() => {
                setActiveStrip("next");
                setSelectedDayISO(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                activeStrip === "next" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              שבוע הבא
            </button>
            <button
              onClick={() => {
                setActiveStrip("both");
                setSelectedDayISO(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                activeStrip === "both" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              שניהם
            </button>
          </div>

          {activeStrip !== "both" && (
            <DayStrip
              baseDate={activeStrip === "this" ? sundayThisWeek : sundayNextWeek}
              days={7}
              value={selectedDayISO}
              onChange={setSelectedDayISO}
            />
          )}
        </div>

        {/* Regular user view */}
        {isRegularUser && (
          <>
            {/* Hero next booking */}
            {nextBooking && (
              <div className="mb-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-4">
                <div className="text-sm opacity-90">השיעור הבא שלך</div>
                <div className="text-lg font-bold">
                  {nextBooking.classInfo?.name || "—"}
                </div>
                <div className="text-sm mt-1">
                  {nextBooking.classInfo?.date} · {nextBooking.classInfo?.time} ·{" "}
                  {nextBooking.classInfo?.instructor}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleCancelBooking(nextBooking.id)}
                    className="px-3 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm"
                  >
                    בטל הרשמה
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      "Milan Studio"
                    )}`}
                    className="px-3 py-2 bg-white text-blue-700 rounded-lg text-sm"
                  >
                    ניווט
                  </a>
                </div>
              </div>
            )}

            {/* Booked classes list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <ClassSkeleton key={i} />)
                : userBookings.length === 0
                ? (
                  <div className="col-span-full text-center text-gray-500 bg-white border rounded-2xl p-6">
                    אין לך שיעורים השבוע. בוא נמצא לך משהו מתאים 💪
                  </div>
                )
                : userBookings.map((b) => {
                    const c = allClasses.find((x) => x.id === b.classId);
                    if (!c) return null;
                    const enrolled = participantsMap[c.id]?.length || 0;
                    return (
                      <motion.div
                        key={b.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <CompactClassCard
                          title={c.name}
                          instructor={c.instructor}
                          date={c.date}
                          time={c.time}
                          spots={c.spots}
                          enrolled={enrolled}
                          booked
                          onClick={() => {}}
                          onCta={() => handleCancelBooking(b.id)}
                          ctaText="בטל הרשמה"
                        />
                      </motion.div>
                    );
                  })}
            </div>
          </>
        )}

        {/* Admin/Instructor view */}
        {(isAdmin || isInstructor) && (
          <>
            {/* Summary chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <div className="bg-white border rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500">סה״כ שיעורים</div>
                <div className="text-lg font-bold">{dayFiltered.length}</div>
              </div>
              <div className="bg-white border rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500">סה״כ נרשמים</div>
                <div className="text-lg font-bold">
                  {dayFiltered.reduce((sum, c) => sum + (c.participantsCount || 0), 0)}
                </div>
              </div>
              <div className="bg-white border rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500">שיעורים מלאים</div>
                <div className="text-lg font-bold">
                  {dayFiltered.filter((c) => (c.spots ?? 1) <= 0).length}
                </div>
              </div>
              <div className="bg-white border rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500">מדריכים</div>
                <div className="text-lg font-bold">
                  {new Set(dayFiltered.map((c) => c.instructorId || c.instructor)).size}
                </div>
              </div>
            </div>

            {/* Desktop table */}
            {loading ? (
              <div className="grid grid-cols-1 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ClassSkeleton key={i} />
                ))}
              </div>
            ) : (
              <AdminClassesTable
                classes={dayFiltered}
                onRowClick={setSelectedClass}
              />
            )}

            {/* Mobile cards */}
            <div className="md:hidden grid grid-cols-1 gap-2 mt-3">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <ClassSkeleton key={i} />)
                : dayFiltered.map((c) => (
                    <CompactClassCard
                      key={c.id}
                      title={c.name}
                      instructor={c.instructor}
                      date={c.date}
                      time={c.time}
                      spots={c.spots}
                      enrolled={c.participantsCount}
                      onClick={() => setSelectedClass(c)}
                      onCta={null}
                    />
                  ))}
            </div>

            {/* Modal */}
            {selectedClass && (
              <AdminClassModal
                cls={selectedClass}
                onClose={() => setSelectedClass(null)}
                participants={participantsMap[selectedClass.id] || []}
                handleRemoveParticipant={handleRemoveParticipant}
              />
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
