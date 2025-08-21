// src/pages/BookingsManager.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  collection, query, where, orderBy, limit, startAfter, getDocs,
  writeBatch, doc, increment, serverTimestamp
} from "firebase/firestore";
import { db } from "../services/firebase";
import toast from "react-hot-toast";
import BackToAdminButton from "../components/BackToAdminButton";
import {
  Search, RotateCcw, Trash2, XCircle, CheckSquare, Square, Loader2
} from "lucide-react";

/* ---------- Utils ---------- */
const pad = (n) => String(n).padStart(2, "0");
const todayYMD = () => {
  const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
};
const firstDayOfWeekYMD = () => {
  const d = new Date();
  const day = d.getDay(); // 0-6 (0=ראשון)
  const diff = (day === 0 ? 6 : day - 1); // שבוע מתחיל שני
  d.setDate(d.getDate() - diff);
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
};
const lastDayOfWeekYMD = () => {
  const start = new Date(firstDayOfWeekYMD());
  start.setDate(start.getDate() + 6);
  return `${start.getFullYear()}-${pad(start.getMonth()+1)}-${pad(start.getDate())}`;
};
const ymdToDisplay = (ymd) => {
  if (!ymd) return "";
  const [y,m,d] = ymd.split("-");
  return `${d}/${m}/${y}`;
};
const ymdToDDMMYYYY = (ymd) => {
  if (!ymd) return "";
  const [y,m,d] = ymd.split("-");
  return `${d}/${m}/${y}`;
};

const PAGE_SIZE = 50;

/*
booking shape we use
{
  id, userId, userName, phone, classId, className, date, time,
  dayKey: "YYYY-MM-DD", status: "active"|"canceled",
  bookedBy, autoBooked, createdAt, canceledAt, canceledBy
}
*/

const BookingsManager = () => {
  // Filters
  const [from, setFrom] = useState(firstDayOfWeekYMD());
  const [to, setTo] = useState(lastDayOfWeekYMD());
  const [status, setStatus] = useState("active"); // active | canceled | all
  const [qText, setQText] = useState(""); // search text

  // Data
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [selected, setSelected] = useState({}); // id -> booking

  const filtersLabel = useMemo(
    () =>
      `${ymdToDisplay(from)} → ${ymdToDisplay(to)} • ${
        status === "all" ? "כל הסטטוסים" : status === "active" ? "פעילים" : "מבוטלים"
      }`,
    [from, to, status]
  );

  const resetPaging = () => {
    setRows([]); setNextCursor(null);
  };

  const fetchPage = async (reset = false) => {
    // ודא טווח תקין
    if (from && to && from > to) {
      toast.error("טווח תאריכים שגוי (מתאריך אחרי עד תאריך)");
      return;
    }

    setLoading(true);
    try {
      const base = collection(db, "bookings");

      // חשוב: לא שמים where("status") כדי להימנע מאינדקס קומפוזיט.
      // נבצע סינון סטטוס בצד לקוח.
      const clauses = [
        where("dayKey", ">=", from),
        where("dayKey", "<=", to),
        orderBy("dayKey", "desc"),
        limit(PAGE_SIZE),
      ];

      let q = query(base, ...clauses);
      if (!reset && nextCursor) {
        q = query(base, ...clauses, startAfter(nextCursor));
      }

      let snap = await getDocs(q);
      let list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Fallback למסמכים ישנים ללא dayKey – רק כאשר טוענים עמוד ראשון וטווח הוא יום יחיד
      if (reset && list.length === 0 && from === to) {
        try {
          const ddmmyyyy = ymdToDDMMYYYY(from);
          const qOld = query(base, where("date", "==", ddmmyyyy), limit(PAGE_SIZE));
          const oldSnap = await getDocs(qOld);
          const oldList = oldSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
          list = oldList;
          snap = oldSnap;
        } catch (e2) {
          // מתעלמים אם אין נתונים ישנים
          console.warn("Fallback by date failed:", e2);
        }
      }

      // סינון סטטוס בצד לקוח
      const finalList =
        status === "all" ? list : list.filter((r) => (r.status || "active") === status);

      setRows((prev) => (reset ? finalList : [...prev, ...finalList]));
      setNextCursor(snap.docs.length ? snap.docs[snap.docs.length - 1] : null);
    } catch (e) {
      console.error(e);
      toast.error("שגיאה בטעינת הרשמות");
    } finally {
      setLoading(false);
    }
  };

  // auto load on filters change
  useEffect(() => {
    resetPaging();
    fetchPage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, status]);

  const filteredRows = useMemo(() => {
    if (!qText.trim()) return rows;
    const ql = qText.toLowerCase();
    return rows.filter(
      (r) =>
        (r.userName || "").toLowerCase().includes(ql) ||
        (r.phone || "").includes(qText) ||
        (r.className || "").toLowerCase().includes(ql)
    );
  }, [rows, qText]);

  /* ---------- Actions ---------- */
  const toggleSelectAll = () => {
    if (Object.keys(selected).length === filteredRows.length) {
      setSelected({});
    } else {
      const pick = {};
      filteredRows.forEach((r) => (pick[r.id] = r));
      setSelected(pick);
    }
  };
  const toggleOne = (r) => {
    setSelected((prev) => {
      const copy = { ...prev };
      if (copy[r.id]) delete copy[r.id];
      else copy[r.id] = r;
      return copy;
    });
  };

  const cancelOne = async (r) => {
    if ((r.status || "active") === "canceled") return toast("כבר מבוטל");
    if (
      !window.confirm(
        `לבטל הרשמה של ${r.userName || r.phone} לשיעור "${r.className}" בתאריך ${
          r.date || ymdToDisplay(r.dayKey)
        }?`
      )
    )
      return;
    await bulkCancel([r]);
  };

  const deleteOne = async (r) => {
    if (!window.confirm(`למחוק לצמיתות את ההרשמה של ${r.userName || r.phone}?`)) return;
    await bulkDelete([r]);
  };

  const bulkCancel = async (items) => {
    if (!items.length) return;
    try {
      setLoading(true);
      // באצ'ים: עדכון סטטוס + החזרת מקום
      for (let i = 0; i < items.length; i += 300) {
        const slice = items.slice(i, i + 300);
        const batch = writeBatch(db);
        slice.forEach((r) => {
          const bRef = doc(db, "bookings", r.id);
          batch.update(bRef, {
            status: "canceled",
            canceledAt: serverTimestamp(),
            canceledBy: "admin",
          });
          if (r.classId) {
            const cRef = doc(db, "classes", r.classId);
            batch.update(cRef, { spots: increment(1) });
          }
        });
        await batch.commit();
      }
      toast.success(`בוטלו ${items.length} הרשמות`);
      // רענון
      setSelected({});
      resetPaging();
      fetchPage(true);
    } catch (e) {
      console.error(e);
      toast.error("שגיאה בביטול");
    } finally {
      setLoading(false);
    }
  };

  const bulkDelete = async (items) => {
    if (!items.length) return;
    try {
      setLoading(true);
      for (let i = 0; i < items.length; i += 200) {
        const slice = items.slice(i, i + 200);
        const batch = writeBatch(db);
        slice.forEach((r) => {
          // ארכוב לסל מחזור
          const trashRef = doc(collection(db, "bookings_trash"));
          batch.set(trashRef, {
            ...r,
            _originalId: r.id,
            deletedAt: serverTimestamp(),
          });
          // מחיקה אמיתית
          const bRef = doc(db, "bookings", r.id);
          batch.delete(bRef);
          // *לא* מחזירים מקום — מחיקה מיועדת לניקוי נתונים
        });
        await batch.commit();
      }
      toast.success(`נמחקו ${items.length} רשומות`);
      setSelected({});
      resetPaging();
      fetchPage(true);
    } catch (e) {
      console.error(e);
      toast.error("שגיאה במחיקה");
    } finally {
      setLoading(false);
    }
  };

  const selectedList = useMemo(() => Object.values(selected), [selected]);

  /* ---------- UI ---------- */
  return (
    <div dir="rtl" className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h1 className="text-xl font-bold text-blue-700">ניהול הרשמות</h1>
        <BackToAdminButton />
      </div>

      {/* Filters */}
      <div className="sticky top-2 z-10 bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-3 shadow-sm mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 items-end">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">מתאריך</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">עד תאריך</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border rounded-lg p-2"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setFrom(todayYMD());
                setTo(todayYMD());
              }}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              היום
            </button>
            <button
              onClick={() => {
                setFrom(firstDayOfWeekYMD());
                setTo(lastDayOfWeekYMD());
              }}
              className="px-3 py-2 border rounded-lg text-sm"
            >
              השבוע
            </button>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">סטטוס</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option value="active">פעילים</option>
              <option value="canceled">מבוטלים</option>
              <option value="all">הכול</option>
            </select>
          </div>
          <div className="lg:col-span-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                className="w-full border rounded-lg p-2 pl-9"
                placeholder="חיפוש: שם / טלפון / שיעור"
              />
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <RotateCcw size={14} /> {filtersLabel}
        </div>
      </div>

      {/* Actions bar */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <button
          onClick={toggleSelectAll}
          className="px-3 py-2 border rounded-lg text-sm flex items-center gap-1"
        >
          {Object.keys(selected).length === filteredRows.length && filteredRows.length ? (
            <CheckSquare size={16} />
          ) : (
            <Square size={16} />
          )}
          סמן הכול
        </button>

        <button
          onClick={() => bulkCancel(selectedList)}
          disabled={!selectedList.length || loading}
          className="px-3 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-lg text-sm flex items-center gap-1"
        >
          <XCircle size={16} /> בטל נבחרים
        </button>

        <button
          onClick={() => bulkDelete(selectedList)}
          disabled={!selectedList.length || loading}
          className="px-3 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-sm flex items-center gap-1"
        >
          <Trash2 size={16} /> מחק נבחרים
        </button>

        <div className="ml-auto text-sm text-gray-500">
          נמצאו {filteredRows.length} / נטענו {rows.length} {loading && <Loader2 className="inline animate-spin" />}
        </div>
      </div>

      {/* Table (desktop) */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="[&>th]:px-3 [&>th]:py-2 text-gray-600 text-right">
              <th></th>
              <th>תאריך</th>
              <th>שעה</th>
              <th>שיעור</th>
              <th>משתמש</th>
              <th>טלפון</th>
              <th>סטטוס</th>
              <th>אוטו</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r) => (
              <tr key={r.id} className="border-t last:border-b-0 hover:bg-gray-50">
                <td className="px-3 py-2">
                  <input type="checkbox" checked={!!selected[r.id]} onChange={() => toggleOne(r)} />
                </td>
                <td className="px-3 py-2">{r.date || ymdToDisplay(r.dayKey)}</td>
                <td className="px-3 py-2">{r.time}</td>
                <td className="px-3 py-2">{r.className}</td>
                <td className="px-3 py-2">{r.userName || "—"}</td>
                <td className="px-3 py-2">{r.phone || r.userId}</td>
                <td className="px-3 py-2">
                  {(r.status || "active") === "canceled" ? (
                    <span className="text-red-600">מבוטל</span>
                  ) : (
                    <span className="text-emerald-600">פעיל</span>
                  )}
                </td>
                <td className="px-3 py-2">{r.autoBooked ? "✓" : ""}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => cancelOne(r)}
                      className="px-2 py-1 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded"
                    >
                      בטל
                    </button>
                    <button
                      onClick={() => deleteOne(r)}
                      className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      מחק
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filteredRows.length && !loading && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  לא נמצאו הרשמות
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="md:hidden space-y-2">
        {filteredRows.map((r) => (
          <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium">{r.className}</div>
              <input type="checkbox" checked={!!selected[r.id]} onChange={() => toggleOne(r)} />
            </div>
            <div className="text-sm text-gray-600">
              {r.date || ymdToDisplay(r.dayKey)} · {r.time}
            </div>
            <div className="text-sm">
              {r.userName || "—"} · {r.phone || r.userId}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => cancelOne(r)}
                className="flex-1 py-1 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded"
              >
                בטל
              </button>
              <button
                onClick={() => deleteOne(r)}
                className="flex-1 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
              >
                מחק
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-3 flex justify-center">
        <button
          onClick={() => fetchPage(false)}
          disabled={!nextCursor || loading}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          טען עוד
        </button>
      </div>
    </div>
  );
};

export default BookingsManager;
