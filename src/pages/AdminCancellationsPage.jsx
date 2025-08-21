// src/pages/AdminCancellationsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { Popover } from "@headlessui/react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  parse,
  getWeek,
  getMonth,
  format,
  formatDistanceToNow,
} from "date-fns";
import toast from "react-hot-toast";
import BackToDashboardButton from "../components/BackToDashboardButton";
import {
  RotateCcw,
  Download,
  Loader2,
  Info,
  Search as SearchIcon,
  Users,
} from "lucide-react";

/* ---------- Utils ---------- */
const pad = (n) => String(n).padStart(2, "0");
const toYMD = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromDaysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
};
const todayEnd = () => {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
};
const parseDMY = (str) => {
  if (!str) return null;
  try {
    const dt = parse(str, "dd/MM/yyyy", new Date());
    return isNaN(dt.getTime()) ? null : dt;
  } catch {
    return null;
  }
};
const weekKey = (date) => `${date.getFullYear()}-W${getWeek(date, { weekStartsOn: 0 })}`;
const monthKey = (date) => `${date.getFullYear()}-${pad(getMonth(date) + 1)}`;

const PAGE_SIZE = 60;

/* cancellation doc (משוער):
{
  id, userId, date: "dd/MM/yyyy", time: "HH:mm", reason,
  cancelledAt: Timestamp
}
*/

const AdminCancellationsPage = () => {
  // Filters (טווח לפי תאריך שיעור – לא לפי cancelledAt)
  const [lessonFrom, setLessonFrom] = useState(toYMD(fromDaysAgo(30)));
  const [lessonTo, setLessonTo] = useState(toYMD(todayEnd()));

  const [groupBy, setGroupBy] = useState("week"); // week | month | day
  const [qText, setQText] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [includeLegacyNoCancelledAt, setIncludeLegacyNoCancelledAt] = useState(false);

  // Data
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [legacyUsed, setLegacyUsed] = useState(false);

  // Users map (id -> name)
  const [usersMap, setUsersMap] = useState({});
  const [usersWithCancellations, setUsersWithCancellations] = useState([]);

  // ---------- Load users once (names) ----------
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const snap = await getDocs(collection(db, "Users"));
        const map = {};
        snap.docs.forEach((d) => (map[d.id] = d.data()?.name || "לא ידוע"));
        setUsersMap(map);
      } catch (e) {
        console.warn("Failed loading users", e);
      }
    };
    loadUsers();
  }, []);

  // ---------- Build cancelledAt window from lesson date range ----------
  // כדי למשוך הכל אבל לא להגזים, נמתח את חלון ה-cancelledAt מעט מסביב לטווח השיעור
  const cancelFrom = useMemo(() => {
    const base = new Date(lessonFrom);
    base.setDate(base.getDate() - 30);
    base.setHours(0, 0, 0, 0);
    return base;
  }, [lessonFrom]);

  const cancelTo = useMemo(() => {
    const base = new Date(lessonTo);
    base.setDate(base.getDate() + 30);
    base.setHours(23, 59, 59, 999);
    return base;
  }, [lessonTo]);

  const resetPaging = () => {
    setRows([]);
    setNextCursor(null);
    setLegacyUsed(false);
  };

  // ---------- Fetch page using cancelledAt (no composite index needed) ----------
  const fetchPage = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        resetPaging();
      } else {
        setLoadingMore(true);
      }

      const base = collection(db, "cancellations");
      const constraints = [
        where("cancelledAt", ">=", cancelFrom),
        where("cancelledAt", "<=", cancelTo),
        orderBy("cancelledAt", "desc"),
        limit(PAGE_SIZE),
      ];
      let qRef = query(base, ...constraints);
      if (!reset && nextCursor) {
        qRef = query(base, ...constraints, startAfter(nextCursor));
      }

      const snap = await getDocs(qRef);
      let page = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // אופציונלי: להביא עוד עד 500 מסמכים חסרי cancelledAt (ישנים), ולסנן לקליינט
      if (reset && includeLegacyNoCancelledAt) {
        setLegacyUsed(true);
        const legacySnap = await getDocs(query(base, limit(500)));
        const legacy = legacySnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((c) => !c.cancelledAt); // רק ישנים בלי cancelledAt
        // ממזגים בלי כפילויות
        const seen = new Set(page.map((x) => x.id));
        legacy.forEach((c) => {
          if (!seen.has(c.id)) page.push(c);
        });
      }

      // טוענים
      setRows((prev) => (reset ? page : [...prev, ...page]));
      setNextCursor(snap.docs.length ? snap.docs[snap.docs.length - 1] : null);
    } catch (e) {
      console.error(e);
      toast.error("שגיאה בטעינת ביטולים");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonFrom, lessonTo, includeLegacyNoCancelledAt]);

  // ---------- Client filtering by lesson date range, search, chosen user ----------
  const filteredRows = useMemo(() => {
    const from = new Date(lessonFrom);
    from.setHours(0, 0, 0, 0);
    const to = new Date(lessonTo);
    to.setHours(23, 59, 59, 999);

    const ql = qText.trim().toLowerCase();

    const out = rows.filter((c) => {
      // מסמכים ללא date → מוציאים
      const lessonDt = parseDMY(c.date);
      if (!lessonDt) return false;
      if (lessonDt < from || lessonDt > to) return false;

      if (selectedUser && c.userId !== selectedUser) return false;

      if (ql) {
        const name = (usersMap[c.userId] || "לא ידוע").toLowerCase();
        const reason = (c.reason || "").toLowerCase();
        if (!name.includes(ql) && !reason.includes(ql)) return false;
      }

      return true;
    });

    // populate usersWithCancellations (לפי התוצאות בפועל)
    const set = new Set();
    out.forEach((c) => set.add(c.userId));
    setUsersWithCancellations(Array.from(set));

    return out;
  }, [rows, lessonFrom, lessonTo, selectedUser, qText, usersMap]);

  // ---------- Grouping ----------
  const groups = useMemo(() => {
    const g = {};
    filteredRows.forEach((c) => {
      const dt = parseDMY(c.date);
      if (!dt) return;
      let key = "";
      if (groupBy === "week") key = weekKey(dt);
      else if (groupBy === "month") key = monthKey(dt);
      else key = format(dt, "dd/MM/yyyy");
      if (!g[key]) g[key] = [];
      g[key].push(c);
    });
    // סדר בתוך קבוצה (לפי date+time יורד)
    Object.keys(g).forEach((k) => {
      g[k].sort((a, b) => {
        const aDt = parse(`${a.date} ${a.time || "00:00"}`, "dd/MM/yyyy HH:mm", new Date());
        const bDt = parse(`${b.date} ${b.time || "00:00"}`, "dd/MM/yyyy HH:mm", new Date());
        return bDt - aDt;
      });
    });
    return g;
  }, [filteredRows, groupBy]);

  const totals = useMemo(
    () => ({
      count: filteredRows.length,
      users: new Set(filteredRows.map((x) => x.userId)).size,
    }),
    [filteredRows]
  );

  // ---------- Actions ----------
  const handleEditReason = async (id, currentReason) => {
    const newReason = prompt("ערוך את סיבת הביטול:", currentReason || "");
    if (newReason == null || newReason === currentReason) return;
    try {
      await updateDoc(doc(db, "cancellations", id), { reason: newReason });
      toast.success("עודכן");
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, reason: newReason } : r)));
    } catch (err) {
      console.error(err);
      toast.error("שגיאה בעדכון");
    }
  };

  const handleDeleteCancellation = async (id) => {
    if (!confirm("האם למחוק את הביטול?")) return;
    try {
      await deleteDoc(doc(db, "cancellations", id));
      toast.success("נמחק");
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("שגיאה במחיקה");
    }
  };

  const exportCSV = () => {
    const header = ["תאריך שיעור", "שעה", "משתמש", "סיבה", "בוטל מתי (ISO)"];
    const lines = [header.join(",")];
    filteredRows.forEach((c) => {
      const name = usersMap[c.userId] || "לא ידוע";
      const cancelIso =
        c.cancelledAt?.toDate?.() ? c.cancelledAt.toDate().toISOString() : "";
      lines.push(
        [
          c.date || "",
          c.time || "",
          name.replace(/,/g, " "),
          (c.reason || "").replace(/,/g, " "),
          cancelIso,
        ].join(",")
      );
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cancellations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadMore = () => fetchPage(false);

  /* ---------- UI ---------- */
  return (
    <div dir="rtl" className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h1 className="text-2xl font-bold text-red-700">ביטולים לפי מתאמן</h1>
        <BackToDashboardButton />
      </div>

      {/* Filters bar */}
      <div className="sticky top-2 z-10 bg-white/85 backdrop-blur border border-gray-200 rounded-2xl p-3 shadow-sm mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 items-end">
          <div>
            <label className="text-xs text-gray-500 block mb-1">תאריך שיעור — מ</label>
            <input
              type="date"
              value={lessonFrom}
              max={lessonTo}
              onChange={(e) => setLessonFrom(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">תאריך שיעור — עד</label>
            <input
              type="date"
              value={lessonTo}
              min={lessonFrom}
              onChange={(e) => setLessonTo(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">קיבוץ לפי</label>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="border rounded-lg p-2 w-full"
            >
              <option value="week">שבוע</option>
              <option value="month">חודש</option>
              <option value="day">יום</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">משתמש</label>
            <select
              className="border rounded-lg p-2 w-full"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">כל המשתמשים</option>
              {usersWithCancellations.map((id) => (
                <option key={id} value={id}>
                  {usersMap[id] || "לא ידוע"}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="text-xs text-gray-500 block mb-1">חיפוש</label>
            <div className="relative">
              <SearchIcon size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                className="w-full border rounded-lg p-2 pl-9"
                placeholder="שם/סיבה…"
              />
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLegacyNoCancelledAt}
              onChange={(e) => setIncludeLegacyNoCancelledAt(e.target.checked)}
            />
            כולל מסמכים ישנים ללא <code className="bg-amber-100 px-1 rounded">cancelledAt</code> (עד 500)
          </label>

          <button
            onClick={() => fetchPage(true)}
            className="px-3 py-1.5 border rounded-lg flex items-center gap-1"
            disabled={loading}
          >
            <RotateCcw size={14} /> רענון
          </button>
          <button
            onClick={exportCSV}
            className="px-3 py-1.5 border rounded-lg flex items-center gap-1"
            disabled={!filteredRows.length}
          >
            <Download size={14} /> ייצוא CSV
          </button>

          <span className="ml-auto bg-red-50 text-red-700 px-3 py-1.5 rounded-lg border border-red-100">
            סה״כ ביטולים: <strong>{filteredRows.length}</strong>
          </span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1">
            <Users size={14} /> משתמשים מעורבים: <strong>{new Set(filteredRows.map((x)=>x.userId)).size}</strong>
          </span>
          {legacyUsed && (
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg">
              <Info size={16} />
              נטענו גם מסמכים ישנים ללא <code className="bg-amber-100 px-1 rounded">cancelledAt</code>.
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="h-32 flex items-center justify-center text-gray-500">
          <Loader2 className="animate-spin mr-2" /> טוען נתונים…
        </div>
      ) : (
        Object.entries(groups).map(([gKey, cancellations]) => (
          <div key={gKey} className="mb-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              {groupBy === "week"
                ? `שבוע ${gKey.split("-W")[1]}`
                : groupBy === "month"
                ? `חודש ${gKey.split("-")[1]}`
                : `תאריך ${gKey}`}
              <span className="ml-2 text-xs text-gray-500">({cancellations.length})</span>
            </h2>

            {/* Table (desktop) */}
            <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="[&>th]:px-3 [&>th]:py-2 text-gray-600 text-center">
                    <th>תאריך</th>
                    <th>שעה</th>
                    <th>מתאמן</th>
                    <th>סיבה</th>
                    <th>לפני כמה זמן</th>
                    <th>פעולות</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cancellations.map((c) => {
                    const name = usersMap[c.userId] || "לא ידוע";
                    const cancelIso =
                      c.cancelledAt?.toDate?.()
                        ? c.cancelledAt.toDate().toISOString()
                        : null;
                    return (
                      <tr key={c.id} className="border-t last:border-b-0 hover:bg-gray-50">
                        <td className="px-3 py-2">{c.date || "—"}</td>
                        <td className="px-3 py-2">{c.time || "—"}</td>
                        <td className="px-3 py-2 font-semibold text-blue-700">{name}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              (c.reason || "").includes("רפוא") ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {c.reason || "—"}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500">
                          {cancelIso
                            ? formatDistanceToNow(new Date(cancelIso), { addSuffix: true })
                            : "—"}
                        </td>
                        <td className="px-3 py-2">
                          <Popover className="relative inline-block text-left">
                            <Popover.Button className="px-2 py-1 text-gray-500 hover:text-gray-800">
                              <FiMoreVertical />
                            </Popover.Button>
                            <Popover.Panel className="absolute z-10 right-0 mt-2 w-32 bg-white border rounded shadow">
                              <div className="flex flex-col text-right text-sm">
                                <button
                                  onClick={() => handleEditReason(c.id, c.reason)}
                                  className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <FiEdit2 /> ערוך
                                </button>
                                <button
                                  onClick={() => handleDeleteCancellation(c.id)}
                                  className="px-3 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                                >
                                  <FiTrash2 /> מחק
                                </button>
                              </div>
                            </Popover.Panel>
                          </Popover>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Cards (mobile) */}
            <div className="md:hidden space-y-3">
              {cancellations.map((c) => {
                const name = usersMap[c.userId] || "לא ידוע";
                const cancelIso =
                  c.cancelledAt?.toDate?.()
                    ? c.cancelledAt.toDate().toISOString()
                    : null;
                return (
                  <div key={c.id} className="bg-white border border-gray-200 rounded-xl p-3">
                    <div className="flex items-start justify-between">
                      <div className="font-medium text-blue-800">{name}</div>
                      <Popover className="relative">
                        <Popover.Button className="text-gray-500 hover:text-gray-800">
                          <FiMoreVertical />
                        </Popover.Button>
                        <Popover.Panel className="absolute z-10 left-0 mt-1 w-32 bg-white border rounded shadow">
                          <div className="flex flex-col text-right text-sm">
                            <button
                              onClick={() => handleEditReason(c.id, c.reason)}
                              className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                            >
                              <FiEdit2 /> ערוך
                            </button>
                            <button
                              onClick={() => handleDeleteCancellation(c.id)}
                              className="px-3 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                            >
                              <FiTrash2 /> מחק
                            </button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>

                    <div className="text-xs text-gray-600 mt-1">
                      📅 {c.date || "—"} · 🕒 {c.time || "—"}
                    </div>
                    <div className="text-xs mt-1">📝 {c.reason || "—"}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      ⏱ {cancelIso ? formatDistanceToNow(new Date(cancelIso), { addSuffix: true }) : "—"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={loadMore}
          disabled={!nextCursor || loadingMore}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 flex items-center gap-2"
        >
          {loadingMore && <Loader2 className="animate-spin" size={16} />}
          טען עוד
        </button>
      </div>
    </div>
  );
};

export default AdminCancellationsPage;
