import React, { useState, useEffect } from "react";
import TopHeader from "../components/TopHeader";
import ClassCard from "../components/ClassCard";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { toast } from "react-hot-toast";
import { useUser } from "../context/UserContext";

/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
/**
 * TODO: תאר את הפונקציה SchedulePage
 */
const SchedulePage = ({ employee }) => {
  const today = new Date();
  const { userData } = useUser();

  const formatDate = (dateObj) => {
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getStartOfWeek = (date) => {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek;
    return new Date(date.getFullYear(), date.getMonth(), diff);
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(today));
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customers, setCustomers] = useState([]);

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

  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes"));
      setClasses(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("❌ שגיאה בטעינת השיעורים:", error);
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
    if (!employee) return;
    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("userId", "==", employee.phone));
      const querySnapshot = await getDocs(q);
      setBookings(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("❌ שגיאה בטעינת ההזמנות של המשתמש:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let userIsAdmin = false;
      if (employee) {
        userIsAdmin = Boolean(
          employee.isAdmin === true ||
          employee.isInstructor === true ||
          employee.role === "מנהל" ||
          employee.role === "מדריך"
        );
        setIsAdmin(userIsAdmin);
      }

      await fetchClasses();
      await fetchUserBookings();
      await fetchCustomers();
      setLoading(false);
    };
    loadData();
  }, [employee]);

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeekStart(prevWeek);
    setSelectedDate(formatDate(prevWeek));
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeekStart(nextWeek);
    setSelectedDate(formatDate(nextWeek));
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(getStartOfWeek(today));
    setSelectedDate(formatDate(today));
  };

  const isAlreadyBooked = (classId) =>
    bookings.some((booking) => booking.classId === classId);

  const isPastClass = (classDate, classTime) => {
    const classDateTime = new Date(`${classDate.split("/").reverse().join("-")}T${classTime}`);
    return classDateTime < new Date();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>טוען שיעורים...</p>
      </div>
    );
  }

  return (
    <MainLayout employee={employee}>
      <TopHeader title="לוח שיעורים" />
      <div className="flex justify-between items-center p-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={handlePrevWeek} className="bg-blue-100 p-2 rounded-full shadow">
          <ChevronRight size={20} className="text-blue-600" />
        </motion.button>

        <div className="text-center">
          <h3 className="font-bold text-lg">{selectedDate}</h3>
          {selectedDate !== formatDate(today) && (
            <button onClick={goToCurrentWeek} className="text-xs text-blue-500 mt-1">
              חזור להיום
            </button>
          )}
        </div>

        <motion.button whileTap={{ scale: 0.9 }} onClick={handleNextWeek} className="bg-blue-100 p-2 rounded-full shadow">
          <ChevronLeft size={20} className="text-blue-600" />
        </motion.button>
      </div>

      <div className="grid grid-cols-7 w-full px-2 gap-1">
        {Array.from({ length: 7 }).map((_, i) => {
          const dateObj = new Date(currentWeekStart);
          dateObj.setDate(currentWeekStart.getDate() + i);
          const dateStr = formatDate(dateObj);
          const isSelected = selectedDate === dateStr;
          const isToday = formatDate(today) === dateStr;
          const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

          return (
            <motion.div
              key={i}
              onClick={() => setSelectedDate(dateStr)}
              whileTap={{ scale: 0.95 }}
              className={`text-center py-2 rounded-xl shadow cursor-pointer transition ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : isToday
                  ? "bg-blue-100"
                  : "bg-gray-100"
              }`}
            >
              <p className="text-xs font-medium">{dayNames[dateObj.getDay()]}</p>
              <p className="font-semibold text-sm">
                {dateObj.getDate().toString().padStart(2, "0")}/
                {(dateObj.getMonth() + 1).toString().padStart(2, "0")}
              </p>
              {isToday && !isSelected && (
                <div className="h-1 w-1 bg-blue-500 mx-auto mt-1 rounded-full"></div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="px-4 flex flex-col gap-3 pb-6">
        {classes.filter((cls) => cls.date === selectedDate).length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-2">אין שיעורים מתוכננים להיום.</p>
            <p className="text-3xl">🧘‍♀️</p>
          </div>
        ) : (
          classes
            .filter((cls) => cls.date === selectedDate)
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((cls) => (
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
                />
              </div>
            ))
        )}

        {showParticipantsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 max-w-sm w-full">
              <h2 className="text-lg font-bold mb-2">משתתפים בשיעור</h2>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {participants.map((p) => (
                  <li key={p.id} className="border-b pb-1">
                    {p.name} ({p.phone})
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowParticipantsModal(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                סגור
              </button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SchedulePage;
