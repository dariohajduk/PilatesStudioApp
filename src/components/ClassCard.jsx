import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";
import toast from "react-hot-toast";
import { FiUsers, FiTrash2 } from "react-icons/fi";
import BookingModal from "./BookingModal";

const ClassCard = ({
  classInfo,
  employee,
  userData,
  isAlreadyBooked,
  refreshBookings,
  isPastClass,
}) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showParticipantsList, setShowParticipantsList] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const participantsBtnRef = useRef(null);
  const [openDirection, setOpenDirection] = useState("down");

  const isAdminOrInstructor = useMemo(() => {
    return (
      userData?.role === "admin" ||
      userData?.role === "instructor" ||
      userData?.role === "מנהל" ||
      userData?.role === "מדריך" ||
      userData?.isAdmin === true ||
      userData?.isInstructor === true
    );
  }, [userData]);

  const isRegularUser = useMemo(() => {
    return (
      !userData?.isInstructor &&
      !userData?.isAdmin &&
      userData?.role !== "מדריך" &&
      userData?.role !== "מנהל"
    );
  }, [userData]);

  const canViewClass = useMemo(() => {
    const isManager =
      userData?.role === "admin" ||
      userData?.role === "מנהל" ||
      userData?.isAdmin;
    const isInstructorAndOwnsClass =
      (userData?.isInstructor ||
        userData?.role === "מדריך" ||
        userData?.role === "instructor") &&
      classInfo?.instructorId === employee?.phone;
    return isManager || isRegularUser || isInstructorAndOwnsClass;
  }, [userData, employee, classInfo]);

  if (!canViewClass || !classInfo || !classInfo.id) return null;

  const loadParticipants = async () => {
    try {
      const qBookings = query(
        collection(db, "bookings"),
        where("classId", "==", classInfo.id)
      );
      const snapshot = await getDocs(qBookings);
      const list = await Promise.all(
        snapshot.docs.map(async (d) => {
          const b = d.data();
          const uid = b.userId;
          try {
            const uRef = doc(db, "Users", uid);
            const uSnap = await getDoc(uRef);
            const nameFromUsers = uSnap.exists() ? uSnap.data().name : null;
            return {
              id: d.id,
              name: b.userName || nameFromUsers || "לא ידוע",
              phone: uid,
            };
          } catch {
            return { id: d.id, name: b.userName || "לא ידוע", phone: uid };
          }
        })
      );
      setParticipants(list);
    } catch (e) {
      console.error("שגיאה בטעינת משתתפים:", e);
    }
  };

  useEffect(() => {
    loadParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classInfo.id, refreshBookings]);

  useEffect(() => {
    if (!showParticipantsList || !participantsBtnRef.current) return;
    const rect = participantsBtnRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setOpenDirection(spaceBelow < 250 ? "up" : "down");
  }, [showParticipantsList]);

  const countCurrentBookings = async () => {
    const qB = query(
      collection(db, "bookings"),
      where("classId", "==", classInfo.id)
    );
    const snap = await getDocs(qB);
    return snap.size;
  };
  const hasFreeSpot = async () => {
    const spotsCap = Number(classInfo?.spots ?? 0);
    if (!spotsCap || spotsCap <= 0) return true;
    const current = await countCurrentBookings();
    return current < spotsCap;
  };

  const handleBookingSelf = async () => {
    try {
      const bookingsRef = collection(db, "bookings");
      const qUser = query(bookingsRef, where("userId", "==", userData.phone));
      const snapshot = await getDocs(qUser);

      const sameDayBooking = snapshot.docs.some(
        (d) => d.data().date === classInfo.date
      );
      if (sameDayBooking) {
        return toast.error("כבר רשום לשיעור אחר באותו יום");
      }

      const [day, month, year] = classInfo.date.split("/");
      const classDateTime = new Date(`${year}-${month}-${day}T${classInfo.time}`);
      const startOfWeek = new Date(classDateTime);
      startOfWeek.setDate(classDateTime.getDate() - classDateTime.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const weeklyBookings = snapshot.docs.filter((d) => {
        const { date, time } = d.data();
        if (!date || !time) return false;
        const [d_, m_, y_] = date.split("/");
        const dt = new Date(`${y_}-${m_}-${d_}T${time}`);
        return dt >= startOfWeek && dt <= endOfWeek;
      });

      const weeklyLimit = userData.weeklyLimit || 0;
      if (weeklyBookings.length >= weeklyLimit) {
        return toast.error("הגעת למכסת השיעורים השבועית לשבוע זה");
      }

      if (!(await hasFreeSpot())) {
        return toast.error("השיעור מלא — אין מקומות פנויים");
      }

      const bookingId = `${classInfo.id}__${userData.phone}`;
      await setDoc(doc(db, "bookings", bookingId), {
        userId: userData.phone,
        userName: userData.name,
        classId: classInfo.id,
        className: classInfo.name,
        instructor: classInfo.instructor,
        date: classInfo.date,
        time: classInfo.time,
        createdAt: serverTimestamp(),
      });

      // בדיקת מירוץ: אם אחרי ההוספה עברנו את הקיבולת – מוחקים ומחזירים שגיאה
      const spotsCap = Number(classInfo?.spots ?? 0);
      if (spotsCap) {
        const after = await countCurrentBookings();
        if (after > spotsCap) {
          await deleteDoc(doc(db, "bookings", bookingId));
          return toast.error("השיעור כבר התמלא");
        }
      }

      toast.success("✔️ נרשמת לשיעור בהצלחה");
      await loadParticipants();
      refreshBookings?.();
    } catch (e) {
      console.error("שגיאה בהרשמה:", e);
      toast.error("שגיאה בהרשמה");
    }
  };

  const handleRemoveParticipant = async (userId) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק משתתף זה?")) return;
    setLoading(true);
    try {
      const qDel = query(
        collection(db, "bookings"),
        where("classId", "==", classInfo.id),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(qDel);
      await Promise.all(
        snapshot.docs.map((d) =>
          deleteDoc(doc(db, "bookings", d.id)).catch(() => null)
        )
      );
      toast.success("המשתתף הוסר");
      await loadParticipants();
      refreshBookings?.();
    } catch (error) {
      console.error("שגיאה במחיקת משתתף:", error);
      toast.error("שגיאה במחיקה");
    }
    setLoading(false);
  };

  const enrolledCountUI = participants.length;
  const maxCapacityUI =
    typeof classInfo?.spots === "number"
      ? classInfo.spots
      : Number(classInfo?.spots ?? 0) || undefined;
  const isFull =
    typeof maxCapacityUI === "number" && enrolledCountUI >= maxCapacityUI;

  const renderParticipantsList = () => (
    <div className="relative inline-block text-right">
      <button
        ref={participantsBtnRef}
        onClick={() => setShowParticipantsList((prev) => !prev)}
        className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer hover:text-blue-800 transition"
      >
        <span>רשומים: {enrolledCountUI}</span>
        <FiUsers size={18} />
      </button>

      {showParticipantsList && (
        <div
          className={`absolute z-50 ${
            openDirection === "up" ? "bottom-full mb-2" : "mt-2"
          } right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-64 max-h-64 overflow-y-auto p-2`}
        >
          {participants.length > 0 ? (
            participants.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center py-1 border-b last:border-b-0 text-sm text-gray-700"
              >
                <span className="truncate max-w-[170px]">{p.name}</span>
                {isAdminOrInstructor && p.phone !== userData?.phone && (
                  <button
                    onClick={() => handleRemoveParticipant(p.phone)}
                    disabled={loading}
                    className="text-red-500 hover:text-red-700 text-xs p-1 rounded hover:bg-red-50"
                    title="הסר משתמש"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-400 py-2 text-sm text-center">
              אין משתתפים
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative mb-4 flex justify-between items-center flex-wrap gap-4">
      <div className="text-right">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-bold">{classInfo.name}</h2>
          {isFull && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
              מלא
            </span>
          )}
        </div>

        <p className="text-sm text-gray-700">מדריך: {classInfo.instructor}</p>
        <p className="text-sm text-gray-700">תאריך: {classInfo.date}</p>
        <p className="text-sm text-gray-700">שעה: {classInfo.time}</p>

        {typeof maxCapacityUI === "number" && (
          <p className="mt-1 text-sm">
            נרשמו: <strong>{enrolledCountUI}</strong> / מקסימלי:{" "}
            <strong>{maxCapacityUI}</strong>
          </p>
        )}

        {renderParticipantsList()}
      </div>

      <div className="text-left flex flex-col gap-2">
        {isRegularUser && !isPastClass && !isAlreadyBooked && (
          <button
            onClick={handleBookingSelf}
            disabled={isFull}
            className={`px-4 py-2 rounded shadow text-white ${
              isFull
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            title={isFull ? "השיעור מלא" : "הירשם לשיעור"}
          >
            {isFull ? "מלא" : "הירשם לשיעור"}
          </button>
        )}

        {isAdminOrInstructor && !isPastClass && (
          <button
            onClick={() => setShowBookingModal(true)}
            disabled={isFull}
            className={`px-4 py-2 rounded shadow text-white ${
              isFull
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            title={isFull ? "השיעור מלא" : "הזמן מתאמן"}
          >
            הזמן מתאמן
          </button>
        )}
      </div>

      {showBookingModal && (
        <BookingModal
          onClose={() => setShowBookingModal(false)}
          classInfo={classInfo}
          refreshBookings={refreshBookings}
          employee={employee}
          hasFreeSpot={hasFreeSpot}
          countCurrentBookings={countCurrentBookings}
          isFull={isFull} // 👈 מוסר למודל כדי להשבית את הכפתור גם שם
        />
      )}
    </div>
  );
};

export default ClassCard;
