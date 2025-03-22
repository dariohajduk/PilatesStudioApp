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

const ClassCard = ({
  classInfo,
  employee,
  isAlreadyBooked,
  refreshBookings,
  isPastClass,
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [totalSpots, setTotalSpots] = useState(0);
  const [userData, setUserData] = useState(null);

  const refreshUserDataAndReturn = async () => {
    if (!employee) return null;
    try {
      const userRef = doc(db, "Users", employee.phone);
      const userSnap = await getDoc(userRef, { source: "server" });

      if (userSnap.exists()) {
        const user = userSnap.data();
        setUserData(user);
        console.log("✅ userData רענון:", user);
        return user;
      } else {
        console.log("❗ המשתמש לא נמצא במסד");
        return null;
      }
    } catch (error) {
      console.error("❌ שגיאה ברענון מידע משתמש:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      await refreshUserDataAndReturn();
    };
    fetchUser();
  }, [employee]);

  useEffect(() => {
    const calcRegistered = async () => {
      try {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("classId", "==", classInfo.id));
        const querySnapshot = await getDocs(q);

        const registered = querySnapshot.docs.length;

        setRegisteredCount(registered);
        setTotalSpots(classInfo.spots + registered);
      } catch (error) {
        console.error("❌ שגיאה בחישוב רשומים:", error);
      }
    };
    calcRegistered();
  }, [classInfo]);

  const getWeekNumber = (dateObj) => {
    const tempDate = new Date(dateObj.getTime());
    tempDate.setHours(0, 0, 0, 0);

    // Set to nearest Thursday (current date + 4 - current day number)
    tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getDay() || 7));

    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    const weekNo = Math.ceil(
      ((tempDate - yearStart) / 86400000 + 1) / 7
    );
    return { year: tempDate.getFullYear(), week: weekNo };
  };

  const canBookLesson = async (user) => {
    if (!user) {
      console.log("❗ אין userData");
      return false;
    }

    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("userId", "==", employee.phone));
    const querySnapshot = await getDocs(q);
    const allBookings = querySnapshot.docs.map((doc) => doc.data());

    const membershipType = user.membershipType;
    const maxLessons = user.remainingLessons;

    console.log(`🔎 סוג מנוי: ${membershipType}, כמות מקסימלית: ${maxLessons}`);

    if (membershipType === "שבועי") {
      const today = new Date();
      const currentClassDateParts = classInfo.date.split("/");
      const currentClassDate = new Date(
        `${currentClassDateParts[2]}-${currentClassDateParts[1]}-${currentClassDateParts[0]}`
      );

      const { year: currentYear, week: currentWeek } = getWeekNumber(currentClassDate);

      const currentWeekBookings = allBookings.filter((b) => {
        if (!b.date) return false;

        const [day, month, year] = b.date.split("/");
        const bookingDate = new Date(`${year}-${month}-${day}`);
        const { year: bookingYear, week: bookingWeek } = getWeekNumber(bookingDate);

        return bookingYear === currentYear && bookingWeek === currentWeek;
      });

      console.log("✅ מספר הרשמות לשבוע זה:", currentWeekBookings.length);

      return currentWeekBookings.length < maxLessons;
    }

    if (membershipType === "חודשי") {
      const today = new Date();
      const currentClassDateParts = classInfo.date.split("/");
      const currentClassDate = new Date(
        `${currentClassDateParts[2]}-${currentClassDateParts[1]}-${currentClassDateParts[0]}`
      );

      const currentMonth = currentClassDate.getMonth();
      const currentYear = currentClassDate.getFullYear();

      const currentMonthBookings = allBookings.filter((b) => {
        if (!b.date) return false;

        const [day, month, year] = b.date.split("/");
        const bookingDate = new Date(`${year}-${month}-${day}`);

        return (
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear
        );
      });

      console.log("✅ מספר הרשמות לחודש זה:", currentMonthBookings.length);

      return currentMonthBookings.length < maxLessons;
    }

    if (membershipType === "כרטיסייה") {
      console.log("✅ כרטיסייה - שיעורים שנותרו:", user.remainingLessons);
      return user.remainingLessons > 0;
    }

    console.log("❗ סוג מנוי לא מזוהה");
    return false;
  };

  const handleBooking = async () => {
    if (!employee) {
      setMessage("❗ עליך להתחבר כדי להזמין מקום");
      return;
    }

    const freshUserData = await refreshUserDataAndReturn();
    if (!freshUserData) {
      setMessage("❗ לא ניתן לקרוא מידע על המשתמש");
      return;
    }

    console.log("🔍 נתוני משתמש טריים לפני בדיקה:", freshUserData);

    if (isAlreadyBooked) {
      setMessage("❗ כבר נרשמת לשיעור הזה");
      return;
    }

    if (isPastClass) {
      setMessage("❗ לא ניתן להירשם לשיעור שהסתיים");
      return;
    }

    const allowed = await canBookLesson(freshUserData);

    console.log("🔍 הרשאה להזמנה?", allowed);

    if (!allowed) {
      setMessage("❗ הגעת למגבלת ההזמנות לפי סוג המנוי");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const classRef = doc(db, "classes", classInfo.id);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      if (!currentClass || currentClass.spots <= 0) {
        setMessage("❗ אין יותר מקומות פנויים");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "bookings"), {
        userId: employee.phone,
        classId: classInfo.id,
        name: classInfo.name,
        instructor: classInfo.instructor,
        date: classInfo.date,
        time: classInfo.time,
        createdAt: new Date(),
      });

      await updateDoc(classRef, {
        spots: currentClass.spots - 1,
      });

      if (freshUserData.membershipType === "כרטיסייה") {
        const newRemaining = freshUserData.remainingLessons - 1;
        console.log(
          `📝 כרטיסייה: מעדכן remainingLessons מ-${freshUserData.remainingLessons} ל-${newRemaining}`
        );

        const userRef = doc(db, "Users", employee.phone);
        await updateDoc(userRef, {
          remainingLessons: newRemaining,
        });
      }

      await refreshUserDataAndReturn();

      setMessage("✔️ נרשמת בהצלחה!");
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error("❌ שגיאה בהרשמה:", error);
      setMessage("❌ שגיאה בהרשמה. נסה שוב");
    }

    setLoading(false);
  };

  const handleCancelBooking = async () => {
    if (!employee) return;

    const freshUserData = await refreshUserDataAndReturn();
    if (!freshUserData) {
      setMessage("❗ לא ניתן לקרוא מידע על המשתמש");
      return;
    }

    setLoading(true);

    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("userId", "==", employee.phone),
        where("classId", "==", classInfo.id)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage("❗ לא נמצאה הזמנה לביטול");
        setLoading(false);
        return;
      }

      const bookingDoc = querySnapshot.docs[0];
      await deleteDoc(doc(db, "bookings", bookingDoc.id));

      const classRef = doc(db, "classes", classInfo.id);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      await updateDoc(classRef, {
        spots: currentClass.spots + 1,
      });

      if (freshUserData.membershipType === "כרטיסייה") {
        const newRemaining = freshUserData.remainingLessons + 1;
        const userRef = doc(db, "Users", employee.phone);
        await updateDoc(userRef, {
          remainingLessons: newRemaining,
        });
      }

      await refreshUserDataAndReturn();

      setMessage("✔️ ההזמנה בוטלה");
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error("❌ שגיאה בביטול ההזמנה:", error);
      setMessage("❌ שגיאה בביטול ההזמנה");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow relative mb-4">
      <h2 className="text-lg font-bold mb-2">{classInfo.name}</h2>
      <p>מדריך: {classInfo.instructor}</p>
      <p>תאריך: {classInfo.date}</p>
      <p>שעה: {classInfo.time}</p>
      <p className="text-sm text-gray-600">
        רשומים: {registeredCount} / {totalSpots}
      </p>

      {message && (
        <p
          className={`mt-2 ${
            message.includes("✔️") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      {!employee && (
        <p className="text-red-400 mt-2">🔒 התחברות נדרשת להזמנה</p>
      )}

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

      {employee && isAlreadyBooked && (
        <button
          onClick={handleCancelBooking}
          disabled={loading}
          className="mt-3 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white w-full"
        >
          {loading ? "מבטל..." : "בטל הזמנה"}
        </button>
      )}

      {isPastClass && (
        <p className="text-gray-500 text-sm mt-2">🕒 השיעור הסתיים</p>
      )}
    </div>
  );
};

export default ClassCard;
