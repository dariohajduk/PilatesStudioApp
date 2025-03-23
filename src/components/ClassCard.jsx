import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
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

// ==================== קומפוננטת כרטיסיית שיעור ====================
const ClassCard = ({
  classInfo, // מידע על השיעור
  employee, // פרטי המשתמש המחובר
  isAlreadyBooked, // האם המשתמש כבר רשום לשיעור
  refreshBookings, // פונקציה לרענון רשימת ההזמנות
  isPastClass, // האם השיעור כבר עבר
}) => {
  // ========== משתני מצב (State) ==========
  const [message, setMessage] = useState(""); // הודעת מערכת למשתמש
  const [loading, setLoading] = useState(false); // אינדיקטור טעינה
  const [registeredCount, setRegisteredCount] = useState(0); // מספר הנרשמים לשיעור
  const [totalSpots, setTotalSpots] = useState(0); // סך כל המקומות בשיעור
  const [userData, setUserData] = useState(null); // נתוני המשתמש המחובר

  // ========== פונקציות עזר ==========
  // פונקציה לרענון נתוני המשתמש והחזרתם
  const refreshUserDataAndReturn = async () => {
    if (!employee) return null; // אם אין משתמש מחובר, יציאה מהפונקציה
    try {
      // שליפת נתוני המשתמש העדכניים מ-Firestore
      const userRef = doc(db, "Users", employee.phone);
      const userSnap = await getDoc(userRef, { source: "server" });

      if (userSnap.exists()) {
        const user = userSnap.data(); // קבלת נתוני המשתמש
        setUserData(user); // עדכון מצב נתוני המשתמש
        console.log("✅ userData רענון:", user); // לוג נתוני המשתמש
        return user; // החזרת נתוני המשתמש
      } else {
        console.log("❗ המשתמש לא נמצא במסד"); // לוג שגיאה
        return null; // החזרת null אם המשתמש לא נמצא
      }
    } catch (error) {
      console.error("❌ שגיאה ברענון מידע משתמש:", error); // לוג שגיאה
      return null; // החזרת null במקרה של שגיאה
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
    const classDateTime = new Date(`${classInfo.date.split('/').reverse().join('-')}T${classInfo.time}`);
    const now = new Date(); // זמן נוכחי
    const hoursDifference = (classDateTime - now) / (1000 * 60 * 60); // הפרש בשעות
    return hoursDifference >= 5; // אם ההפרש גדול או שווה ל-5 שעות, ניתן לבטל
  };

  // ========== השפעות (Effects) ==========
  // אפקט לטעינת נתוני המשתמש בעת טעינת הקומפוננטה
  useEffect(() => {
    const fetchUser = async () => {
      await refreshUserDataAndReturn(); // טעינת נתוני המשתמש
    };
    fetchUser(); // הפעלת פונקציית הטעינה
  }, [employee]); // ביצוע מחדש כאשר המשתמש משתנה

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
      const { year: currentYear, week: currentWeek } = getWeekNumber(currentClassDate);

      // סינון ההזמנות לשבוע הנוכחי
      const currentWeekBookings = allBookings.filter((b) => {
        if (!b.date) return false;

        const [day, month, year] = b.date.split("/");
        const bookingDate = new Date(`${year}-${month}-${day}`);
        const { year: bookingYear, week: bookingWeek } = getWeekNumber(bookingDate);

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
      setMessage("❗ עליך להתחבר כדי להזמין מקום"); // הודעה אם המשתמש לא מחובר
      return;
    }

    // רענון נתוני המשתמש
    const freshUserData = await refreshUserDataAndReturn();
    if (!freshUserData) {
      setMessage("❗ לא ניתן לקרוא מידע על המשתמש"); // הודעת שגיאה
      return;
    }

    console.log("🔍 נתוני משתמש טריים לפני בדיקה:", freshUserData); // לוג מידע

    if (isAlreadyBooked) {
      setMessage("❗ כבר נרשמת לשיעור הזה"); // הודעה אם המשתמש כבר רשום
      return;
    }

    if (isPastClass) {
      setMessage("❗ לא ניתן להירשם לשיעור שהסתיים"); // הודעה אם השיעור כבר עבר
      return;
    }

    // בדיקה אם המשתמש יכול להירשם לשיעור (על פי סוג המנוי)
    const allowed = await canBookLesson(freshUserData);

    console.log("🔍 הרשאה להזמנה?", allowed); // לוג מידע

    if (!allowed) {
      setMessage("❗ הגעת למגבלת ההזמנות לפי סוג המנוי"); // הודעת שגיאה
      return;
    }

    setLoading(true); // הפעלת אינדיקטור טעינה
    setMessage(""); // איפוס הודעות קודמות

    try {
      // בדיקה אם יש מקומות פנויים בשיעור
      const classRef = doc(db, "classes", classInfo.id);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      if (!currentClass || currentClass.spots <= 0) {
        setMessage("❗ אין יותר מקומות פנויים"); // הודעת שגיאה
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

      await refreshUserDataAndReturn(); // רענון נתוני המשתמש

      setMessage("✔️ נרשמת בהצלחה!"); // הודעת הצלחה
      if (refreshBookings) await refreshBookings(); // רענון רשימת ההזמנות
    } catch (error) {
      console.error("❌ שגיאה בהרשמה:", error); // לוג שגיאה
      setMessage("❌ שגיאה בהרשמה. נסה שוב"); // הודעת שגיאה
    }

    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // פונקציה לביטול הזמנה
  const handleCancelBooking = async () => {
    if (!employee) return; // יציאה אם אין משתמש מחובר

    // בדיקה אם ניתן לבטל את ההזמנה (יותר מ-5 שעות לפני השיעור)
    if (!canCancelBooking()) {
      setMessage("❗ לא ניתן לבטל הזמנה פחות מ-5 שעות לפני השיעור"); // הודעת שגיאה
      return;
    }

    // רענון נתוני המשתמש
    const freshUserData = await refreshUserDataAndReturn();
    if (!freshUserData) {
      setMessage("❗ לא ניתן לקרוא מידע על המשתמש"); // הודעת שגיאה
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
        setMessage("❗ לא נמצאה הזמנה לביטול"); // הודעת שגיאה
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

      await refreshUserDataAndReturn(); // רענון נתוני המשתמש

      setMessage("✔️ ההזמנה בוטלה"); // הודעת הצלחה
      if (refreshBookings) await refreshBookings(); // רענון רשימת ההזמנות
    } catch (error) {
      console.error("❌ שגיאה בביטול ההזמנה:", error); // לוג שגיאה
      setMessage("❌ שגיאה בביטול ההזמנה"); // הודעת שגיאה
    }

    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // ========== רינדור ממשק המשתמש ==========
  return (
    <div className="bg-white p-4 rounded shadow relative mb-4"> {/* כרטיסיית שיעור */}
      <h2 className="text-lg font-bold mb-2">{classInfo.name}</h2> {/* שם השיעור */}
      <p>מדריך: {classInfo.instructor}</p> {/* שם המדריך */}
      <p>תאריך: {classInfo.date}</p> {/* תאריך השיעור */}
      <p>שעה: {classInfo.time}</p> {/* שעת השיעור */}
      <p className="text-sm text-gray-600">
        רשומים: {registeredCount} / {totalSpots} {/* מספר הנרשמים / סך כל המקומות */}
      </p>

      {/* הצגת הודעת מערכת אם קיימת */}
      {message && (
        <p
          className={`mt-2 ${
            message.includes("✔️") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {/* הצגת הודעה אם המשתמש לא מחובר */}
      {!employee && (
        <p className="text-red-400 mt-2">🔒 התחברות נדרשת להזמנה</p>
      )}

      {/* כפתור הזמנה (אם המשתמש מחובר, לא רשום כבר, והשיעור לא עבר) */}
      {employee && !isAlreadyBooked && !isPastClass && (
        <button
          onClick={handleBooking}
          disabled={classInfo.spots <= 0 || loading}
          className={`mt-3 px-4 py-2 rounded transition-all duration-200 w-full ${
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
            <p className="text-red-500 mt-2">לא ניתן לבטל (פחות מ-5 שעות לפני השיעור)</p>
          )}
        </>
      )}

      {/* הצגת הודעה אם השיעור כבר עבר */}
      {isPastClass && (
        <p className="text-gray-500 text-sm mt-2">🕒 השיעור הסתיים</p>
      )}
    </div>
  );
};

export default ClassCard;
