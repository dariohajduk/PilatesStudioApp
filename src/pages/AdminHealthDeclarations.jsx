// src/pages/AdminHealthDeclarations.jsx
import React, { useEffect, useMemo, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import BackToAdminButton from "../components/BackToAdminButton";
import {
  ShieldCheck,
  ShieldOff,
  Search,
  RefreshCw,
  Image as ImageIcon,
  Loader2,
  Download,
  X,
} from "lucide-react";

/** ---------- Utils ---------- */
const isManager = (employee) =>
  employee?.role === "מנהל" || employee?.isAdmin === true;

const fmtDate = (d) => {
  try {
    if (!d) return "—";
    const dt =
      typeof d?.toDate === "function" ? d.toDate() : new Date(d);
    return dt.toLocaleString("he-IL");
  } catch {
    return "—";
  }
};

const debounce = (fn, ms = 250) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

const PAGE_SIZE = 60;

/** סקלטון לכרטיס */
const CardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
    <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
    <div className="h-4 w-28 bg-gray-200 rounded mb-3" />
    <div className="h-8 w-28 bg-gray-200 rounded" />
  </div>
);

const AdminHealthDeclarations = ({ employee }) => {
  /** ---------- State ---------- */
  const [loading, setLoading] = useState(false);
  const [usersRaw, setUsersRaw] = useState([]); // רק Users (בלי employees)
  const [tab, setTab] = useState("signed"); // 'signed' | 'unsigned'
  const [q, setQ] = useState("");
  const [qDebounced, setQDebounced] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [hydrating, setHydrating] = useState(false); // טעינה נקודתית מ-employees
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [refreshing, setRefreshing] = useState(false);

  /** ---------- Effects ---------- */
  useEffect(() => {
    if (!isManager(employee)) return;
    const run = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, "Users"));
        const list = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((u) => !u.isAdmin && !u.isInstructor)
          .map((u) => ({
            id: u.id,
            phone: u.phone || u.id,
            name: u.name || "",
            signature: u.signature || null, // אם קיים ב-Users
            signedAt: u.signedAt || null,
          }));
        setUsersRaw(list);
      } catch (e) {
        console.error("שגיאה בטעינת משתמשים:", e);
        toast.error("אירעה שגיאה בטעינת המשתמשים");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [employee]);

  // Debounce לחיפוש
  useEffect(() => {
    const d = debounce((val) => setQDebounced(val.trim().toLowerCase()), 250);
    d(q);
    return () => d("");
  }, [q]);

  /** ---------- Derived ---------- */
  const signedUsers = useMemo(
    () => usersRaw.filter((u) => !!u.signature),
    [usersRaw]
  );
  const unsignedUsers = useMemo(
    () => usersRaw.filter((u) => !u.signature),
    [usersRaw]
  );

  const pool = tab === "signed" ? signedUsers : unsignedUsers;
  const filtered = useMemo(() => {
    if (!qDebounced) return pool;
    return pool.filter(
      (u) =>
        (u.name || "").toLowerCase().includes(qDebounced) ||
        (u.phone || "").includes(qDebounced)
    );
  }, [pool, qDebounced]);

  const paged = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  useEffect(() => {
    // כשמשנים לשונית/חיפוש – לאפס פאגינציה
    setVisibleCount(PAGE_SIZE);
  }, [tab, qDebounced]);

  if (!isManager(employee)) {
    return (
      <div className="text-center text-red-600 font-bold mt-10">
        אין לך הרשאה לצפות בדף זה.
      </div>
    );
  }

  /** ---------- Actions ---------- */

  // רענון מלא (Users בלבד)
  const refresh = async () => {
    setRefreshing(true);
    try {
      const snap = await getDocs(collection(db, "Users"));
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((u) => !u.isAdmin && !u.isInstructor)
        .map((u) => ({
          id: u.id,
          phone: u.phone || u.id,
          name: u.name || "",
          signature: u.signature || null,
          signedAt: u.signedAt || null,
        }));
      setUsersRaw(list);
      toast.success("רענן בהצלחה");
    } catch (e) {
      console.error(e);
      toast.error("כשל ברענון");
    } finally {
      setRefreshing(false);
    }
  };

  // פתיחת תצוגת הצהרה:
  // אם יש signature ב-Users — מציגים מיד.
  // אם אין — נטען employees/{phone} נקודתית ונציג; אופציונלי: קאש חזרה ל-Users.
  const openDeclaration = async (user) => {
    setSelectedUserName(user.name || user.phone || "");
    // קודם לבדוק האם יש כבר ב-Users
    if (user.signature) {
      setSelectedImage(user.signature);
      return;
    }
    // טעינה נקודתית מ-employees
    setHydrating(true);
    try {
      const empRef = doc(db, "employees", user.phone);
      const empSnap = await getDoc(empRef);
      if (!empSnap.exists()) {
        toast.error("לא נמצאה הצהרה עבור משתמש זה");
        setHydrating(false);
        return;
      }
      const emp = empSnap.data();
      const img =
        emp.declarationImage || emp.signature || null; // תמיכה בשתי הסכמות
      if (!img) {
        toast.error("לא נמצאה תמונת הצהרה במסמך העובד");
        setHydrating(false);
        return;
      }
      // פותחים תצוגה
      setSelectedImage(img);

      // קאש ל-Users (שיפור ביצועים לפעמים הבאות)
      try {
        await setDoc(
          doc(db, "Users", user.phone),
          {
            signature: img,
            signedAt: emp.signedAt || new Date().toISOString(),
          },
          { merge: true }
        );
        // עדכון לוקאלי ברשימה (כדי לעדכן מיידית בטבלת "חתומים")
        setUsersRaw((prev) =>
          prev.map((u) =>
            u.phone === user.phone ? { ...u, signature: img, signedAt: emp.signedAt || new Date().toISOString() } : u
          )
        );
      } catch (cacheErr) {
        console.warn("אזהרה: נכשל קאש ל-Users", cacheErr);
      }
    } catch (e) {
      console.error(e);
      toast.error("שגיאה בטעינת הצהרה");
    } finally {
      setHydrating(false);
    }
  };

  const loadMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  /** ---------- UI ---------- */
  return (
    <div dir="rtl" className="p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <ShieldCheck size={22} />
          הצהרות בריאות של לקוחות
        </h1>
        <BackToAdminButton />
      </div>

      {/* Top bar: tabs + search + stats + refresh */}
      <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-3 shadow-sm sticky top-2 z-10">
        <div className="flex flex-wrap items-center gap-2">
          {/* Tabs */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setTab("signed")}
              className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 ${
                tab === "signed"
                  ? "bg-white shadow text-emerald-700"
                  : "text-gray-600"
              }`}
            >
              <ShieldCheck size={16} />
              חתומים
              <span className="ml-1 text-xs text-gray-500">
                {signedUsers.length}
              </span>
            </button>
            <button
              onClick={() => setTab("unsigned")}
              className={`px-3 py-2 rounded-lg text-sm flex items-center gap-1 ${
                tab === "unsigned"
                  ? "bg-white shadow text-rose-700"
                  : "text-gray-600"
              }`}
            >
              <ShieldOff size={16} />
              חסרים
              <span className="ml-1 text-xs text-gray-500">
                {unsignedUsers.length}
              </span>
            </button>
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="חיפוש: שם / טלפון"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full border rounded-lg p-2 pl-9"
            />
          </div>

          {/* Refresh */}
          <button
            onClick={refresh}
            disabled={refreshing}
            className="px-3 py-2 border rounded-lg text-sm flex items-center gap-1"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            רענון
          </button>
        </div>
      </div>

      {/* Stats badges */}
      <div className="flex flex-wrap justify-center gap-3 my-4 text-sm">
        <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100">
          חתומים: <strong>{signedUsers.length}</strong>
        </div>
        <div className="bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg border border-rose-100">
          חסרים: <strong>{unsignedUsers.length}</strong>
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">
          סה״כ: <strong>{usersRaw.length}</strong>
        </div>
      </div>

      {/* Search result empty */}
      {!loading && filtered.length === 0 && (
        <div className="text-center text-gray-500 border border-dashed border-gray-300 rounded-xl p-8">
          לא נמצאו תוצאות תואמות.
        </div>
      )}

      {/* Cards grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        filtered.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paged.map((u) => (
                <div
                  key={u.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-right">
                      <div className="text-base font-semibold text-blue-800">
                        {u.name || "—"}
                      </div>
                      <div className="text-xs text-gray-500" dir="ltr">
                        {u.phone || "—"}
                      </div>
                    </div>
                    {u.signature ? (
                      <span className="text-emerald-700 text-xs bg-emerald-50 border border-emerald-100 rounded px-2 py-0.5">
                        חתום
                      </span>
                    ) : (
                      <span className="text-rose-700 text-xs bg-rose-50 border border-rose-100 rounded px-2 py-0.5">
                        חסר
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-xs text-gray-600">
                    נחתם: {u.signature ? fmtDate(u.signedAt) : "—"}
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => openDeclaration(u)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                    >
                      {hydrating ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <ImageIcon size={16} />
                      )}
                      הצג הצהרה
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {visibleCount < filtered.length && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={loadMore}
                  className="px-4 py-2 border rounded-lg text-sm"
                >
                  טען עוד ({filtered.length - visibleCount} נוספים)
                </button>
              </div>
            )}
          </>
        )
      )}

      {/* Modal: enlarged image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-white rounded-2xl shadow-2xl p-4 w-[92%] max-w-3xl relative">
            <button
              className="absolute top-3 left-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedImage(null)}
              aria-label="סגור"
              title="סגור"
            >
              <X size={20} />
            </button>

            <div className="mb-2 text-center text-sm text-gray-600">
              הצהרת בריאות — {selectedUserName || ""}
            </div>

            <img
              src={selectedImage}
              alt="תמונת הצהרת בריאות"
              className="w-full max-h-[70vh] object-contain rounded"
              loading="lazy"
            />

            <a
              href={selectedImage}
              download="health-declaration.png"
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 w-fit mx-auto"
            >
              <Download size={16} />
              הורד תמונה
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHealthDeclarations;
