// src/pages/AdminInstructorsPanel.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import BackToAdminButton from "../components/BackToAdminButton";
import toast from "react-hot-toast";
import {
  UserPlus,
  Search,
  Loader2,
  Edit3,
  Trash2,
  Check,
  X,
  Phone,
  Users,
} from "lucide-react";

/** עוזרים קטנים */
const onlyDigits = (s = "") => s.replace(/\D/g, "");
const normalizePhone = (s = "") => onlyDigits(s); // אפשר להרחיב ל-E.164 אם תרצה
const byNameAsc = (a, b) => (a.name || "").localeCompare(b.name || "", "he");

/** סקלטון לכרטיס מדריך */
const InstructorSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
    <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
    <div className="h-4 w-28 bg-gray-200 rounded mb-4" />
    <div className="flex gap-2">
      <div className="h-8 w-16 bg-gray-200 rounded" />
      <div className="h-8 w-16 bg-gray-200 rounded" />
    </div>
  </div>
);

const AdminInstructorsPanel = ({ employee = { isAdmin: true } }) => {
  /** סטייטים */
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [instructors, setInstructors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [confirm, setConfirm] = useState({ open: false, id: null, name: "" });

  /** דיבאונס לחיפוש */
  useEffect(() => {
    const t = setTimeout(() => setSearchDebounced(search.trim()), 250);
    return () => clearTimeout(t);
  }, [search]);

  /** טעינה */
  const fetchInstructors = async () => {
    setLoading(true);
    try {
      // מביאים את כל המשתמשים ומסננים בצד לקוח – נמנע אינדקס קומפוזיט מיותר
      const snap = await getDocs(collection(db, "Users"));
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((u) => !!u.isInstructor)
        .sort(byNameAsc);
      setInstructors(list);
    } catch (e) {
      console.error("❌ שגיאה בטעינת המדריכים:", e);
      toast.error("שגיאה בטעינת המדריכים");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  /** אימותים לטופס */
  const cleanedPhone = useMemo(() => normalizePhone(phone), [phone]);
  const formValid = name.trim().length >= 2 && cleanedPhone.length >= 7;

  /** שמירה/עדכון מדריך */
  const handleSave = async () => {
    if (!formValid) {
      toast.error("נא למלא שם (מינימום 2 תווים) וטלפון תקין");
      return;
    }

    setSaving(true);
    try {
      const usersRef = doc(db, "Users", cleanedPhone);
      const instructorsRef = doc(db, "Instructors", cleanedPhone);

      // שומרים/מעדכנים את מסמך המשתמש – לא מוחקים שדות קיימים (merge)
      const existing = await getDoc(usersRef);
      const base = existing.exists() ? existing.data() : {};

      const userData = {
        ...base,
        id: cleanedPhone,
        phone: cleanedPhone,
        name: name.trim(),
        isInstructor: true, // מוודא שמוגדר כמדריך
        isAdmin: base.isAdmin || false,
        membershipType: base.membershipType || "",
        remainingLessons: base.remainingLessons || 0,
        completedLessons: base.completedLessons || 0,
        joinDate: base.joinDate || new Date().toISOString(),
      };

      await setDoc(usersRef, userData, { merge: true });

      // מרקרים קלים גם באינדקס Instructors (לשאליתות/תצוגות מהירות)
      await setDoc(
        instructorsRef,
        {
          id: cleanedPhone,
          phone: cleanedPhone,
          name: name.trim(),
          createdAt: base.createdAt || new Date().toISOString(),
        },
        { merge: true }
      );

      toast.success(editingId ? "המדריך עודכן" : "מדריך נוסף");
      clearForm();
      fetchInstructors();
    } catch (e) {
      console.error("❌ שגיאה בהוספת/עדכון מדריך:", e);
      toast.error("שגיאה בהוספת/עדכון מדריך");
    } finally {
      setSaving(false);
    }
  };

  /** הסרת תפקיד מדריך (לא מוחקים את מסמך המשתמש) */
  const softDeleteInstructor = async (id, name) => {
    setSaving(true);
    try {
      const usersRef = doc(db, "Users", id);
      const instRef = doc(db, "Instructors", id);

      // מסירים תפקיד מדריך מהמשתמש
      await setDoc(usersRef, { isInstructor: false }, { merge: true });
      // מוחקים את הרשומה בטבלת Instructors
      await deleteDoc(instRef);

      toast.success(`המדריך "${name}" הוסר מרשימת המדריכים`);
      fetchInstructors();
    } catch (e) {
      console.error("❌ שגיאה במחיקה:", e);
      toast.error("שגיאה במחיקת מדריך");
    } finally {
      setSaving(false);
    }
  };

  /** טיפול בכפתורי עריכה/מחיקה */
  const onEdit = (inst) => {
    setPhone(inst.phone || "");
    setName(inst.name || "");
    setEditingId(inst.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onAskDelete = (inst) =>
    setConfirm({ open: true, id: inst.id, name: inst.name || inst.phone });

  const onConfirmDelete = async () => {
    const { id, name } = confirm;
    setConfirm({ open: false, id: null, name: "" });
    await softDeleteInstructor(id, name);
  };

  const clearForm = () => {
    setPhone("");
    setName("");
    setEditingId(null);
  };

  /** סינון */
  const filtered = useMemo(() => {
    if (!searchDebounced) return instructors;
    const q = searchDebounced.toLowerCase();
    const qDigits = onlyDigits(searchDebounced);
    return instructors.filter(
      (i) =>
        (i.name || "").toLowerCase().includes(q) ||
        (i.phone || "").includes(qDigits)
    );
  }, [instructors, searchDebounced]);

  return (
    <div dir="rtl" className="p-4 pt-2 max-w-6xl mx-auto">
      {/* כותרת + חזרה */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <Users size={22} />
          ניהול מדריכים
        </h1>
        <BackToAdminButton />
      </div>

      {/* פס פעולות עליון: חיפוש + סטטוס */}
      <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-3 shadow-sm mb-4 sticky top-2 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
          <div className="sm:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg p-2 pl-9"
                placeholder="חיפוש: שם / טלפון"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600 sm:text-right">
            סה״כ מדריכים: <span className="font-semibold">{filtered.length}</span>
          </div>
        </div>
      </div>

      {/* טופס הוספה/עריכה (קומפקטי) */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">
            {editingId ? "עריכת מדריך" : "הוספת מדריך חדש"}
          </h2>
          {editingId && (
            <button
              onClick={clearForm}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X size={16} /> נקה
            </button>
          )}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs text-gray-500 block mb-1">מספר טלפון</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                inputMode="numeric"
                placeholder="למשל: 0541234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full p-2 pl-9 border rounded-lg"
              />
            </div>
            <div className="mt-1 text-[11px] text-gray-500">
              נשמר בתור ספרות בלבד: <span dir="ltr">{cleanedPhone || "—"}</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">שם מלא</label>
            <input
              type="text"
              placeholder="שם המדריך/ה"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={handleSave}
            disabled={!formValid || saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 px-4 rounded-lg"
          >
            <UserPlus size={18} />
            {editingId ? "עדכן מדריך" : "הוסף מדריך"}
            {saving && <Loader2 size={16} className="animate-spin" />}
          </button>
          {editingId && (
            <button
              onClick={clearForm}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg"
            >
              בטל עריכה
            </button>
          )}
        </div>
      </div>

      {/* רשימת מדריכים */}
      <div>
        <h2 className="text-lg font-semibold mb-3">רשימת מדריכים</h2>

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <InstructorSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((inst) => (
              <div
                key={inst.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-right">
                    <div className="text-base font-semibold text-blue-800">
                      {inst.name || "—"}
                    </div>
                    <div className="text-xs text-gray-500" dir="ltr">
                      {inst.phone || "—"}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => onEdit(inst)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-1"
                  >
                    <Edit3 size={16} /> ערוך
                  </button>
                  <button
                    onClick={() => onAskDelete(inst)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-1"
                  >
                    <Trash2 size={16} /> הסר מדריך
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
            אין מדריכים להצגה. הוסף מדריך באמצעות הטופס למעלה.
          </div>
        )}
      </div>

      {/* מודאל אישור מחיקה */}
      {confirm.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-5 w-[90%] max-w-md shadow-xl">
            <h3 className="text-lg font-semibold mb-2">אישור פעולה</h3>
            <p className="text-sm text-gray-600">
              להסיר את <span className="font-semibold">{confirm.name}</span> מרשימת המדריכים?
              <br />
              (לא יימחק המשתמש, רק תוסר הרשאת מדריך)
            </p>
            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => setConfirm({ open: false, id: null, name: "" })}
                className="border border-gray-300 px-4 py-2 rounded-lg text-sm flex items-center gap-1"
              >
                <X size={16} /> בטל
              </button>
              <button
                onClick={onConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1"
              >
                <Check size={16} /> אשר
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInstructorsPanel;
