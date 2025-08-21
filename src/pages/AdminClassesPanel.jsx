// AdminClassesPanel.jsx
import React, { useEffect, useMemo, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { format, addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2, Edit, Check, X } from "lucide-react";
import BackToAdminButton from "../components/BackToAdminButton";

// ==================== קומפוננטת פאנל ניהול שיעורים ====================
const AdminClassesPanel = ({ employee }) => {
  // ---------------- מצב כללי ----------------
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // מחיקה מרובה
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  // טופס הוספה/עריכה
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [spots, setSpots] = useState(6); // קיבולת קבועה
  const [instructorId, setInstructorId] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [editingClassId, setEditingClassId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteClassId, setDeleteClassId] = useState(null);

  // שיעורים מחזוריים
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceEndDate, setRecurrenceEndDate] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]); // ערכים 0..6 (0=ראשון)

  // סינון/חיפוש
  const [search, setSearch] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("");
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true);

  // תפוסה לפי שיעור (classId -> count)
  const [occupancyMap, setOccupancyMap] = useState({});

  // ==================== אפקטים ====================
  useEffect(() => {
    fetchClasses();
    fetchInstructors();
    fetchOccupancyMap();
  }, []);

  // להעמסת QA hooks קטנים לדפדפן
  useEffect(() => {
    if (!window.__qa) window.__qa = {};
    window.__qa.classesPanel = {
      checkNoOverCapacity: () => {
        const errors = [];
        classes.forEach((cls) => {
          const occ = Number(occupancyMap[cls.id] || 0);
          const cap = Number(cls.spots || 0);
          if (cap > 0 && occ > cap) {
            errors.push({ classId: cls.id, occ, cap, name: cls.name });
          }
        });
        if (errors.length) {
          console.error("Over capacity detected:", errors);
          return { ok: false, errors };
        }
        console.info("Capacity OK");
        return { ok: true };
      },
      checkSpotsPositive: () => {
        const bad = classes.filter((c) => Number(c.spots) < 1);
        if (bad.length) {
          console.error("Found classes with spots < 1:", bad);
          return { ok: false, bad };
        }
        console.info("All classes have spots >= 1");
        return { ok: true };
      },
    };
  }, [classes, occupancyMap]);

  // ==================== עזרי תאריכים/תצוגה ====================
  const formatDateToDDMMYYYY = (dateObj) => {
    if (!dateObj) return "";
    return format(dateObj, "dd/MM/yyyy");
  };

  const parseDateStringForSorting = (dateStr) => {
    if (!dateStr) return new Date(0);
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const isFutureClass = (cls) => {
    const [d, m, y] = (cls.date || "").split("/");
    const dateObj = new Date(`${y}-${m}-${d}T${cls.time || "00:00"}:00`);
    return dateObj >= new Date();
  };

  const sortClasses = (arr) => {
    return [...arr].sort((a, b) => {
      const da = parseDateStringForSorting(a.date);
      const db = parseDateStringForSorting(b.date);
      if (da.getTime() !== db.getTime()) return da - db;
      return (a.time || "").localeCompare(b.time || "");
    });
  };

  const passesFilters = (cls) => {
    if (showUpcomingOnly && !isFutureClass(cls)) return false;
    if (instructorFilter && cls.instructorId !== instructorFilter) return false;
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (cls.name || "").toLowerCase().includes(q) ||
      (cls.instructor || "").toLowerCase().includes(q)
    );
  };

  const groupByDateSorted = (arr) => {
    const groups = new Map();
    arr.forEach((cls) => {
      const key = cls.date || "ללא תאריך";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(cls);
    });
    for (const [k, list] of groups) {
      groups.set(k, sortClasses(list));
    }
    return Array.from(groups.entries()).sort(
      ([a], [b]) => parseDateStringForSorting(a) - parseDateStringForSorting(b)
    );
  };

  const visible = useMemo(() => classes.filter(passesFilters), [classes, search, instructorFilter, showUpcomingOnly]);
  const grouped = useMemo(() => groupByDateSorted(visible), [visible]);

  // ==================== שליפות ====================
  const fetchClasses = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "classes"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setClasses(data);
      setSelectedClasses([]);
    } catch (err) {
      console.error("❌ שגיאה בטעינת השיעורים:", err);
    }
    setLoading(false);
  };

  const fetchInstructors = async () => {
    try {
      const qUsers = query(collection(db, "Users"), where("isInstructor", "==", true));
      const snapshot = await getDocs(qUsers);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setInstructors(data);
    } catch (err) {
      console.error("❌ שגיאה בטעינת המדריכים:", err);
    }
  };

  // שליפה מרוכזת של כל ההזמנות כדי לחשב תפוסה לכל שיעור
  const fetchOccupancyMap = async () => {
    try {
      const snapshot = await getDocs(collection(db, "bookings"));
      const map = {};
      snapshot.docs.forEach((d) => {
        const b = d.data();
        const cId = b.classId;
        if (!cId) return;
        map[cId] = (map[cId] || 0) + 1;
      });
      setOccupancyMap(map);
    } catch (err) {
      console.error("❌ שגיאה בחישוב תפוסה:", err);
    }
  };

  // ==================== טופס/מודל ====================
  const clearForm = () => {
    setName("פילאטיס");
    setDate(null);
    setTime("");
    setSpots(6);
    setInstructorId("");
    setEditingClassId(null);
    setMessage("");
    setIsRecurring(false);
    setRecurrenceEndDate(null);
    setSelectedDays([]);
  };

  const openModalForEdit = (cls) => {
    setName(cls.name || "");
    if (cls.date) {
      const [day, month, year] = cls.date.split("/");
      const parsed = new Date(`${year}-${month}-${day}`);
      setDate(isNaN(parsed.getTime()) ? null : parsed);
    } else {
      setDate(null);
    }
    setTime(cls.time || "");
    setSpots(cls.spots ?? 6);
    setInstructorId(cls.instructorId || "");
    setEditingClassId(cls.id);
    setIsModalOpen(true);
  };

  const handleDayToggle = (dayIndex) => {
    setSelectedDays((prev) =>
      prev.includes(dayIndex) ? prev.filter((d) => d !== dayIndex) : [...prev, dayIndex]
    );
  };

  // ==================== יצירת/עדכון שיעורים ====================
  const handleSaveClass = async (closeAfterSave = false) => {
    if (!name || !date || !time || !instructorId || Number(spots) < 1) {
      setMessage("אנא מלא את כל השדות הנדרשים");
      return;
    }

    setLoading(true);
    try {
      const instructor = instructors.find((i) => i.id === instructorId);
      const classData = {
        name,
        date: formatDateToDDMMYYYY(date),
        time,
        instructor: instructor?.name || "",
        instructorId,
        spots: parseInt(spots, 10), // קיבולת קבועה
        createdAt: new Date().toISOString(),
      };

      if (isRecurring && !editingClassId) {
        const successCount = await createRecurringClasses(classData);
        if (successCount) {
          setMessage(`✔️ נוצרו ${successCount} שיעורים מחזוריים בהצלחה!`);
        } else {
          setMessage("❌ שגיאה ביצירת שיעורים מחזוריים");
        }
      } else {
        if (editingClassId) {
          await updateDoc(doc(db, "classes", editingClassId), classData);
          setMessage("✔️ שיעור עודכן בהצלחה!");
        } else {
          const docRef = await addDoc(collection(db, "classes"), classData);
          const classWithId = { ...classData, id: docRef.id };
          const autoRegistrations = await autoRegisterUsersForClass(classWithId);
          setMessage(
            `✔️ שיעור נוסף בהצלחה!${
              autoRegistrations > 0 ? ` ${autoRegistrations} משתמשים נרשמו אוטומטית.` : ""
            }`
          );
        }
      }

      clearForm();
      await fetchClasses();
      await fetchOccupancyMap();

      if (closeAfterSave) setIsModalOpen(false);
    } catch (err) {
      console.error("❌ שגיאה בשמירת השיעור:", err);
      setMessage("❌ שגיאה בשמירת השיעור, נסה שוב");
    }
    setLoading(false);
  };

  // שיעורים מחזוריים
  const createRecurringClasses = async (baseClassData) => {
    if (!date || !recurrenceEndDate || selectedDays.length === 0) {
      setMessage("אנא בחר תאריך התחלה, תאריך סיום וימים בשבוע");
      return false;
    }
    let currentDate = new Date(date);
    const endDate = new Date(recurrenceEndDate);
    let successCount = 0;
    let totalAutoRegistrations = 0;

    try {
      while (currentDate <= endDate) {
        const dow = currentDate.getDay(); // 0=ראשון
        if (selectedDays.includes(dow)) {
          const newClass = {
            ...baseClassData,
            date: formatDateToDDMMYYYY(new Date(currentDate)),
          };
          const docRef = await addDoc(collection(db, "classes"), newClass);
          const classWithId = { ...newClass, id: docRef.id };
          const autoRegs = await autoRegisterUsersForClass(classWithId);
          totalAutoRegistrations += autoRegs;
          successCount++;
        }
        currentDate = addDays(currentDate, 1);
      }
      if (totalAutoRegistrations > 0) {
        setMessage(
          `✔️ נוצרו ${successCount} שיעורים מחזוריים בהצלחה עם ${totalAutoRegistrations} רישומים אוטומטיים!`
        );
      }
      return successCount;
    } catch (err) {
      console.error("❌ שגיאה ביצירת שיעורים מחזוריים:", err);
      return false;
    }
  };

  // רישום אוטומטי – ללא שינוי מנגנון המנויים שלך, רק דואג לא לחרוג מקיבולת ולשמור spots קבוע
  const autoRegisterUsersForClass = async (classData) => {
    try {
      const usersQuery = query(collection(db, "Users"), where("autoJoin", "==", true));
      const usersSnapshot = await getDocs(usersQuery);
      if (usersSnapshot.empty) return 0;

      const [day, month, year] = classData.date.split("/").map(Number);
      const classDate = new Date(year, month - 1, day);
      const dayOfWeek = classDate.getDay();
      const [hh, mm] = classData.time.split(":").map(Number);
      const classTimeInMinutes = hh * 60 + mm;

      let registrationCount = 0;
      let localOccupancy = 0; // תפוסה מקומית עבור השיעור החדש
      const capacity = Number(classData.spots || 0);

      for (const userDoc of usersSnapshot.docs) {
        if (capacity > 0 && localOccupancy >= capacity) break; // הקיבולת מלאה—עצור

        const user = { id: userDoc.id, ...userDoc.data() };
        if (!user.preferredDays?.length || !user.preferredTimeRange) continue;
        if (!user.preferredDays.includes(dayOfWeek)) continue;

        const [startTime, endTime] = user.preferredTimeRange.split("-");
        const [sh, sm] = startTime.split(":").map(Number);
        const [eh, em] = endTime.split(":").map(Number);
        const startMinutes = sh * 60 + sm;
        const endMinutes = eh * 60 + em;
        if (classTimeInMinutes < startMinutes || classTimeInMinutes > endMinutes) continue;

        const userId = user.phone || user.id;

        // לא כבר רשום לשיעור הזה
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("userId", "==", userId),
          where("classId", "==", classData.id)
        );
        const existingBookings = await getDocs(bookingsQuery);
        if (!existingBookings.empty) continue;

        // בדיקות מנוי (כפי בקוד המקורי)
        const isWeeklySubscription = user.membershipType === "שבועי";
        const isMonthlySubscription = user.membershipType === "חודשי";
        const isCardSubscription = user.membershipType === "כרטיסייה";

        if (isCardSubscription && user.remainingLessons <= 0) continue;

        if (isWeeklySubscription) {
          const weekNumber = getWeekNumber(classDate);
          const weekKey = `${year}-${weekNumber}`;
          const userWeeklyQ = query(collection(db, "bookings"), where("userId", "==", userId));
          const userBookingsSnapshot = await getDocs(userWeeklyQ);
          const weeklyBookings = userBookingsSnapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((b) => {
              try {
                const [bd, bm, by] = b.date.split("/").map(Number);
                const bookingDate = new Date(by, bm - 1, bd);
                return `${by}-${getWeekNumber(bookingDate)}` === weekKey;
              } catch {
                return false;
              }
            });
          if (weeklyBookings.length >= (user.remainingLessons || 0)) continue;
        }

        if (isMonthlySubscription) {
          const monthKey = `${year}-${month}`;
          const userMonthlyQ = query(collection(db, "bookings"), where("userId", "==", userId));
          const userBookingsSnapshot = await getDocs(userMonthlyQ);
          const monthlyBookings = userBookingsSnapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((b) => {
              try {
                const [bd, bm, by] = b.date.split("/").map(Number);
                return `${by}-${bm}` === monthKey;
              } catch {
                return false;
              }
            });
          if (monthlyBookings.length >= (user.remainingLessons || 0)) continue;
        }

        // אכיפת קיבולת לפני ההכנסה
        if (capacity > 0 && localOccupancy >= capacity) break;

        // הוספת הרשמה
        await addDoc(collection(db, "bookings"), {
          classId: classData.id,
          userId,
          className: classData.name,
          date: classData.date,
          time: classData.time,
          bookedBy: "אוטומטית",
          bookedAt: new Date().toISOString(),
          autoBooked: true,
        });

        // לא משנים spots! נשמר קבוע. רק נספור מקומית.
        if (isCardSubscription) {
          try {
            await updateDoc(doc(db, "Users", user.id), {
              remainingLessons: (user.remainingLessons || 0) - 1,
            });
          } catch {
            // בולעים שגיאה נקודתית כדי לא להפיל את כל התהליך
          }
        }

        localOccupancy += 1;
        registrationCount += 1;
      }

      return registrationCount;
    } catch (err) {
      console.error("❌ שגיאה ברישום אוטומטי למשתמשים:", err);
      return 0;
    }
  };

  const getWeekNumber = (dateObj) => {
    const d = new Date(dateObj);
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    const days = Math.floor((d - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  };

  // ==================== בחירה/מחיקה ====================
  const handleClassSelection = (classId) => {
    setSelectedClasses((prev) =>
      prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]
    );
  };

  const selectAllClasses = () => {
    if (selectedClasses.length === classes.length) {
      setSelectedClasses([]);
    } else {
      setSelectedClasses(classes.map((c) => c.id));
    }
  };

  const confirmDeleteClass = (classId) => {
    setDeleteClassId(classId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteClass = async () => {
    if (!deleteClassId) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, "classes", deleteClassId));
      setMessage("✔️ שיעור נמחק בהצלחה!");
      await fetchClasses();
      await fetchOccupancyMap();
    } catch (err) {
      console.error("❌ שגיאה במחיקת השיעור:", err);
      setMessage("❌ שגיאה במחיקת השיעור, נסה שוב");
    }
    setShowDeleteConfirm(false);
    setDeleteClassId(null);
    setLoading(false);
  };

  const handleBulkDelete = async () => {
    if (selectedClasses.length === 0) return;
    setLoading(true);
    try {
      for (const classId of selectedClasses) {
        await deleteDoc(doc(db, "classes", classId));
      }
      setMessage(`✔️ ${selectedClasses.length} שיעורים נמחקו בהצלחה!`);
      await fetchClasses();
      await fetchOccupancyMap();
    } catch (err) {
      console.error("❌ שגיאה במחיקת שיעורים:", err);
      setMessage("❌ שגיאה במחיקת השיעורים, נסה שוב");
    }
    setShowBulkDeleteConfirm(false);
    setSelectedClasses([]);
    setLoading(false);
  };

  // ==================== UI ====================
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">ניהול שיעורים</h1>
      <BackToAdminButton />

      {/* סרגל בקרה סטיקי */}
      <div className="sticky top-0 z-10 bg-white pb-3 pt-2 border-b mb-4">
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חפש לפי שם שיעור / מדריך"
            className="border p-2 rounded w-full sm:w-64"
            aria-label="חיפוש"
          />

          <select
            value={instructorFilter}
            onChange={(e) => setInstructorFilter(e.target.value)}
            className="border p-2 rounded w-full sm:w-56"
            aria-label="פילטר מדריך"
          >
            <option value="">כל המדריכים</option>
            {instructors.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded">
            <input
              type="checkbox"
              checked={showUpcomingOnly}
              onChange={(e) => setShowUpcomingOnly(e.target.checked)}
              className="accent-blue-600"
              aria-label="רק שיעורים עתידיים"
            />
            רק שיעורים עתידיים
          </label>

          <button
            onClick={selectAllClasses}
            className="bg-gray-200 text-gray-800 px-3 py-2 rounded"
          >
            {selectedClasses.length === classes.length ? "בטל בחירת הכל" : "בחר הכל"}
          </button>

          <div className="ml-auto flex gap-2">
            {selectedClasses.length > 0 && (
              <button
                onClick={() => setShowBulkDeleteConfirm(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
              >
                <Trash2 size={18} className="mr-1" />
                מחק {selectedClasses.length}
              </button>
            )}
            <button
              onClick={() => {
                clearForm();
                setIsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              + הוסף שיעור חדש
            </button>
          </div>
        </div>
      </div>

      {/* הודעות/טעינה */}
      {message && <div className="my-2 text-blue-600">{message}</div>}
      {loading && <p className="text-gray-500">טוען...</p>}

      {/* רשימה מקובצת לפי תאריך */}
      <div className="space-y-6 lg:pr-[420px]">
        {grouped.map(([dateKey, items]) => (
          <section key={dateKey}>
            <header className="sticky top-[56px] bg-white z-[5] border-b mb-2">
              <h3 className="text-sm font-bold text-gray-700 py-2">{dateKey}</h3>
            </header>

            <div className="divide-y rounded border">
              {items.map((cls) => {
                const isCancelled = cls.cancelled === true;
                const cap = Number(cls.spots || 0);
                const occ = Number(occupancyMap[cls.id] || 0);
                const isFull = cap > 0 && occ >= cap;
                const percent = cap > 0 ? Math.min(100, Math.round((occ / cap) * 100)) : 0;

                return (
                  <div key={cls.id} className={`p-3 flex items-center gap-3 ${isCancelled ? "bg-red-50" : ""}`}>
                    <input
                      type="checkbox"
                      checked={selectedClasses.includes(cls.id)}
                      onChange={() => handleClassSelection(cls.id)}
                      className="h-4 w-4 accent-blue-600"
                      disabled={isCancelled}
                      aria-label={`בחר שיעור ${cls.name}`}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">{cls.name}</span>
                        {isFull && <span className="text-[11px] bg-gray-800 text-white px-2 py-0.5 rounded">מלא</span>}
                        {isCancelled && (
                          <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded">מבוטל</span>
                        )}
                      </div>

                      <div className="text-xs text-gray-600 mt-0.5 flex flex-wrap gap-x-4">
                        <span>שעה: {cls.time}</span>
                        <span>מדריך: {cls.instructor}</span>
                        <span title="תפוסה">נרשמו {occ}/{cap}</span>
                        {isCancelled && (
                          <span className="text-red-600 font-semibold">
                            ביטול: {cls.cancelReason || "חוסר מתאמנות"}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 w-full max-w-xs">
                        <div className="h-1.5 bg-gray-200 rounded">
                          <div
                            className={`h-1.5 rounded ${isFull ? "bg-gray-500" : "bg-blue-500"}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openModalForEdit(cls)}
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1 rounded text-sm flex items-center"
                        disabled={isCancelled}
                      >
                        <Edit size={16} className="mr-1" />
                        ערוך
                      </button>
                      <button
                        onClick={() => confirmDeleteClass(cls.id)}
                        className="bg-red-100 text-red-600 hover:bg-red-200 px-2 py-1 rounded text-sm flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" />
                        מחק
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Drawer צדדי (במקום מודל חוסם) */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsModalOpen(false)} />
          <aside
            className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white shadow-xl flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold">{editingClassId ? "עריכת שיעור" : "הוספת שיעור חדש"}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-black"
                aria-label="סגור"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-3">
              <div>
                <label className="block mb-1">שם השיעור:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>

              <div>
                <label className="block mb-1">תאריך ושעת האימון:</label>
                <DatePicker
                  selected={date}
                  onChange={(d) => setDate(d)}
                  dateFormat="dd/MM/yyyy"
                  className="border p-2 rounded w-full mb-2"
                  placeholderText="בחר תאריך"
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border p-2 rounded w-full"
                  step="60"
                  min="00:00"
                  max="23:59"
                />
              </div>

              <div>
                <label className="block mb-1">מקומות (קיבולת):</label>
                <input
                  type="number"
                  min="1"
                  value={spots}
                  onChange={(e) => setSpots(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <p className="text-xs text-gray-500 mt-1">הקיבולת קבועה; התפוסה מחושבת מרישומים.</p>
              </div>

              <div>
                <label className="block mb-1">מדריך:</label>
                <select
                  value={instructorId}
                  onChange={(e) => setInstructorId(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">בחר מדריך</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </div>

              {!editingClassId && (
                <div className="border-t pt-3">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="isRecurring"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="isRecurring" className="font-bold">
                      שיעור מחזורי
                    </label>
                  </div>

                  {isRecurring && (
                    <div className="bg-gray-50 p-3 rounded space-y-3">
                      <div>
                        <label className="block mb-2 font-medium">בחר ימים בשבוע:</label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { index: 0, name: "ראשון" },
                            { index: 1, name: "שני" },
                            { index: 2, name: "שלישי" },
                            { index: 3, name: "רביעי" },
                            { index: 4, name: "חמישי" },
                            { index: 5, name: "שישי" },
                            { index: 6, name: "שבת" },
                          ].map((day) => (
                            <label key={day.index} className="flex items-center bg-white px-2 py-1 rounded border">
                              <input
                                type="checkbox"
                                checked={selectedDays.includes(day.index)}
                                onChange={() => handleDayToggle(day.index)}
                                className="mr-1"
                              />
                              <span>{day.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1">תאריך סיום:</label>
                        <DatePicker
                          selected={recurrenceEndDate}
                          onChange={(d) => setRecurrenceEndDate(d)}
                          dateFormat="dd/MM/yyyy"
                          className="w-full border p-2 rounded"
                          placeholderText="בחר תאריך סיום"
                          minDate={date}
                        />
                      </div>

                      <p className="text-sm text-gray-500">ייווצרו שיעורים נפרדים בימים שנבחרו בטווח התאריכים.</p>
                    </div>
                  )}
                </div>
              )}

              {message && <div className="text-blue-500">{message}</div>}
            </div>

            <div className="p-4 border-t flex justify-between">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-200 px-4 py-2 rounded">
                ביטול
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveClass(true)}
                  className="bg-blue-600 text-white px-3 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "שומר..." : isRecurring && !editingClassId ? "צור וסגור" : "שמור וסגור"}
                </button>
                <button
                  onClick={() => handleSaveClass(false)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "שומר..." : "שמור"}
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* חלון אישור מחיקה */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">אישור מחיקה</h2>
            <p>האם אתה בטוח שברצונך למחוק את השיעור?</p>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-200 px-4 py-2 rounded flex items-center"
              >
                <X size={18} className="mr-1" />
                ביטול
              </button>
              <button
                onClick={handleDeleteClass}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center"
                disabled={loading}
              >
                {loading ? "מוחק..." : (<><Trash2 size={18} className="mr-1" />מחק</>)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* חלון אישור מחיקה מרובה */}
      {showBulkDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">אישור מחיקה מרובה</h2>
            <p>האם אתה בטוח שברצונך למחוק {selectedClasses.length} שיעורים מסומנים?</p>
            <p className="text-red-500 text-sm mt-2">שים לב: פעולה זו אינה ניתנת לביטול!</p>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowBulkDeleteConfirm(false)}
                className="bg-gray-200 px-4 py-2 rounded flex items-center"
              >
                <X size={18} className="mr-1" />
                ביטול
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center"
                disabled={loading}
              >
                {loading ? "מוחק..." : (<><Check size={18} className="mr-1" />מחק {selectedClasses.length} שיעורים</>)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClassesPanel;
