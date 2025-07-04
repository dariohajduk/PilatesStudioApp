// ✅ גרסה מתוקנת של ClassCard.jsx עם popup שנשאר בתוך המסך (נפתח למעלה אם צריך)

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
} from "firebase/firestore";
import { db } from "../services/firebase";
import toast from "react-hot-toast";
import { FiUsers, FiTrash2 } from "react-icons/fi";

const ClassCard = ({
  classInfo,
  employee,
  userData,
  isAlreadyBooked,
  refreshBookings,
  isPastClass,
  customers = [],
  isAdmin = false,
}) => {

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showParticipantsList, setShowParticipantsList] = useState(false);
  const participantsBtnRef = useRef(null);
  const popupRef = useRef(null);
  const [openDirection, setOpenDirection] = useState("down");

  const canViewClass = useMemo(() => {
    const isManager = userData?.role === "admin" || userData?.role === "מנהל" || userData?.isAdmin;
    const isRegularUser = !userData?.isInstructor && userData?.role !== "מדריך" && userData?.role !== "instructor";
    const isInstructorAndOwnsClass =
      (userData?.isInstructor || userData?.role === "מדריך" || userData?.role === "instructor") &&
      classInfo?.instructorId === employee?.phone;
    return isManager || isRegularUser || isInstructorAndOwnsClass;
  }, [userData, employee, classInfo]);

  if (!canViewClass) return null;
  if (!classInfo || !classInfo.id) return null;

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
  }, [classInfo.id]);

  useEffect(() => {
    if (!showParticipantsList || !participantsBtnRef.current) return;
    const rect = participantsBtnRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setOpenDirection(spaceBelow < 250 ? "up" : "down");
  }, [showParticipantsList]);

  const handleRemoveParticipant = async (userId) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק משתמש זה מהשיעור?")) return;
    setLoading(true);
    try {
      const q = query(collection(db, "bookings"), where("classId", "==", classInfo.id), where("userId", "==", userId));
      const snapshot = await getDocs(q);
      for (const docSnap of snapshot.docs) {
        await deleteDoc(doc(db, "bookings", docSnap.id));
      }
      toast.success("✔️ המשתמש הוסר מהשיעור");
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
          className={`absolute z-50 ${openDirection === "up" ? "bottom-full mb-2" : "mt-2"} right-0 bg-white border border-gray-300 rounded shadow-lg w-64 max-h-[200px] overflow-y-auto p-2`}
        >
          {participants.length > 0 ? (
            participants.map((p) => {
              const isMe = p.phone === employee?.phone;
              return (
                <div key={p.id} className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span>{p.name} {isMe ? "🎯" : "✅"}</span>
                  {(isAdmin || isAdminOrInstructor) && !isMe && (
                    <button
                      onClick={() => handleRemoveParticipant(p.phone)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700 text-xs p-1 rounded"
                      title="הסר משתמש"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400 py-4">עדיין לא נרשמו מתאמנים</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-4 rounded shadow relative mb-4">
      <h2 className="text-lg font-bold mb-2">{classInfo.name}</h2>
      <p>מדריך: {classInfo.instructor}</p>
      <p>תאריך: {classInfo.date}</p>
      <p>שעה: {classInfo.time}</p>
      {renderParticipantsList()}
    </div>
  );
};

export default ClassCard;
