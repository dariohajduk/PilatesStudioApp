import React, { useState, useEffect, useRef, useMemo } from "react";
import { db } from "../services/firebase";
import { FiUsers } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiX, FiSearch, FiCheck } from "react-icons/fi"; // 🛠 ייבוא אייקונים מתוקן

// ==================== קומפוננטת כרטיסיית שיעור ====================
// ==================== קומפוננטת כרטיסיית שיעור ====================
const ClassCard = ({
  classInfo, // מידע על השיעור (שם, מדריך, תאריך, שעה, מקומות וכו')
  employee, // פרטי המשתמש המחובר (מכיל רק טלפון)
  userData, // ✅ נתוני המשתמש המורחבים (נטען מראש מהקומפוננטה האב - כולל סוג מנוי, שיעורים שנותרו וכו')
  isAlreadyBooked, // האם המשתמש כבר רשום לשיעור הזה
  refreshBookings, // פונקציה לרענון רשימת ההזמנות (כדי שהמסך יתעדכן אחרי הרשמה/ביטול)
  isPastClass, // האם השיעור כבר התרחש (כדי למנוע הרשמה לשיעור עבר)
  customers = [], // רשימת כל הלקוחות (משמש את המנהל לבחירת משתמש להזמנה)
  isAdmin = false, // האם הקומפוננטה מוצגת מתוך ממשק ניהול
}) => {
  // ========== משתני מצב (State) ==========.
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [participants, setParticipants] = useState([]); // משתנה לאחסון רשימת המשתתפים
  const [loading, setLoading] = useState(false); // אינדיקטור טעינה
  const [registeredCount, setRegisteredCount] = useState(0); // מספר הנרשמים לשיעור
  const [totalSpots, setTotalSpots] = useState(0); // סך כל המקומות בשיעור
  const [showUserSelector, setShowUserSelector] = useState(false); // חלון בחירת משתמש
  const [searchTerm, setSearchTerm] = useState(""); // מונח חיפוש
  const [filteredCustomers, setFilteredCustomers] = useState([]); // רשימת משתמשים מסוננת
  const [selectedUser, setSelectedUser] = useState(null); // משתמש שנבחר
  const searchInputRef = useRef(null); // הפניה לשדה החיפוש
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
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  // ========== פונקציות עזר ==========
  const openParticipantsPopup = async () => {
    try {
      const q = query(
        collection(db, "bookings"),
        where("classId", "==", classInfo.id)
      );
      const snapshot = await getDocs(q);
      const userIds = snapshot.docs.map((doc) => doc.data().userId);

      const usersSnapshot = await getDocs(collection(db, "Users"));
      const usersMap = {};
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        usersMap[doc.id] = data.name || "לא ידוע";
      });

      const fullParticipants = await Promise.all(
        userIds.map(async (uid) => {
          const userRef = doc(db, "Users", uid);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.exists() ? userSnap.data() : {};
          return {
            id: uid,
            name: userData.name || uid,
            phone: uid,
          };
        })
      );

      setParticipants(fullParticipants);
      console.log("📋 participants loaded:", fullParticipants);
      setShowParticipantsModal(true);
    } catch (error) {
      console.error("❌ שגיאה בטעינת נרשמים:", error);
      toast.error("❌ שגיאה בטעינת נרשמים");
    }
  };

  // פונקציה לחישוב מספר השבוע בשנה
  const getWeekNumber = (dateObj) => {
    const tempDate = new Date(dateObj.getTime()); // יצירת עותק של התאריך
    tempDate.setHours(0, 0, 0, 0); // איפוס השעות, דקות, שניות ומילישניות

    // הגדרת התאריך ליום חמישי הקרוב (לפי הגדרת ISO)
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));

    // חישוב מספר השבוע
    const yearStart = new Date(tempDate.getFullYear(), 0, 1); // תחילת השנה
    const weekNo = Math.ceil(
      ((tempDate - yearStart) / 86400000 + 1) / 7 // חישוב מספר השבוע
    );
    return { year: tempDate.getFullYear(), week: weekNo }; // החזרת שנה ומספר שבוע
  };

  // פונקציה לבדיקה אם ניתן לבטל הזמנה (יותר מ-5 שעות לפני השיעור)
  const canCancelBooking = () => {
    // המרת תאריך ושעת השיעור לאובייקט Date
    const classDateTime = new Date(
      `${classInfo.date.split("/").reverse().join("-")}T${classInfo.time}`
    );
    const now = new Date(); // זמן נוכחי
    const hoursDifference = (classDateTime - now) / (1000 * 60 * 60); // הפרש בשעות
    return hoursDifference >= 5; // אם ההפרש גדול או שווה ל-5 שעות, ניתן לבטל
  };

  // ========== השפעות (Effects) ==========

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
  // אפקט לחישוב מספר הנרשמים לשיעור
  useEffect(() => {
    const calcRegistered = async () => {
      try {
        // שליפת כל ההזמנות לשיעור הנוכחי
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("classId", "==", classInfo.id));
        const querySnapshot = await getDocs(q);

        const registered = querySnapshot.docs.length; // מספר הנרשמים

        setRegisteredCount(registered); // עדכון מספר הנרשמים
        setTotalSpots(classInfo.spots + registered); // עדכון סך כל המקומות
      } catch (error) {
        console.error("❌ שגיאה בחישוב רשומים:", error); // לוג שגיאה
      }
    };
    calcRegistered(); // הפעלת פונקציית החישוב
  }, [classInfo]); // ביצוע מחדש כאשר מידע השיעור משתנה

  // ========== פונקציות טיפול בהזמנות ==========
  // פונקציה לבדיקה אם המשתמש יכול להירשם לשיעור (על פי סוג המנוי)
  const canBookLesson = async (user) => {
    if (!user) {
      console.log("❗ אין userData"); // לוג שגיאה
      return false; // אם אין נתוני משתמש, לא ניתן להירשם
    }

    // שליפת כל ההזמנות של המשתמש
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("userId", "==", employee.phone));
    const querySnapshot = await getDocs(q);
    const allBookings = querySnapshot.docs.map((doc) => doc.data());

    const membershipType = user.membershipType; // סוג המנוי
    const maxLessons = user.remainingLessons; // מספר השיעורים המקסימלי

    console.log(`🔎 סוג מנוי: ${membershipType}, כמות מקסימלית: ${maxLessons}`); // לוג מידע

    // בדיקה לפי סוג המנוי
    if (membershipType === "שבועי") {
      // בדיקת מנוי שבועי
      const today = new Date();
      // המרת תאריך השיעור לאובייקט Date
      const currentClassDateParts = classInfo.date.split("/");
      const currentClassDate = new Date(
        `${currentClassDateParts[2]}-${currentClassDateParts[1]}-${currentClassDateParts[0]}`
      );

      // חישוב מספר השבוע של השיעור
      const { year: currentYear, week: currentWeek } =
        getWeekNumber(currentClassDate);

      // סינון ההזמנות לשבוע הנוכחי
      const currentWeekBookings = allBookings.filter((b) => {
        if (!b.date) return false;

        const [day, month, year] = b.date.split("/");
        const bookingDate = new Date(`${year}-${month}-${day}`);
        const { year: bookingYear, week: bookingWeek } =
          getWeekNumber(bookingDate);

        return bookingYear === currentYear && bookingWeek === currentWeek;
      });

      console.log("✅ מספר הרשמות לשבוע זה:", currentWeekBookings.length); // לוג מידע

      return currentWeekBookings.length < maxLessons; // בדיקה אם עדיין לא הגיע למכסה השבועית
    }

    if (membershipType === "חודשי") {
      // בדיקת מנוי חודשי
      const today = new Date();
      // המרת תאריך השיעור לאובייקט Date
      const currentClassDateParts = classInfo.date.split("/");
      const currentClassDate = new Date(
        `${currentClassDateParts[2]}-${currentClassDateParts[1]}-${currentClassDateParts[0]}`
      );

      const currentMonth = currentClassDate.getMonth(); // חודש השיעור
      const currentYear = currentClassDate.getFullYear(); // שנת השיעור

      // סינון ההזמנות לחודש הנוכחי
      const currentMonthBookings = allBookings.filter((b) => {
        if (!b.date) return false;

        const [day, month, year] = b.date.split("/");
        const bookingDate = new Date(`${year}-${month}-${day}`);

        return (
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear
        );
      });

      console.log("✅ מספר הרשמות לחודש זה:", currentMonthBookings.length); // לוג מידע

      return currentMonthBookings.length < maxLessons; // בדיקה אם עדיין לא הגיע למכסה החודשית
    }

    if (membershipType === "כרטיסייה") {
      // בדיקת מנוי כרטיסייה
      console.log("✅ כרטיסייה - שיעורים שנותרו:", user.remainingLessons); // לוג מידע
      return user.remainingLessons > 0; // בדיקה אם נותרו שיעורים בכרטיסייה
    }

    console.log("❗ סוג מנוי לא מזוהה"); // לוג שגיאה
    return false; // אם סוג המנוי לא מזוהה, לא ניתן להירשם
  };

  // פונקציה להזמנת מקום בשיעור
  const handleBooking = async () => {
    if (!employee) {
      toast.error("❗ עליך להתחבר כדי להזמין מקום"); // הודעה אם המשתמש לא מחובר
      return;
    }

    // רענון נתוני המשתמש
    const freshUserData = userData;
    if (!freshUserData) {
      toast.error("❗ לא ניתן לקרוא מידע על המשתמש"); // הודעת שגיאה
      return;
    }

    console.log("🔍 נתוני משתמש טריים לפני בדיקה:", freshUserData); // לוג מידע

    if (isAlreadyBooked) {
      toast("❗ כבר נרשמת לשיעור הזה"); // הודעה אם המשתמש כבר רשום
      return;
    }

    if (isPastClass) {
      toast("❗ לא ניתן להירשם לשיעור שהסתיים"); // הודעה אם השיעור כבר עבר
      return;
    }

    // בדיקה אם המשתמש יכול להירשם לשיעור (על פי סוג המנוי)
    const allowed = await canBookLesson(freshUserData);

    console.log("🔍 הרשאה להזמנה?", allowed); // לוג מידע

    if (!allowed) {
      toast.error("❗ הגעת למגבלת ההזמנות לפי סוג המנוי"); // הודעת שגיאה
      return;
    }

    setLoading(true); // הפעלת אינדיקטור טעינה

    try {
      // בדיקה אם יש מקומות פנויים בשיעור
      const classRef = doc(db, "classes", classInfo.id);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      if (!currentClass || currentClass.spots <= 0) {
        toast.error("❗ אין יותר מקומות פנויים"); // הודעת שגיאה
        setLoading(false); // כיבוי אינדיקטור טעינה
        return;
      }

      // יצירת רשומת הזמנה חדשה
      await addDoc(collection(db, "bookings"), {
        userId: employee.phone, // מזהה המשתמש (טלפון)
        classId: classInfo.id, // מזהה השיעור
        name: classInfo.name, // שם השיעור
        instructor: classInfo.instructor, // שם המדריך
        date: classInfo.date, // תאריך השיעור
        time: classInfo.time, // שעת השיעור
        createdAt: new Date(), // זמן יצירת ההזמנה
      });

      // עדכון מספר המקומות הפנויים בשיעור
      await updateDoc(classRef, {
        spots: currentClass.spots - 1, // הפחתת מקום פנוי
      });

      // אם המשתמש בעל מנוי כרטיסייה, עדכון מספר השיעורים שנותרו
      if (freshUserData.membershipType === "כרטיסייה") {
        const newRemaining = freshUserData.remainingLessons - 1; // חישוב מספר השיעורים החדש
        console.log(
          `📝 כרטיסייה: מעדכן remainingLessons מ-${freshUserData.remainingLessons} ל-${newRemaining}`
        ); // לוג מידע

        // עדכון מספר השיעורים שנותרו במסד הנתונים
        const userRef = doc(db, "Users", employee.phone);
        await updateDoc(userRef, {
          remainingLessons: newRemaining, // עדכון מספר השיעורים שנותרו
        });
      }

      // רענון נתוני המשתמש

      toast.success("✔️ נרשמת בהצלחה!"); // הודעת הצלחה
      if (refreshBookings) await refreshBookings(); // רענון רשימת ההזמנות
    } catch (error) {
      console.error("❌ שגיאה בהרשמה:", error); // לוג שגיאה
      toast.error("❌ שגיאה בהרשמה. נסה שוב"); // הודעת שגיאה
    }

    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // פונקציה להזמנת שיעור עבור משתמש שנבחר
  const bookClassForUser = async (user) => {
    if (!user) {
      toast.error("❗ עליך לבחור משתמש להזמנה"); // הודעה אם לא נבחר משתמש
      return;
    }

    setLoading(true); // הפעלת אינדיקטור טעינה

    try {
      // בדיקה אם יש מקומות פנויים בשיעור
      const classRef = doc(db, "classes", classInfo.id);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      if (!currentClass || currentClass.spots <= 0) {
        toast.error("❗ אין יותר מקומות פנויים"); // הודעת שגיאה
        setLoading(false); // כיבוי אינדיקטור טעינה
        return;
      }

      // יצירת רשומת הזמנה חדשה עבור המשתמש שנבחר
      await addDoc(collection(db, "bookings"), {
        userId: user.phone, // מזהה המשתמש (טלפון)
        classId: classInfo.id, // מזהה השיעור
        name: classInfo.name, // שם השיעור
        instructor: classInfo.instructor, // שם המדריך
        date: classInfo.date, // תאריך השיעור
        time: classInfo.time, // שעת השיעור
        createdAt: new Date(), // זמן יצירת ההזמנה
      });

      // עדכון מספר המקומות הפנויים בשיעור
      await updateDoc(classRef, {
        spots: currentClass.spots - 1, // הפחתת מקום פנוי
      });

      toast.success("✔️ נרשמת בהצלחה!"); // הודעת הצלחה
      setShowUserSelector(false); // סגירת חלון בחירת המשתמש
      if (refreshBookings) await refreshBookings(); // רענון רשימת ההזמנות
    } catch (error) {
      console.error("❌ שגיאה בהרשמה:", error); // לוג שגיאה
      toast.error("❌ שגיאה בהרשמה. נסה שוב"); // הודעת שגיאה
    }

    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // פונקציה לביטול הזמנה
  const handleCancelBooking = async () => {
    const freshUserData = userData;

    if (!employee) return; // יציאה אם אין משתמש מחובר

    // בדיקה אם ניתן לבטל את ההזמנה (יותר מ-5 שעות לפני השיעור)
    if (!canCancelBooking()) {
      toast.error("❗ לא ניתן לבטל הזמנה פחות מ-5 שעות לפני השיעור"); // הודעת שגיאה
      return;
    }

    setLoading(true); // הפעלת אינדיקטור טעינה

    try {
      // מציאת ההזמנה לביטול
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("userId", "==", employee.phone),
        where("classId", "==", classInfo.id)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("❗ לא נמצאה הזמנה לביטול"); // הודעת שגיאה
        setLoading(false); // כיבוי אינדיקטור טעינה
        return;
      }

      // מחיקת ההזמנה
      const bookingDoc = querySnapshot.docs[0];
      await deleteDoc(doc(db, "bookings", bookingDoc.id));

      // החזרת מקום פנוי לשיעור
      const classRef = doc(db, "classes", classInfo.id);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      await updateDoc(classRef, {
        spots: currentClass.spots + 1, // הוספת מקום פנוי
      });

      // אם המשתמש בעל מנוי כרטיסייה, עדכון מספר השיעורים שנותרו
      if (freshUserData.membershipType === "כרטיסייה") {
        const newRemaining = freshUserData.remainingLessons + 1; // חישוב מספר השיעורים החדש
        // עדכון מספר השיעורים שנותרו במסד הנתונים
        const userRef = doc(db, "Users", employee.phone);
        await updateDoc(userRef, {
          remainingLessons: newRemaining, // עדכון מספר השיעורים שנותרו
        });
      }

      toast.success("✔️ ההזמנה בוטלה"); // הודעת הצלחה
      if (refreshBookings) await refreshBookings(); // רענון רשימת ההזמנות
    } catch (error) {
      console.error("❌ שגיאה בביטול ההזמנה:", error); // לוג שגיאה
      toast.error("❌ שגיאה בביטול ההזמנה"); // הודעת שגיאה
    }

    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // ========== רינדור ממשק המשתמש ==========
  return (
    <div className="bg-white p-4 rounded shadow relative mb-4">
      {" "}
      {/* כרטיסיית שיעור */}
      <h2 className="text-lg font-bold mb-2">{classInfo.name}</h2>{" "}
      {/* שם השיעור */}
      <p>מדריך: {classInfo.instructor}</p> {/* שם המדריך */}
      <p>תאריך: {classInfo.date}</p> {/* תאריך השיעור */}
      <p>שעה: {classInfo.time}</p> {/* שעת השיעור */}
      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
        <span>רשומים: {participants.length}</span>
        <div
          data-tooltip-id={`tooltip-${classInfo.id}`}
          data-tooltip-html={
            participants.length > 0
              ? `
        <div dir="rtl">
          <strong>נרשמו ${participants.length} מתאמנים:</strong><br/>
          <ul style="padding-right: 1rem; margin-top: 4px">
            ${participants
              .map((p) => {
                const isMe = p.phone === employee?.phone;
                return `<li>${p.name} ${isMe ? "🎯" : "✅"}</li>`;
              })
              .join("")}
          </ul>
        </div>
        `
              : "עדיין לא נרשמו מתאמנים"
          }
          className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
        >
          <FiUsers size={18} />
        </div>
      </div>
      {/* הצגת הודעת מערכת אם קיימת */}
      {/* הצגת הודעה אם המשתמש לא מחובר */}
      {!employee && (
        <p className="text-red-400 mt-2">🔒 התחברות נדרשת להזמנה</p>
      )}
      {/* כפתור הזמנה (אם המשתמש מחובר, לא רשום כבר, והשיעור לא עבר) */}
      {employee && !isAlreadyBooked && !isPastClass && (
        <>
          <button
            onClick={() => {
              if (isAdminOrInstructor) {
                setShowAdminOptions(true); // פותח חלון בחירה למנהל
              } else {
                handleBooking(); // משתמש רגיל נרשם
              }
            }}
            disabled={classInfo.spots <= 0 || loading}
            className={`mt-3 px-4 py-2 rounded w-full ${
              classInfo.spots > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-white"
            } ${loading ? "opacity-50" : ""}`}
          >
            {loading
              ? "שולח בקשה..."
              : classInfo.spots > 0
              ? "הזמן מקום"
              : "אין מקומות פנויים"}
          </button>

          {/* popup להזמנה עבור משתמש אחר */}
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
      {/* כפתור ביטול (אם המשתמש מחובר ורשום לשיעור) */}
      {employee && isAlreadyBooked && (
        <>
          {canCancelBooking() ? (
            <button
              onClick={handleCancelBooking}
              disabled={loading}
              className="mt-3 px-4 py-2 rounded bg-[#4A4A4A] hover:bg-[#3a3a3a] text-white w-full"
            >
              {loading ? "מבטל..." : "בטל הזמנה"}
            </button>
          ) : (
            <p className="text-red-500 mt-2">
              לא ניתן לבטל (פחות מ-5 שעות לפני השיעור)
            </p>
          )}
        </>
      )}
      {/* הצגת הודעה אם השיעור כבר עבר */}
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
