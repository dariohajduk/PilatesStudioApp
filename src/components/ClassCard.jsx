// ✅ גרסה מלאה ומשודרגת של ClassCard.jsx עם אפשרות למחוק משתמש משיעור
import React, { useState, useEffect, useRef, useMemo } from "react";
import { db } from "../services/firebase";
import { Tooltip } from "react-tooltip";

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
import toast from "react-hot-toast";
import { FiX, FiSearch, FiCheck, FiUsers, FiTrash2 } from "react-icons/fi";

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
  // State variables
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdminOptions, setShowAdminOptions] = useState(false);
  const [showUserSelector, setShowUserSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const searchInputRef = useRef(null);

  const canViewClass = useMemo(() => {
    const isManager =
      userData?.role === "admin" ||
      userData?.role === "מנהל" ||
      userData?.isAdmin;
    const isRegularUser =
      !userData?.isInstructor &&
      userData?.role !== "מדריך" &&
      userData?.role !== "instructor";
    const isInstructorAndOwnsClass =
      (userData?.isInstructor || userData?.role === "מדריך" || userData?.role === "instructor") &&
      classInfo?.instructorId === employee?.phone;

    return isManager || isRegularUser || isInstructorAndOwnsClass;
  }, [userData, employee, classInfo]);

  if (!canViewClass) return null;

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
        const q = query(
          collection(db, "bookings"),
          where("classId", "==", classInfo.id)
        );
        const snapshot = await getDocs(q);
        const userIds = snapshot.docs.map((doc) => doc.data().userId);

        const fullParticipants = await Promise.all(
          userIds.map(async (uid) => {
            const userSnap = await getDoc(doc(db, "Users", uid));
            const user = userSnap.data();
            return {
              id: uid,
              name: user?.name || "לא ידוע",
              phone: uid,
            };
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
    const term = searchTerm.toLowerCase();
    if (!term.trim()) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (c) => c.name?.toLowerCase().includes(term) || c.phone?.includes(term)
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

  // פונקציה למחיקת משתמש מהרשמות השיעור
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

      if (snapshot.empty) {
        toast.error("❌ לא נמצאה הרשמה למחיקה");
        setLoading(false);
        return;
      }

      for (const docSnap of snapshot.docs) {
        await deleteDoc(doc(db, "bookings", docSnap.id));
      }

      toast.success("✔️ המשתמש הוסר מהשיעור בהצלחה");
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error("❌ שגיאה במחיקת המשתמש מהשיעור:", error);
      toast.error("❌ שגיאה במחיקה");
    }
    setLoading(false);
  };

  const renderParticipantsTooltip = () => {
    return (
      <>
        <div
          data-tooltip-id={`tooltip-${classInfo.id}`}
          className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer hover:text-blue-800 transition"
        >
          <span>רשומים: {participants.length}</span>
          <FiUsers size={18} />
        </div>
  
        <Tooltip id={`tooltip-${classInfo.id}`} clickable place="bottom">
          <div className="flex flex-col max-h-48 overflow-auto p-2 min-w-[200px]">
            {participants.length > 0 ? (
              participants.map((p) => {
                const isMe = p.phone === employee?.phone;
                return (
                  <div
                    key={p.id}
                    className="flex justify-between items-center py-1 border-b border-gray-200"
                  >
                    <span>{p.name} {isMe ? "🎯" : "✅"}</span>
                    {(isAdmin || isAdminOrInstructor) && !isMe && (
                      <button
                        onClick={() => handleRemoveParticipant(p.phone)}
                        disabled={loading}
                        className="text-red-500 hover:text-red-700 text-xs p-1 rounded"
                        title="מחק משתמש מהשיעור"
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
        </Tooltip>
      </>
    );
  };

  const handleBooking = async () => {
    if (!employee) {
      toast.error("❗ עליך להתחבר כדי להזמין מקום");
      return;
    }

    setLoading(true);
    try {
      // בדיקה אם כבר רשום
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("userId", "==", employee.phone),
        where("classId", "==", classInfo.id)
      );
      const existingBookingSnapshot = await getDocs(q);
      if (!existingBookingSnapshot.empty) {
        toast.error("❗ אתה כבר רשום לשיעור הזה");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "bookings"), {
        userId: employee.phone,
        classId: classInfo.id,
        name: classInfo.name,
        instructor: classInfo.instructor,
        instructorPhone: employee.phone,
        date: classInfo.date,
        time: classInfo.time,
        createdAt: new Date(),
      });
      toast.success("✔️ נרשמת בהצלחה!");
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error("❌ שגיאה בהרשמה:", error);
      toast.error("❌ שגיאה בהרשמה. נסה שוב");
    }
    setLoading(false);
  };

  const bookClassForUser = async (user) => {
    if (!user) {
      toast.error("❗ עליך לבחור משתמש להזמנה");
      return;
    }

    setLoading(true);

    try {
      // בדיקה אם המשתמש כבר רשום
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("userId", "==", user.phone),
        where("classId", "==", classInfo.id)
      );
      const existingBookingSnapshot = await getDocs(q);
      if (!existingBookingSnapshot.empty) {
        toast.error("❗ המשתמש כבר רשום לשיעור הזה");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "bookings"), {
        userId: user.phone,
        classId: classInfo.id,
        name: classInfo.name,
        instructor: classInfo.instructor,
        date: classInfo.date,
        time: classInfo.time,
        createdAt: new Date(),
      });
      toast.success("✔️ נרשם בהצלחה!");
      setShowUserSelector(false);
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error("❌ שגיאה בהרשמה:", error);
      toast.error("❌ שגיאה בהרשמה. נסה שוב");
    }
    setLoading(false);
  };

  const handleCancelBookingWithOptionalReason = async () => {
    const userId = userData?.phone;
    if (!userId) {
      toast.error("משתמש לא מזוהה. נסה להתחבר מחדש.");
      return;
    }

    const reason = prompt("אפשר להזין סיבת ביטול (לא חובה):");

    try {
      if (reason && reason.trim()) {
        await addDoc(collection(db, "cancellations"), {
          classId: classInfo.id,
          userId,
          userName: userData.name || "",
          date: classInfo.date,
          time: classInfo.time,
          reason: reason.trim(),
          cancelledAt: new Date(),
        });
        toast.success("✔️ הסיבה נשמרה");
      }

      const q = query(
        collection(db, "bookings"),
        where("classId", "==", classInfo.id),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach((docSnap) => deleteDoc(doc(db, "bookings", docSnap.id)));

      toast.success("הביטול בוצע בהצלחה");
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error("❌ שגיאה בביטול:", error);
      toast.error("שגיאה בביטול");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow relative mb-4">
      <h2 className="text-lg font-bold mb-2">{classInfo.name}</h2>
      <p>מדריך: {classInfo.instructor}</p>
      <p>תאריך: {classInfo.date}</p>
      <p>שעה: {classInfo.time}</p>
      {renderParticipantsTooltip()}

      {!employee && (
        <p className="text-red-400 mt-2">🔒 התחברות נדרשת להזמנה</p>
      )}

      {employee && !isAlreadyBooked && !isPastClass && (
        <>
          <button
            onClick={() => {
              if (isAdminOrInstructor) {
                setShowAdminOptions(true);
              } else {
                handleBooking();
              }
            }}
            disabled={loading}
            className="mt-3 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            {loading ? "שולח בקשה..." : "הזמן מקום"}
          </button>

          {showAdminOptions && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-5 w-full max-w-sm text-center">
                <h3 className="text-lg font-bold mb-4">
                  האם ברצונך להזמין לעצמך או למתאמן אחר?
                </h3>
                <div className="flex flex-col gap-3">
                  <button
                    className="bg-blue-600 text-white py-2 rounded"
                    onClick={() => {
                      setShowAdminOptions(false);
                      handleBooking();
                    }}
                  >
                    הזמן לעצמי
                  </button>
                  <button
                    className="bg-gray-200 text-black py-2 rounded"
                    onClick={() => {
                      setShowAdminOptions(false);
                      setShowUserSelector(true);
                    }}
                  >
                    הזמן עבור מתאמן אחר
                  </button>
                  <button
                    onClick={() => setShowAdminOptions(false)}
                    className="text-sm text-gray-500 mt-2"
                  >
                    ביטול
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {employee && isAlreadyBooked && (
        <button
          onClick={handleCancelBookingWithOptionalReason}
          disabled={loading}
          className="mt-3 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white w-full"
        >
          {loading ? "מבטל..." : "בטל הזמנה"}
        </button>
      )}

      {isPastClass && (
        <p className="text-gray-500 text-sm mt-2">🕒 השיעור הסתיים</p>
      )}

      {showUserSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-5 w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">בחר מתאמן להזמנה</h3>
              <button
                onClick={() => setShowUserSelector(false)}
                className="text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FiSearch size={18} className="text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="חפש לפי שם או טלפון..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-100 w-full pr-10 py-2 rounded border border-gray-300"
              />
            </div>

            <div className="overflow-y-auto flex-1 border rounded">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => setSelectedUser(customer)}
                  className={`p-3 cursor-pointer hover:bg-gray-100 transition ${
                    selectedUser?.id === customer.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                    </div>
                    {selectedUser?.id === customer.id && (
                      <div className="text-blue-500">
                        <FiCheck size={18} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowUserSelector(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                ביטול
              </button>
              <button
                onClick={() => bookClassForUser(selectedUser)}
                disabled={!selectedUser}
                className={`px-4 py-2 rounded text-white ${
                  selectedUser
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                הזמן שיעור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCard;
