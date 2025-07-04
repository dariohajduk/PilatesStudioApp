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

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const q = query(
          collection(db, "bookings"),
          where("classId", "==", classInfo.id)
        );
        const snapshot = await getDocs(q);
        const fullParticipants = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const bookingData = docSnap.data();
            const uid = bookingData.userId;
            try {
              const userRef = doc(db, "Users", uid);
              const userSnap = await getDoc(userRef);
              const nameFromUserDoc = userSnap.exists()
                ? userSnap.data().name
                : null;
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
      const q = query(
        collection(db, "bookings"),
        where("classId", "==", classInfo.id),
        where("userId", "==", userId)
      );
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
  const handleCancelBooking = async () => {
    if (!window.confirm("האם אתה בטוח שברצונך לבטל את ההרשמה לשיעור?")) return;
    try {
      const q = query(
        collection(db, "bookings"),
        where("classId", "==", classInfo.id),
        where("userId", "==", userData.phone)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        toast.error("לא נמצאה הזמנה לביטול");
        return;
      }

      const bookingDoc = snapshot.docs[0];
      await deleteDoc(doc(db, "bookings", bookingDoc.id));

      // עדכון מקומות
      await updateDoc(doc(db, "classes", classInfo.id), {
        spots: classInfo.spots + 1,
      });

      // החזרת שיעור למנוי
      await updateDoc(doc(db, "Users", userData.phone), {
        remainingLessons: userData.remainingLessons + 1,
      });

      // שמירה באוסף cancellations
      await addDoc(collection(db, "cancellations"), {
        userId: userData.phone,
        classId: classInfo.id,
        date: classInfo.date,
        time: classInfo.time,
        cancelledAt: new Date(),
      });

      toast.success("ההרשמה בוטלה");
      if (refreshBookings) refreshBookings();
    } catch (error) {
      console.error("שגיאה בביטול ההרשמה:", error);
      toast.error("שגיאה בביטול ההרשמה");
    }
  };

  const handleBookingSelf = async () => {
    if (!userData || !userData.phone) {
      toast.error("שגיאה בזיהוי המשתמש");
      return;
    }

    if (userData.remainingLessons <= 0) {
      toast("אין לך שיעורים זמינים במנוי");
      return;
    }

    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    try {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", userData.phone)
      );
      const snapshot = await getDocs(q);

      const thisWeekBookings = snapshot.docs.filter((doc) => {
        const classDate = doc.data()?.date;
        if (!classDate) return false;
        const [d, m, y] = classDate.split("/");
        const dateObj = new Date(`${y}-${m}-${d}`);
        return dateObj >= weekStart && dateObj < weekEnd;
      });

      const maxLessonsPerWeek = 3; // תוכל לשנות לפי סוג מנוי
      if (thisWeekBookings.length >= maxLessonsPerWeek) {
        toast("חרגת ממספר השיעורים השבועי במנוי שלך");
        return;
      }

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

      await updateDoc(doc(db, "Users", userData.phone), {
        remainingLessons: userData.remainingLessons - 1,
      });

      await updateDoc(doc(db, "classes", classInfo.id), {
        spots: classInfo.spots - 1,
      });

      toast.success("נרשמת בהצלחה לשיעור");
      if (refreshBookings) refreshBookings();
    } catch (error) {
      console.error("שגיאה בהזמנה:", error);
      toast.error("שגיאה בביצוע ההזמנה");
    }
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
          className={`absolute z-50 ${
            openDirection === "up" ? "bottom-full mb-2" : "mt-2"
          } right-0 bg-white border border-gray-300 rounded shadow-lg w-64 max-h-[200px] overflow-y-auto p-2`}
        >
          {participants.length > 0 ? (
            participants.map((p) => {
              const isMe = p.phone === employee?.phone;
              return (
                <div
                  key={p.id}
                  className="flex justify-between items-center py-1 border-b border-gray-100"
                >
                  <span>
                    {p.name} {isMe ? "🎯" : "✅"}
                  </span>
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
            <div className="text-center text-gray-400 py-4">
              עדיין לא נרשמו מתאמנים
            </div>
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
        <p>🔁 רשומים: {participants.length}</p>
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

        {isRegularUser && !isPastClass && isAlreadyBooked && (
          <button
            onClick={handleCancelBooking}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            בטל הרשמה
          </button>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
