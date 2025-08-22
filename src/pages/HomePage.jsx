// src/pages/HomePage.jsx
// ✅ גרסה משודרגת - שומרת על ה‑UI הכללי, מוסיפה UX וכלים פרקטיים למשתמש ולמנהל

import React, { useEffect, useMemo, useState, useRef } from "react"; // // ייבוא React והוקים
import { motion } from "framer-motion"; // // אנימציות עדינות
import { toast } from "react-hot-toast"; // // טוסטים להודעות למשתמש
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore"; // // פעולות מול Firestore
import { db } from "../services/firebase"; // // חיבור לפיירבייס
import MainLayout from "../components/MainLayout"; // // לייאאוט ראשי קיים
import { useUser } from "../context/UserContext"; // // קונטקסט משתמש
import { FiX, FiTrash2, FiShare2, FiRefreshCw, FiCopy } from "react-icons/fi"; // // אייקונים
// ===========================
// קבועים ושימושים כלליים
// ===========================
const heDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]; // // שמות ימים בעברית
const CANCELLATION_CUTOFF_HOURS = 2; // // כמה שעות לפני התחלת שיעור אסור לבטל (ניתן לשינוי)
const DEFAULT_CLASS_DURATION_MIN = 60; // // משך שיעור להוספה ליומן (בד"כ שעה)
const STUDIO_NAME = "Milan Studio"; // // שם הסטודיו לניווט/שיתוף
const STUDIO_ADDRESS = "המלאכה 3, קרית גת"; // // כתובת לניווט (התאם אם יש)
const isFutureClass = (cls) => {
  const startAt = buildStartAtFromClass(cls);
  return !!startAt && startAt.getTime() > now().getTime();
};
// ---- Occupancy helpers ----
const occupancyFrom = (spots, enrolled) => {
  const cap = spots != null ? Number(spots) : null;       // הקיבולת המקסימלית
  const taken = Number(enrolled || 0);                    // כמה נרשמו
  const remaining = cap != null ? Math.max(0, cap - taken) : null; // מקומות שנותרו
  const pct = cap ? Math.min(100, Math.round((taken / cap) * 100)) : null; // אחוז תפוסה
  const isFull = cap != null ? remaining <= 0 : false;    // האם מלא
  const almost = cap != null ? remaining > 0 && remaining <= 2 : false; // כמעט מלא
  return { cap, taken, remaining, pct, isFull, almost };
};
const toLocalISODate = (d) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

// פונקציות עזר
const pad2 = (n) => String(n).padStart(2, "0"); // // מילוי ספרות
const parseHebDate = (ddmmyyyy) => {
  // // המרת תאריך "dd/MM/yyyy" לאובייקט Date
  if (!ddmmyyyy) return null;
  const [d, m, y] = ddmmyyyy.split("/").map(Number);
  if (!d || !m || !y) return null;
  const dt = new Date(y, m - 1, d);
  return isNaN(dt.getTime()) ? null : dt;
};
const toISOyyyy_mm_dd = (ddmmyyyy) => {
  // // המרת "dd/MM/yyyy" ל‑"yyyy-MM-dd"
  const d = parseHebDate(ddmmyyyy);
  if (!d) return "";
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};
const fromISOToHeb = (iso) => {
  // // המרת "yyyy-MM-dd" חזרה ל‑"dd/MM/yyyy"
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};
const addDays = (d, n) => {
  // // הוספת ימים לתאריך
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const now = () => new Date(); // // זמן נוכחי

// ראשון של השבוע הנוכחי (אזור זמן מקומי)
const sundayThisWeek = (() => {
  const t = new Date();
  const s = new Date(t);
  s.setDate(t.getDate() - t.getDay());
  s.setHours(0, 0, 0, 0);
  return s;
})();
const sundayNextWeek = (() => {
  const s = new Date(sundayThisWeek);
  s.setDate(s.getDate() + 7);
  return s;
})();
const saturdayEndOfNextWeek = (() => {
  // // שבת של שבוע הבא (סוף טווח)
  const s = new Date(sundayThisWeek);
  s.setDate(s.getDate() + 13);
  s.setHours(23, 59, 59, 999);
  return s;
})();

const isDateInCurrentOrNextWeek = (ddmmyyyy) => {
  // // בדיקה אם תאריך (כמחרוזת) נמצא בשבוע נוכחי/בא
  const classDate = parseHebDate(ddmmyyyy);
  if (!classDate) return false;
  const start = new Date(sundayThisWeek);
  const end = new Date(saturdayEndOfNextWeek);
  return classDate >= start && classDate <= end;
};

const buildStartAtFromClass = (cls) => {
  // // יצירת Date לתחילת שיעור על בסיס השדות הקיימים; אם יש Timestamp חיצוני בעתיד אפשר להחליף
  // // מצפה ל‑cls.date בפורמט dd/MM/yyyy ול‑cls.time בפורמט HH:mm
  if (!cls?.date || !cls?.time) return null;
  const iso = toISOyyyy_mm_dd(cls.date);
  if (!iso) return null;
  // הערה: אין לנו TZ אקספליציטי; נניח Asia/Jerusalem כמקומי, JavaScript מתרגם לפי זמן מערכת
  const dt = new Date(`${iso}T${cls.time}:00`);
  return isNaN(dt.getTime()) ? null : dt;
};

const minutesFromNow = (dt) => {
  // // כמה דקות נשארו מרגע זה לתאריך/זמן נתון
  if (!dt) return Infinity;
  return Math.round((dt.getTime() - now().getTime()) / 60000);
};

// יצירת קובץ ICS והורדתו
const downloadICSForClass = (cls) => {
  // // בונה קובץ ICS בסיסי על בסיס פרטי שיעור
  const startAt = buildStartAtFromClass(cls);
  if (!startAt) {
    toast.error("לא ניתן ליצור אירוע ליומן (תאריך/שעה לא תקינים)");
    return;
  }
  const endAt = new Date(
    startAt.getTime() + DEFAULT_CLASS_DURATION_MIN * 60000
  );
  const dtToICS = (d) =>
    `${d.getUTCFullYear()}${pad2(d.getUTCMonth() + 1)}${pad2(
      d.getUTCDate()
    )}T${pad2(d.getUTCHours())}${pad2(d.getUTCMinutes())}00Z`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Milan Studio//Classes//HE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${cls.id || Math.random().toString(36).slice(2)}`,
    `DTSTAMP:${dtToICS(now())}`,
    `DTSTART:${dtToICS(startAt)}`,
    `DTEND:${dtToICS(endAt)}`,
    `SUMMARY:${(cls.name || "שיעור").replace(/\n/g, " ")}`,
    `LOCATION:${STUDIO_NAME}`,
    `DESCRIPTION:${
      cls.instructor ? `מדריך: ${cls.instructor}. ` : ""
    }נוצר מאפליקציית Milan.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `class-${cls.id || "event"}.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

const openGoogleCalendarForClass = (cls) => {
  // // פתיחת Google Calendar עם אירוע מוכן לעריכה
  const startAt = buildStartAtFromClass(cls);
  if (!startAt) {
    toast.error("לא ניתן לפתוח אירוע ביומן (תאריך/שעה לא תקינים)");
    return;
  }
  const endAt = new Date(
    startAt.getTime() + DEFAULT_CLASS_DURATION_MIN * 60000
  );
  const fmt = (d) =>
    `${d.getUTCFullYear()}${pad2(d.getUTCMonth() + 1)}${pad2(
      d.getUTCDate()
    )}T${pad2(d.getUTCHours())}${pad2(d.getUTCMinutes())}00Z`;
  const params = new URLSearchParams({
    text: cls.name || "שיעור",
    dates: `${fmt(startAt)}/${fmt(endAt)}`,
    details: `מדריך: ${cls.instructor || "—"}\nנוצר מאפליקציית Milan.`,
    location: STUDIO_ADDRESS,
  });
  window.open(
    `https://calendar.google.com/calendar/u/0/r/eventedit?${params.toString()}`,
    "_blank"
  );
};

const tryShareClass = (cls) => {
  // // שיתוף מהיר (Web Share API) או נפילה לעותק טקסטי
  const startAt = buildStartAtFromClass(cls);
  const when = startAt
    ? `${cls.date} · ${cls.time}`
    : `${cls.date || ""} ${cls.time || ""}`.trim();
  const text = `מצטרפים לשיעור "${cls.name || ""}" ב-${STUDIO_NAME} • ${when}`;
  if (navigator.share) {
    navigator
      .share({ title: cls.name || "שיעור", text, url: window.location.href })
      .catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    toast.success("קישור/טקסט שיתוף הועתק");
  }
};

// ===========================
// DayStrip - בחירת יום מהירה
// ===========================
function DayStrip({ baseDate, days = 7, value, onChange }) {
  const items = Array.from({ length: days }, (_, i) => addDays(baseDate, i)); // // רשימת הימים להצגה
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
      dir="rtl"
    >
      {items.map((d) => {
         const iso = toLocalISODate(d);  
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
            aria-label={`בחר ${heDays[d.getDay()] || ""} ${pad2(
              d.getDate()
            )}/${pad2(d.getMonth() + 1)}`}
            title={`בחר ${heDays[d.getDay()] || ""} ${pad2(d.getDate())}/${pad2(
              d.getMonth() + 1
            )}`}
          >
            <div className="text-[11px] opacity-70">
              {heDays[d.getDay()]?.[0]}
            </div>
            <div className="font-semibold">
              {pad2(d.getDate())}/{pad2(d.getMonth() + 1)}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ===========================
// CompactClassCard - כרטיס שיעור קומפקטי
// ===========================
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
  // // חישובי תפוסה
  const { cap, taken, pct, isFull, almost } = occupancyFrom(spots, enrolled);

  return (
    <div
      onClick={onClick}
      className="group bg-white border border-gray-200 rounded-2xl p-3 hover:shadow-md transition cursor-pointer active:scale-[0.99]"
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold text-blue-800">{title}</div>
        <div className="flex items-center gap-1">
          {almost && !isFull && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 border border-amber-200">
              כמעט מלא
            </span>
          )}
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

// ===========================
// AdminClassesTable - טבלת מנהלים/מדריכים
// ===========================
function AdminClassesTable({ classes = [], onRowClick }) {
  return (
    <div
      className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden"
      dir="rtl"
    >
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
            const { cap, taken, pct, isFull } = occupancyFrom(
              cls.spots,
              cls.participantsCount
            );

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

// ===========================
// AdminClassModal - מודאל ניהול שיעור
// ===========================
function AdminClassModal({
  cls,
  onClose,
  participants = [],
  handleRemoveParticipant,
}) {
  const [q, setQ] = useState(""); // // חיפוש טקסטואלי

  const filtered = useMemo(() => {
    // // סינון משתתפים לפי שם/טלפון/ID
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
    // // יצוא רשימת משתתפים ל‑CSV (כולל הזנים קיימים)
    const headers = ["שם", "טלפון", "זמן הרשמה", 'נרשם ע"י'];
    const rows = filtered.map((p) => [
      p.userName || "",
      p.phone || p.userId || "",
      p.bookedAt || "",
      p.bookedBy || "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `participants-${cls?.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyPhones = async () => {
    // // העתקת טלפונים/מזהים ללוח (למשל לשליחת WhatsApp)
    const phones = filtered
      .map((p) => p.phone || p.userId)
      .filter(Boolean)
      .join(", ");
    if (!phones) {
      toast("לא נמצאו טלפונים להעתקה");
      return;
    }
    await navigator.clipboard.writeText(phones);
    toast.success("טלפונים הועתקו");
  };

  const shareClass = () => tryShareClass(cls); // // שיתוף מהיר של השיעור

  if (!cls) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-2xl p-4 w-[92%] max-w-3xl max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-blue-700">{cls.name}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            aria-label="סגור מודאל"
            title="סגור"
          >
            <FiX />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-2">
          <div>
            <span className="text-gray-500">תאריך:</span> {cls.date}
          </div>
          <div>
            <span className="text-gray-500">שעה:</span> {cls.time}
          </div>
          <div>
            <span className="text-gray-500">מדריך:</span>{" "}
            {cls.instructor || "—"}
          </div>
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
              aria-label="חיפוש משתתף"
            />
            <button
              onClick={exportCSV}
              className="px-3 py-2 rounded-lg border text-sm hover:bg-white bg-white"
              aria-label="ייצוא CSV"
              title="ייצוא CSV"
            >
              ייצוא CSV
            </button>
            <button
              onClick={copyPhones}
              className="px-3 py-2 rounded-lg border text-sm hover:bg-white bg-white flex items-center gap-1"
              aria-label="העתק טלפונים"
              title="העתק טלפונים"
            >
              <FiCopy /> טלפונים
            </button>
            <button
              onClick={shareClass}
              className="px-3 py-2 rounded-lg border text-sm hover:bg-white bg-white flex items-center gap-1"
              aria-label="שתף שיעור"
              title="שתף שיעור"
            >
              <FiShare2 /> שתף
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
                  <li
                    key={p.id}
                    className="py-2 flex items-center justify-between"
                  >
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
                      aria-label="הסר משתתף"
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

// ===========================
// Skeleton לטעינה
// ===========================
function ClassSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-3 animate-pulse">
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
      <div className="h-3 w-1/3 bg-gray-200 rounded mb-2" />
      <div className="h-2 w-full bg-gray-100 rounded" />
    </div>
  );
}

// ===========================
// העמוד הראשי
// ===========================
const HomePage = ({ employee }) => {
  const { userData } = useUser(); // // מידע על המשתמש המחובר

  // קביעת תפקיד
  const isAdmin =
    userData?.isAdmin ||
    userData?.role === "admin" ||
    userData?.role === "מנהל";
  const isInstructor =
    userData?.isInstructor ||
    userData?.role === "instructor" ||
    userData?.role === "מדריך";
  const isRegularUser = !isAdmin && !isInstructor;

  const userPhone = employee?.phone || userData?.phone || userData?.id || ""; // // מזהה משתמש (טלפון/ID)

  // סטייטים לנתונים
  const [allClasses, setAllClasses] = useState([]); // // כל השיעורים לשבוע נוכחי+בא
  const [participantsMap, setParticipantsMap] = useState({}); // // מיפוי משתתפים לפי classId
  const [bookings, setBookings] = useState([]); // // הזמנות שנשלפו

  // סטייטים ל‑UI
  const [loading, setLoading] = useState(true); // // מצב טעינה
  const [refreshFlag, setRefreshFlag] = useState(false); // // טריגר לרענון
  const [activeStrip, setActiveStrip] = useState("both"); // // "this" | "next" | "both"
  const [selectedDayISO, setSelectedDayISO] = useState(null); // // בחירת יום ספציפי
  const [selectedClass, setSelectedClass] = useState(null); // // מודאל ניהול
  const [openOnly, setOpenOnly] = useState(false); // // פילטר: פתוחים בלבד
  const [typeFilter, setTypeFilter] = useState("all"); // // פילטר סוג שיעור (אם יש שדה type)
  const [instructorFilter, setInstructorFilter] = useState("all"); // // פילטר מדריך

  // רפרנס לטיימר רענון
  const pollingRef = useRef(null); // // שמירה על interval

  // טעינת נתונים
  useEffect(() => {
    // // שימוש בגישה הקיימת (לא שובר UI/דאטה): נשלוף את כל ה‑classes ונחסום לפי שבוע נוכחי+בא
    const loadAll = async () => {
      setLoading(true);

      // 1) classes
      const classesSnap = await getDocs(collection(db, "classes"));
      const classesRaw = classesSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      const classes = classesRaw.filter((c) =>
        isDateInCurrentOrNextWeek(c.date)
      );

      // 2) bookings
      let bookingsList = [];
      if (isRegularUser) {
        const qUser = query(
          collection(db, "bookings"),
          where("userId", "==", userPhone)
        );
        const sUser = await getDocs(qUser);
        bookingsList = sUser.docs.map((d) => ({ id: d.id, ...d.data() }));
      } else {
        // מנהל/מדריך: להביא את כל ההזמנות לשבועי התצוגה (נשאר קוד פשוט – אפשר לייעל בהמשך ל‑in)
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

  // רענון אוטומטי עדין (polling)
  useEffect(() => {
    // // מרענן נתונים כל 45 שניות בעדינות
    pollingRef.current = setInterval(() => setRefreshFlag((x) => !x), 45000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // סינון לפי תפקיד (מדריך רואה רק שיעורים שלו)
  let visibleClasses = allClasses;
  if (isInstructor) {
    visibleClasses = visibleClasses.filter(
      (cls) => cls.instructorId === userPhone
    );
  }

  // הוספת משתתפים ומיון לפי תאריך/שעה
  const classesWithCounts = useMemo(() => {
    return visibleClasses
      .filter(isFutureClass) // ← מציג רק שיעורים שעדיין לא התחילו
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

  // אוסף ערכי מדריכים/סוגים לפילטרים
  const instructorOptions = useMemo(() => {
    const set = new Set(
      classesWithCounts
        .map((c) => c.instructor || c.instructorId)
        .filter(Boolean)
    );
    return ["all", ...Array.from(set)];
  }, [classesWithCounts]);
  const typeOptions = useMemo(() => {
    const set = new Set(classesWithCounts.map((c) => c.type).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [classesWithCounts]);

  // פילטר יום + פתוחים בלבד + סוג + מדריך
  const dayAndFilters = useMemo(() => {
    let arr = classesWithCounts;
    // סינון לפי "השבוע/שבוע הבא" בעזרת DayStrip
    if (activeStrip !== "both" && selectedDayISO) {
      arr = arr.filter((c) => toISOyyyy_mm_dd(c.date) === selectedDayISO);
    }
    // פתוחים בלבד
    if (openOnly) {
      arr = arr.filter((c) => {
        const { remaining } = occupancyFrom(c.spots, c.participantsCount);
        return remaining == null || remaining > 0;
      });
    }
    // סוג שיעור (אם יש)
    if (typeFilter !== "all") {
      arr = arr.filter((c) => (c.type || "") === typeFilter);
    }
    // מדריך
    if (instructorFilter !== "all") {
      arr = arr.filter(
        (c) => (c.instructor || c.instructorId || "") === instructorFilter
      );
    }
    return arr;
  }, [
    classesWithCounts,
    activeStrip,
    selectedDayISO,
    openOnly,
    typeFilter,
    instructorFilter,
  ]);

  // הזמנות משתמש רגיל (מסודרות בזמן)
  const userBookings = useMemo(() => {
    if (!isRegularUser) return [];
    return bookings
      .map((b) => {
        const c = allClasses.find((c) => c.id === b.classId);
        return {
          booking: b,
          cls: c,
          startAt: c ? buildStartAtFromClass(c) : null,
        };
      })
      .filter(
        ({ cls, startAt }) =>
          cls && startAt && startAt.getTime() > now().getTime()
      ) // ← רק עתידיים
      .sort((a, b) => a.startAt - b.startAt)
      .map(({ booking }) => booking);
  }, [isRegularUser, bookings, allClasses]);
  // ---- Occupancy helpers ----
  const occupancyFrom = (spots, enrolled) => {
    const cap = spots != null ? Number(spots) : null;
    const taken = Number(enrolled || 0);
    const remaining = cap != null ? Math.max(0, cap - taken) : null;
    const pct = cap ? Math.min(100, Math.round((taken / cap) * 100)) : null;
    const isFull = cap != null ? remaining <= 0 : false;
    const almost = cap != null ? remaining > 0 && remaining <= 2 : false;
    return { cap, taken, remaining, pct, isFull, almost };
  };

  // השיעור הבא ל‑Hero
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
      .filter((x) => x._dt && x._dt > now())
      .sort((a, b) => a._dt - b._dt)[0];
  }, [isRegularUser, userBookings, allClasses]);

  // פעולות
  const handleCancelBooking = async (bookingId, classObj) => {
    // // ביטול הרשמה, כולל בדיקת חלון ביטול
    try {
      // בדיקת cutoff: אם כבר מאוחר מדי – נחסום
      const startAt = buildStartAtFromClass(classObj);
      const mins = minutesFromNow(startAt);
      if (mins <= CANCELLATION_CUTOFF_HOURS * 60) {
        toast.error(
          `לא ניתן לבטל פחות מ-${CANCELLATION_CUTOFF_HOURS} שעות לפני תחילת השיעור`
        );
        return;
      }
      await deleteDoc(doc(db, "bookings", bookingId));
      toast.success("ההרשמה בוטלה");
      setRefreshFlag((x) => !x);
    } catch (e) {
      toast.error("שגיאה בביטול ההרשמה");
    }
  };

  const handleRemoveParticipant = async (bookingId) => {
    // // הסרת משתתף (למנהל/מדריך)
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      toast.success("המשתמש הוסר מהשיעור");
      setRefreshFlag((x) => !x);
    } catch (e) {
      toast.error("שגיאה בהסרת המשתתף");
    }
  };

  // KPI למנהל/מדריך
  const kpis = useMemo(() => {
    if (!dayAndFilters.length) {
      return {
        total: 0,
        participants: 0,
        full: 0,
        instructors: 0,
        avgOcc: 0,
        slow: 0,
        hotSoon: 0,
      };
    }
    let total = dayAndFilters.length;
    let participants = 0;
    let full = 0;
    let instructorsSet = new Set();
    let occSum = 0;
    let countedOcc = 0;
    let slow = 0; // תפוסה < 30%
    let hotSoon = 0; // פחות מ-2 מקומות בשעתיים הקרובות

    for (const c of dayAndFilters) {
      const { cap, taken, remaining } = occupancyFrom(
        c.spots,
        c.participantsCount
      );
      participants += taken;
      if (remaining != null && remaining <= 0) full += 1;
      if (c.instructorId || c.instructor)
        instructorsSet.add(c.instructorId || c.instructor);
      if (cap) {
        const pct = (taken / cap) * 100;
        occSum += pct;
        countedOcc += 1;
        if (pct < 30) slow += 1;
        const startAt = buildStartAtFromClass(c);
        const m = minutesFromNow(startAt);
        if (m > 0 && m <= 120 && remaining != null && remaining <= 2 && remaining > 0) hotSoon += 1;
      }
    }
    const avgOcc = countedOcc ? Math.round((occSum / countedOcc) * 10) / 10 : 0;
    return {
      total,
      participants,
      full,
      instructors: instructorsSet.size,
      avgOcc,
      slow,
      hotSoon,
    };
  }, [dayAndFilters]);

  // UI
  return (
    <MainLayout employee={employee}>
      <div dir="rtl" className="p-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h1 className="text-2xl font-bold">
            {isAdmin
              ? "כל השיעורים במערכת"
              : isInstructor
              ? "השיעורים שלי"
              : "השיעורים שלי"}
          </h1>

          {/* כפתור רענון ידני */}
          <button
            onClick={() => setRefreshFlag((x) => !x)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
            aria-label="רענן נתונים"
            title="רענן"
          >
            <FiRefreshCw /> רענן
          </button>
        </div>

        {/* מסננים + DayStrip */}
        <div className="bg-white/80 backdrop-blur border rounded-2xl p-3 mb-3">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <button
              onClick={() => {
                setActiveStrip("this");
                setSelectedDayISO(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                activeStrip === "this"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
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
                activeStrip === "next"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
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
                activeStrip === "both"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              שניהם
            </button>

            {/* פתוחים בלבד */}
            <label className="inline-flex items-center gap-2 ms-auto text-sm">
              <input
                type="checkbox"
                className="accent-blue-600"
                checked={openOnly}
                onChange={(e) => setOpenOnly(e.target.checked)}
              />
              פתוחים בלבד
            </label>

            {/* פילטר סוג שיעור (אם קיים) */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">סוג:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border rounded-lg px-2 py-1 bg-white"
              >
                {typeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "all" ? "הכול" : opt}
                  </option>
                ))}
              </select>
            </div>

            {/* פילטר מדריך */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">מדריך:</span>
              <select
                value={instructorFilter}
                onChange={(e) => setInstructorFilter(e.target.value)}
                className="border rounded-lg px-2 py-1 bg-white"
              >
                {instructorOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "all" ? "הכול" : opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activeStrip !== "both" && (
            <DayStrip
              baseDate={
                activeStrip === "this" ? sundayThisWeek : sundayNextWeek
              }
              days={7}
              value={selectedDayISO}
              onChange={setSelectedDayISO}
            />
          )}
        </div>

        {/* תצוגת משתמש רגיל */}
        {isRegularUser && (
          <>
            {/* Hero לשיעור הבא */}
            {nextBooking && (
              <div className="mb-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-4">
                <div className="text-sm opacity-90">השיעור הבא שלך</div>
                <div className="text-lg font-bold">
                  {nextBooking.classInfo?.name || "—"}
                </div>
                <div className="text-sm mt-1">
                  {nextBooking.classInfo?.date} · {nextBooking.classInfo?.time}{" "}
                  · {nextBooking.classInfo?.instructor}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {/* ביטול הרשמה עם בדיקת cutoff */}
                  <button
                    onClick={() =>
                      handleCancelBooking(nextBooking.id, nextBooking.classInfo)
                    }
                    className="px-3 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm"
                  >
                    בטל הרשמה
                  </button>

                  {/* ניווט */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      STUDIO_ADDRESS
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-white text-blue-700 rounded-lg text-sm"
                  >
                    ניווט
                  </a>

                  {/* הוסף ליומן (ICS) */}
                  <button
                    onClick={() => downloadICSForClass(nextBooking.classInfo)}
                    className="px-3 py-2 bg-white text-blue-700 rounded-lg text-sm"
                  >
                    הוסף ליומן (ICS)
                  </button>

                  {/* Google Calendar */}
                  <button
                    onClick={() =>
                      openGoogleCalendarForClass(nextBooking.classInfo)
                    }
                    className="px-3 py-2 bg-white text-blue-700 rounded-lg text-sm"
                  >
                    פתח ב‑Google Calendar
                  </button>

                  {/* שיתוף */}
                  <button
                    onClick={() => tryShareClass(nextBooking.classInfo)}
                    className="px-3 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm flex items-center gap-1"
                  >
                    <FiShare2 /> שתף
                  </button>
                </div>
              </div>
            )}

            {/* רשימת שיעורים שנרשמת אליהם */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <ClassSkeleton key={i} />
                ))
              ) : userBookings.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 bg-white border rounded-2xl p-6">
                  אין לך שיעורים השבוע. בוא נמצא לך משהו מתאים 💪
                </div>
              ) : (
                userBookings.map((b) => {
                  const c = allClasses.find((x) => x.id === b.classId);
                  if (!c) return null;
                  const enrolled = participantsMap[c.id]?.length || 0;
                  const withinCutoff =
                    minutesFromNow(buildStartAtFromClass(c)) <=
                    CANCELLATION_CUTOFF_HOURS * 60;
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
                        onCta={() => handleCancelBooking(b.id, c)}
                        ctaText={
                          withinCutoff
                            ? `לא ניתן לבטל (פחות מ-${CANCELLATION_CUTOFF_HOURS} שעות)`
                            : "בטל הרשמה"
                        }
                      />
                    </motion.div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* תצוגת מנהל/מדריך */}
        {(isAdmin || isInstructor) && (
          <>
            {/* KPI מורחב */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-3">
              <div className="bg-white border rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500">סה״כ שיעורים</div>
                <div className="text-lg font-bold">{dayAndFilters.length}</div>
              </div>
              <div className="bg-white border rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500">סה״כ נרשמים</div>
                <div className="text-lg font-bold">
                  {dayAndFilters.reduce(
                    (sum, c) => sum + (c.participantsCount || 0),
                    0
                  )}
                </div>
              </div>
              <div className="bg-white border rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500">שיעורים מלאים</div>
                <div className="text-lg font-bold">
                  {
                    dayAndFilters.filter((c) => {
                      const { remaining } = occupancyFrom(
                        c.spots,
                        c.participantsCount
                      );
                      return remaining != null && remaining <= 0;
                    }).length
                  }
                </div>
              </div>
              <div className="bg-white border rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500">מדריכים</div>
                <div className="text-lg font-bold">
                  {
                    new Set(
                      dayAndFilters.map((c) => c.instructorId || c.instructor)
                    ).size
                  }
                </div>
              </div>
              <div className="bg-white border rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500">ממוצע תפוסה</div>
                <div className="text-lg font-bold">{kpis.avgOcc}%</div>
              </div>
              <div className="bg-white border rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500">איטיים / חמים</div>
                <div className="text-lg font-bold">
                  {kpis.slow} / {kpis.hotSoon}
                </div>
              </div>
            </div>

            {/* טבלת דסקטופ */}
            {loading ? (
              <div className="grid grid-cols-1 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ClassSkeleton key={i} />
                ))}
              </div>
            ) : (
              <AdminClassesTable
                classes={dayAndFilters}
                onRowClick={setSelectedClass}
              />
            )}

            {/* כרטיסים למובייל */}
            <div className="md:hidden grid grid-cols-1 gap-2 mt-3">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <ClassSkeleton key={i} />
                  ))
                : dayAndFilters.map((c) => (
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

            {/* מודאל ניהול */}
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
