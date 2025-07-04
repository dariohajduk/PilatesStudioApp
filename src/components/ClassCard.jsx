// ✅ ClassCard.jsx מלא עם תצוגת משתתפים כולל מחיקת משתמשים על ידי מנהל/מדריך

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
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
  const popupRef = useRef(null);
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
    const isManager = userData?.role === "admin" || userData?.role === "מנהל" || userData?.isAdmin;
    const isInstructorAndOwnsClass =
      (userData?.isInstructor || userData?.role === "מדריך" || userData?.role === "instructor") &&
      classInfo?.instructorId === employee?.phone;
    return isManager || isRegularUser || isInstructorAndOwnsClass;
  }, [userData, employee, classInfo]);

  if (!canViewClass || !classInfo || !classInfo.id) return null;

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const q = query(collection(db, "bookings"), where("classId", "==", classInfo.id));
        const snapshot = await getDocs(q);
        const fullParticipants = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const bookingData = docSnap.data();
            const uid = bookingData.userId;
            try {
              const userRef = doc(db, "Users", uid);
              const userSnap = await getDoc(userRef);
              const nameFromUserDoc = userSnap.exists() ? userSnap.data().name : null;
              return {
                id: docSnap.id,
                name: bookingData.userName || nameFromUserDoc || "לא ידוע",
                phone: uid,
              };
            } catch {
              return {
                id: docSnap.id,
                name: bookingData.userName || "לא ידוע",
                phone: uid,
              };
            }
          })
        );
        setParticipants(fullParticipants);
      } catch (error) {
        console.error("שגיאה בטעינת משתתפים:", error);
      }
    };
    fetchParticipants();
  }, [classInfo.id, refreshBookings]);

  useEffect(() => {
    if (!showParticipantsList || !participantsBtnRef.current) return;
    const rect = participantsBtnRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setOpenDirection(spaceBelow < 250 ? "up" : "down");
  }, [showParticipantsList]);

  const handleBookingSelf = async () => {
    try {
      await addDoc(collection(db, "bookings"), {
        userId: userData.phone,
        userName: userData.name,
        classId: classInfo.id,
        className: classInfo.name,
        instructor: classInfo.instructor,
        date: classInfo.date,
        time: classInfo.time,
        createdAt: new Date(),
      });
      toast.success("נרשמת הוספה לשיעור");
      if (refreshBookings) refreshBookings();
    } catch (e) {
      toast.error("שגיאה בהרשמה");
    }
  };

  const handleRemoveParticipant = async (userId) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק משתתף זה?")) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, "bookings"),
        where("classId", "==", classInfo.id),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      for (const docSnap of snapshot.docs) {
        await deleteDoc(doc(db, "bookings", docSnap.id));
      }
      toast.success("המשתתף הוסר");
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error("שגיאה במחיקת משתתף:", error);
      toast.error("שגיאה במחיקה");
    }
    setLoading(false);
  };

  const renderParticipantsList = () => (
    <div className="relative inline-block text-right">
      <button
        ref={participantsBtnRef}
        onClick={() => setShowParticipantsList((prev) => !prev)}
        className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer hover:text-blue-800 transition"
      >
        <span>רשומים: {participants.length}</span>
        <FiUsers size={18} />
      </button>

      {showParticipantsList && (
        <div
          ref={popupRef}
          className={`absolute z-50 ${openDirection === "up" ? "bottom-full mb-2" : "mt-2"} right-0 bg-white border border-gray-300 rounded shadow-lg w-64 max-h-64 overflow-y-auto p-2`}
        >
          {participants.length > 0 ? (
            participants.map((p) => (
              <div key={p.id} className="flex justify-between items-center py-1 border-b text-sm text-gray-700">
                <span>{p.name}</span>
                {isAdminOrInstructor && p.phone !== userData?.phone && (
                  <button
                    onClick={() => handleRemoveParticipant(p.phone)}
                    disabled={loading}
                    className="text-red-500 hover:text-red-700 text-xs p-1"
                    title="הסר משתמש"
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-400 py-2 text-sm text-center">אין משתתפים</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-4 rounded shadow relative mb-4 flex justify-between items-center flex-wrap gap-4">
      <div className="text-right">
        <h2 className="text-lg font-bold mb-1">{classInfo.name}</h2>
        <p>מדריך: {classInfo.instructor}</p>
        <p>תאריך: {classInfo.date}</p>
        <p>שעה: {classInfo.time}</p>
        {renderParticipantsList()}
      </div>

      <div className="text-left flex flex-col gap-2">
        {isRegularUser && !isPastClass && !isAlreadyBooked && (
          <button
            onClick={handleBookingSelf}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            הירשם לשיעור
          </button>
        )}

        {isAdminOrInstructor && !isPastClass && (
          <button
            onClick={() => setShowBookingModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
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
        />
      )}
    </div>
  );
};

export default ClassCard;
