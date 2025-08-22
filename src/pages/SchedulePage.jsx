// src/pages/SchedulePage.jsx
import React, { useState, useEffect, useMemo } from "react";
import TopHeader from "../components/TopHeader";
import ClassCard from "../components/ClassCard";
import { db } from "../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { toast } from "react-hot-toast";
import { useUser } from "../context/UserContext";

/* ========= Utilities ========= */
// פורמט תאריך dd/MM/yyyy
const formatDate = (dateObj) => {
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};
// יום ראשון של השבוע, 00:00
const getStartOfWeek = (date) => {
  const base = new Date(date);
  const diff = base.getDate() - base.getDay(); // Sunday=0
  const d = new Date(base.getFullYear(), base.getMonth(), diff);
  d.setHours(0, 0, 0, 0);
  return d;
};
// האם השיעור בעבר (לפי תאריך/שעה מקומיים)
const isPastClass = (classDate, classTime) => {
  const [dd, mm, yyyy] = classDate.split("/");
  const classDateTime = new Date(`${yyyy}-${mm}-${dd}T${classTime}:00`);
  return classDateTime.getTime() < Date.now();
};

/* ========= Skeleton ========= */
const ClassSkeleton = () => (
  <div className="rounded-2xl border p-3 bg-white animate-pulse">
    <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
    <div className="h-3 w-1/3 bg-gray-200 rounded mb-2" />
    <div className="h-2 w-full bg-gray-100 rounded" />
  </div>
);

const SchedulePage = ({ employee }) => {
  const { userData } = useUser();
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // סטייטים עיקריים
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(today));
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customers, setCustomers] = useState([]);

  // נגזרות לתצוגה
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(currentWeekStart);
      d.setDate(currentWeekStart.getDate() + i);
      return d;
    });
  }, [currentWeekStart]);

  const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

  /* ========= Data loaders ========= */
  const fetchClasses = async () => {
    try {
      const snap = await getDocs(collection(db, "classes"));
      const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setClasses(list);
    } catch (e) {
      console.error("❌ שגיאה בטעינת השיעורים:", e);
      toast.error("שגיאה בטעינת השיעורים");
    }
  };

  const fetchCustomers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "Users"));
      const usersList = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCustomers(usersList);
    } catch (error) {
      console.error("❌ שגיאה בטעינת רשימת המשתמשים:", error);
      toast.error("שגיאה בטעינת משתמשים");
    }
  };

  const fetchUserBookings = async () => {
    if (!employee?.phone) return;
    try {
      const bookingsRef = collection(db, "bookings");
      const qUser = query(bookingsRef, where("userId", "==", employee.phone));
      const querySnapshot = await getDocs(qUser);
      setBookings(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("❌ שגיאה בטעינת ההזמנות של המשתמש:", error);
    }
  };

  // פופאפ משתתפים (נשמר – לא משנה את הזרימה שלך)
  const openParticipantsPopup = async (classId) => {
    try {
      const q = query(collection(db, "bookings"), where("classId", "==", classId));
      const snapshot = await getDocs(q);
      const userIds = snapshot.docs.map((doc) => doc.data().userId);

      const usersSnapshot = await getDocs(collection(db, "Users"));
      const usersMap = {};
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        usersMap[doc.id] = data.name || "לא ידוע";
      });

      const fullParticipants = userIds.map((uid) => ({
        id: uid,
        name: usersMap[uid] || "לא ידוע",
        phone: uid,
      }));

      setParticipants(fullParticipants);
      setShowParticipantsModal(true);
    } catch (error) {
      console.error("❌ שגיאה בטעינת נרשמים:", error);
      toast.error("שגיאה בטעינת נרשמים");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // קביעת הרשאות לפי employee (זהה ללוגיקה שלך)
      if (employee) {
        const userIsAdmin =
          employee.isAdmin === true ||
          employee.isInstructor === true ||
          employee.role === "מנהל" ||
          employee.role === "מדריך";
        setIsAdmin(Boolean(userIsAdmin));
      }
      await Promise.all([fetchClasses(), fetchUserBookings(), fetchCustomers()]);
      setLoading(false);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  /* ========= Navigation handlers ========= */
  const handlePrevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
    setSelectedDate(formatDate(prev));
  };

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
    setSelectedDate(formatDate(next));
  };

  const goToCurrentWeek = () => {
    const start = getStartOfWeek(today);
    setCurrentWeekStart(start);
    setSelectedDate(formatDate(today));
  };

  /* ========= Helpers used by ClassCard ========= */
  const isAlreadyBooked = (classId) => bookings.some((b) => b.classId === classId);

  /* ========= Filtered classes for selected day ========= */
  const dayClasses = useMemo(() => {
    const list = classes
      .filter((cls) => cls.date === selectedDate)
      .sort((a, b) => a.time.localeCompare(b.time));
    return list;
  }, [classes, selectedDate]);

  /* ========= Render ========= */
  return (
    <MainLayout employee={employee}>
      <div dir="rtl" className="max-w-6xl mx-auto">
        <TopHeader title="לוח שיעורים" />

        {/* פס ניווט שבועי דביק */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
          <div className="flex justify-between items-center p-3">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handlePrevWeek}
              className="bg-blue-100 p-2 rounded-full shadow"
              aria-label="שבוע קודם"
              title="שבוע קודם"
            >
              <ChevronRight size={20} className="text-blue-600" />
            </motion.button>

            <div className="text-center">
              <h3 className="font-bold text-lg">{selectedDate}</h3>
              {selectedDate !== formatDate(today) && (
                <button
                  onClick={goToCurrentWeek}
                  className="text-xs text-blue-600 mt-1 underline underline-offset-2"
                >
                  חזור להיום
                </button>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleNextWeek}
              className="bg-blue-100 p-2 rounded-full shadow"
              aria-label="שבוע הבא"
              title="שבוע הבא"
            >
              <ChevronLeft size={20} className="text-blue-600" />
            </motion.button>
          </div>

          {/* בחירת ימים – מותאם מובייל/דסקטופ */}
          <div className="grid grid-cols-7 w-full px-3 gap-1 pb-3">
            {weekDays.map((d, i) => {
              const dateStr = formatDate(d);
              const isSelected = selectedDate === dateStr;
              const isToday = formatDate(today) === dateStr;
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedDate(dateStr)}
                  className={[
                    "text-center py-2 rounded-xl shadow transition border",
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : isToday
                      ? "bg-blue-50 text-blue-700 border-blue-100"
                      : "bg-gray-100 text-gray-800 border-gray-200",
                  ].join(" ")}
                  aria-label={`בחר תאריך ${dateStr}`}
                  title={`בחר תאריך ${dateStr}`}
                >
                  <p className="text-xs font-medium">{dayNames[d.getDay()]}</p>
                  <p className="font-semibold text-sm">
                    {String(d.getDate()).padStart(2, "0")}/{String(d.getMonth() + 1).padStart(2, "0")}
                  </p>
                  {isToday && !isSelected && (
                    <div className="h-1 w-1 bg-blue-600 mx-auto mt-1 rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* גוף העמוד */}
        <div className="px-4 flex flex-col gap-3 pb-8 pt-4">
          {/* מצב טעינה */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ClassSkeleton key={i} />
              ))}
            </div>
          )}

          {/* ריק/שיעורים */}
          {!loading && (dayClasses.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p className="mb-2">אין שיעורים מתוכננים להיום.</p>
              <p className="text-3xl">🧘‍♀️</p>
            </div>
          ) : (
            dayClasses.map((cls) => (
              <div key={cls.id} className="relative">
                <ClassCard
                  classInfo={cls}
                  employee={employee}
                  userData={userData}
                  isAlreadyBooked={isAlreadyBooked(cls.id)}
                  refreshBookings={fetchUserBookings}
                  isPastClass={isPastClass(cls.date, cls.time)}
                  customers={customers}
                  isAdmin={isAdmin}
                  // אם תרצה לפתוח מודאל משתתפים מהכרטיס:
                  // onOpenParticipants={() => openParticipantsPopup(cls.id)}
                />
              </div>
            ))
          ))}

          {/* מודאל משתתפים (נשאר זהה) */}
          {showParticipantsModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-4 max-w-sm w-full">
                <h2 className="text-lg font-bold mb-2">משתתפים בשיעור</h2>
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {participants.map((p) => (
                    <li key={p.id} className="border-b pb-1">
                      {p.name} ({p.phone})
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowParticipantsModal(false)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  סגור
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SchedulePage;
