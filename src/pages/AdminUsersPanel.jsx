import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import "../styles/animations.css";

import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  addDoc,
  getDoc // 👈 הוסף את זה
} from "firebase/firestore";
import { Check, Clock, Calendar } from "lucide-react";
import jsPDF from "jspdf";

const resizeImage = (file, maxWidth = 300) => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const resizedBase64 = canvas.toDataURL("image/png", 0.8); // 80% איכות
        resolve(resizedBase64);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
};

const AdminUsersPanel = ({ employee }) => {
  const [users, setUsers] = useState([]);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [remainingLessons, setRemainingLessons] = useState(0);
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // משתנים להגדרת ימים ושעות מועדפים
  const [preferredDays, setPreferredDays] = useState([]);
  const [preferredStartTime, setPreferredStartTime] = useState("");
  const [preferredEndTime, setPreferredEndTime] = useState("");
  const [autoJoin, setAutoJoin] = useState(false);

  // להוסיף עם יתר ה-state hooks
  const [showSignature, setShowSignature] = useState(false);
  const [currentSignature, setCurrentSignature] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [signature, setSignature] = useState("");
  const usersWithSignatures = [];


  // שליפת כל המשתמשים (לא מדריכים ולא מנהלים)
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const usersData = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => !user.isInstructor && !user.isAdmin);

      // הוספת חתימה לדמו לכל משתמש (רק בקליינט, לא בשרת)
      for (const docSnap of querySnapshot.docs) {
        const user = { id: docSnap.id, ...docSnap.data() };
      
        if (!user.isInstructor && !user.isAdmin) {
          // כאן תביא את המידע מהמסמך ב-employees
          const employeeDoc = await getDoc(doc(db, "employees", user.phone));
          if (employeeDoc.exists()) {
            const employeeData = employeeDoc.data();
            if (employeeData.signature) {
              user.signature = employeeData.signature;
              user.signedAt = employeeData.signedAt;
            }
          }
      
          usersWithSignatures.push(user);
        }
      }
      
      setUsers(usersWithSignatures);
    } catch (error) {
      console.error("❌ שגיאה בטעינת המשתמשים:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      // בדיקה כמה משתמשים יש להם חתימה
      const usersWithSignature = users.filter((user) => user.signature);
      console.log(
        `יש ${usersWithSignature.length} משתמשים עם חתימה מתוך ${users.length}`
      );
      console.log("דוגמה למשתמש הראשון:", users[0]);
    }
  }, [users]);

  // הוספה/עדכון של משתמש
  const handleSaveUser = async () => {
    if (!phone || !name || !membershipType) {
      setMessage("נא למלא שם, טלפון וסוג מנוי");
      return;
    }

    // בדיקה שהטווח שעות תקין אם נבחרו שעות
    if (preferredStartTime && preferredEndTime) {
      const start = preferredStartTime.split(":").map(Number);
      const end = preferredEndTime.split(":").map(Number);

      const startMinutes = start[0] * 60 + start[1];
      const endMinutes = end[0] * 60 + end[1];

      if (startMinutes >= endMinutes) {
        setMessage("שעת הסיום חייבת להיות מאוחרת משעת ההתחלה");
        return;
      }
    }

    try {
      const userRef = doc(db, "Users", phone);

      // יצירת אובייקט המשתמש עם הימים והשעות המועדפים
      const userData = {
        id: phone,
        phone,
        name,
        membershipType,
        remainingLessons: parseInt(remainingLessons, 10),
        completedLessons: 0,
        joinDate: new Date().toISOString(),
        isInstructor: false,
        isAdmin: false,
        // הוספת נתוני העדפות
        preferredDays: preferredDays,
        preferredTimeRange:
          preferredStartTime && preferredEndTime
            ? `${preferredStartTime}-${preferredEndTime}`
            : "",
        autoJoin: autoJoin,
        signature: signature || user?.signature, // שמור על חתימה קיימת אם לא הועלתה חדשה
        signedAt: signature ? new Date().toISOString() : user?.signedAt,
      };

      await setDoc(userRef, userData);

      // אם נבחרה האפשרות להצטרפות אוטומטית, נחפש שיעורים מתאימים ונרשום אליהם
      if (autoJoin && preferredDays.length > 0) {
        await registerToMatchingClasses(userData);
      }

      setMessage(
        editingUserId ? "✔️ משתמש עודכן בהצלחה!" : "✔️ משתמש נוסף בהצלחה!"
      );
      clearForm();
      fetchUsers();
    } catch (error) {
      console.error("❌ שגיאה בהוספת/עדכון משתמש:", error);
      setMessage("שגיאה בהוספת/עדכון משתמש");
    }
  };

  // פונקציה לרישום אוטומטי לשיעורים בהתאם לסוג המנוי
  const registerToMatchingClasses = async (user) => {
    try {
      console.log("⚙️ התחלת תהליך רישום אוטומטי למשתמש:", user.name);
      console.log("נתוני משתמש:", {
        שם: user.name,
        טלפון: user.phone,
        סוג_מנוי: user.membershipType,
        ימים: user.preferredDays,
        שעות: user.preferredTimeRange,
        שיעורים_נותרים: user.remainingLessons,
      });

      // בדיקה שונה לפי סוג המנוי
      const isWeeklySubscription = user.membershipType === "שבועי";
      const isMonthlySubscription = user.membershipType === "חודשי";
      const isCardSubscription = user.membershipType === "כרטיסייה";

      // עבור כרטיסייה, בדוק שיש שיעורים נותרים
      if (isCardSubscription && user.remainingLessons <= 0) {
        console.log("❌ אין למשתמש שיעורים נותרים בכרטיסייה");
        setMessage(`למשתמש ${user.name} אין שיעורים נותרים בכרטיסייה`);
        return;
      }

      // שליפת כל השיעורים
      const classesSnapshot = await getDocs(collection(db, "classes"));
      const allClasses = classesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(`📋 נמצאו ${allClasses.length} שיעורים בסך הכל`);

      // שליפת כל ההרשמות הקיימות של המשתמש
      const userBookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", user.phone)
      );
      const userBookingsSnapshot = await getDocs(userBookingsQuery);
      const userBookings = userBookingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(`📋 המשתמש רשום ל-${userBookings.length} שיעורים בסך הכל`);

      // סינון רק שיעורים עתידיים - חשוב מאוד!
      const today = new Date();
      today.setHours(0, 0, 0, 0); // איפוס לתחילת היום

      const futureDateStr = formatDateToIL(today);
      console.log("תאריך היום:", futureDateStr);

      const futureClasses = allClasses.filter((cls) => {
        try {
          // המרה מפורמט DD/MM/YYYY לתאריך להשוואה
          const [day, month, year] = cls.date.split("/").map(Number);
          const classDate = new Date(year, month - 1, day);
          classDate.setHours(0, 0, 0, 0);

          return classDate >= today && cls.spots > 0;
        } catch (error) {
          console.error(`שגיאה בפרסור תאריך של שיעור ${cls.id}:`, error);
          return false;
        }
      });

      console.log(
        `📆 נמצאו ${futureClasses.length} שיעורים עתידיים עם מקומות פנויים`
      );

      // ארגון השיעורים לפי תקופות (שבוע/חודש)
      let classesByWeek = {}; // עבור מנוי שבועי
      let classesByMonth = {}; // עבור מנוי חודשי

      // ארגון ההרשמות הקיימות לפי תקופות
      let bookingsByWeek = {}; // עבור מנוי שבועי
      let bookingsByMonth = {}; // עבור מנוי חודשי

      // במקרה של מנוי שבועי או חודשי, ארגן את השיעורים וההרשמות
      if (isWeeklySubscription || isMonthlySubscription) {
        // ארגון השיעורים העתידיים
        futureClasses.forEach((cls) => {
          const [day, month, year] = cls.date.split("/").map(Number);
          const classDate = new Date(year, month - 1, day);

          if (isWeeklySubscription) {
            // חישוב מספר השבוע בשנה
            const weekNumber = getWeekNumber(classDate);
            const weekKey = `${year}-${weekNumber}`;

            if (!classesByWeek[weekKey]) {
              classesByWeek[weekKey] = [];
            }
            classesByWeek[weekKey].push(cls);
          }

          if (isMonthlySubscription) {
            // המפתח הוא שנה-חודש (לדוגמה "2025-3")
            const monthKey = `${year}-${month}`;

            if (!classesByMonth[monthKey]) {
              classesByMonth[monthKey] = [];
            }
            classesByMonth[monthKey].push(cls);
          }
        });

        // ארגון ההרשמות הקיימות
        userBookings.forEach((booking) => {
          // רק עבור שיעורים עתידיים
          const [day, month, year] = booking.date.split("/").map(Number);
          const bookingDate = new Date(year, month - 1, day);

          if (bookingDate < today) {
            return; // דלג על שיעורים שכבר עברו
          }

          if (isWeeklySubscription) {
            const weekNumber = getWeekNumber(bookingDate);
            const weekKey = `${year}-${weekNumber}`;

            if (!bookingsByWeek[weekKey]) {
              bookingsByWeek[weekKey] = [];
            }
            bookingsByWeek[weekKey].push(booking);
          }

          if (isMonthlySubscription) {
            const monthKey = `${year}-${month}`;

            if (!bookingsByMonth[monthKey]) {
              bookingsByMonth[monthKey] = [];
            }
            bookingsByMonth[monthKey].push(booking);
          }
        });

        if (isWeeklySubscription) {
          console.log(
            `📊 שיעורים עתידיים מחולקים ל-${
              Object.keys(classesByWeek).length
            } שבועות`
          );
          console.log(`📊 הרשמות קיימות לפי שבוע:`, bookingsByWeek);
        }

        if (isMonthlySubscription) {
          console.log(
            `📊 שיעורים עתידיים מחולקים ל-${
              Object.keys(classesByMonth).length
            } חודשים`
          );
          console.log(`📊 הרשמות קיימות לפי חודש:`, bookingsByMonth);
        }
      }

      // מספר ההרשמות שבוצעו
      let registrationCount = 0;
      let weeklyRegistrations = {}; // לספירת הרשמות חדשות לפי שבוע
      let monthlyRegistrations = {}; // לספירת הרשמות חדשות לפי חודש

      // עיבוד רק אם יש גם ימים וגם טווח שעות
      if (
        user.preferredDays &&
        user.preferredDays.length > 0 &&
        user.preferredTimeRange
      ) {
        const [startTime, endTime] = user.preferredTimeRange.split("-");

        // נתוני טווח שעות בדקות מתחילת היום
        const startParts = startTime.split(":").map(Number);
        const endParts = endTime.split(":").map(Number);
        const startMinutes = startParts[0] * 60 + startParts[1];
        const endMinutes = endParts[0] * 60 + endParts[1];

        console.log(`⏰ טווח שעות מועדף: ${startTime}-${endTime}`);

        // מעבר על כל השיעורים
        for (const cls of futureClasses) {
          try {
            // המרת פורמט תאריך מ-DD/MM/YYYY לאובייקט Date
            const [day, month, year] = cls.date.split("/").map(Number);
            const classDate = new Date(year, month - 1, day);

            // חישוב מפתחות תקופתיים
            const weekNumber = getWeekNumber(classDate);
            const weekKey = `${year}-${weekNumber}`;
            const monthKey = `${year}-${month}`;

            // בדיקת מגבלות לפי סוג המנוי
            if (isWeeklySubscription) {
              // מספר ההרשמות הקיימות + החדשות בשבוע זה
              const existingWeeklyBookings = (bookingsByWeek[weekKey] || [])
                .length;
              const newWeeklyBookings = weeklyRegistrations[weekKey] || 0;
              const totalWeeklyBookings =
                existingWeeklyBookings + newWeeklyBookings;

              // אם כבר הגענו למספר המקסימלי של שיעורים בשבוע זה, דלג
              if (totalWeeklyBookings >= user.remainingLessons) {
                console.log(
                  `⚠️ הגענו למקסימום שיעורים בשבוע ${weekKey}: ${totalWeeklyBookings}/${user.remainingLessons}`
                );
                continue;
              }
            }

            if (isMonthlySubscription) {
              // מספר ההרשמות הקיימות + החדשות בחודש זה
              const existingMonthlyBookings = (bookingsByMonth[monthKey] || [])
                .length;
              const newMonthlyBookings = monthlyRegistrations[monthKey] || 0;
              const totalMonthlyBookings =
                existingMonthlyBookings + newMonthlyBookings;

              // אם כבר הגענו למספר המקסימלי של שיעורים בחודש זה, דלג
              if (totalMonthlyBookings >= user.remainingLessons) {
                console.log(
                  `⚠️ הגענו למקסימום שיעורים בחודש ${monthKey}: ${totalMonthlyBookings}/${user.remainingLessons}`
                );
                continue;
              }
            }

            if (
              isCardSubscription &&
              registrationCount >= user.remainingLessons
            ) {
              console.log(
                `⚠️ הגענו למקסימום שיעורים בכרטיסייה: ${registrationCount}/${user.remainingLessons}`
              );
              break; // לא ממשיכים לבדוק שיעורים נוספים
            }

            // מציאת היום בשבוע (0-6, כאשר 0 מייצג יום ראשון)
            const dayOfWeek = classDate.getDay();

            console.log(
              `בדיקת שיעור: ${cls.name}, תאריך: ${cls.date}, יום: ${dayOfWeek}, שעה: ${cls.time}`
            );

            // בדיקה האם היום בשבוע מתאים להעדפות המשתמש
            if (user.preferredDays.includes(dayOfWeek)) {
              console.log(`✓ יום מתאים: ${dayOfWeek}`);

              // בדיקה האם השעה מתאימה להעדפות המשתמש
              const [classHours, classMinutes] = cls.time
                .split(":")
                .map(Number);
              const classTimeInMinutes = classHours * 60 + classMinutes;

              // בדיקה האם השעה בטווח המבוקש
              if (
                classTimeInMinutes >= startMinutes &&
                classTimeInMinutes <= endMinutes
              ) {
                console.log(`✓ שעה מתאימה: ${cls.time}`);

                // בדיקה שהמשתמש לא כבר רשום לשיעור זה
                const bookingsQuery = query(
                  collection(db, "bookings"),
                  where("userId", "==", user.phone),
                  where("classId", "==", cls.id)
                );
                const existingBookings = await getDocs(bookingsQuery);

                if (existingBookings.empty) {
                  console.log(`✓ המשתמש לא רשום לשיעור זה`);

                  // הוספת הזמנה חדשה
                  await addDoc(collection(db, "bookings"), {
                    classId: cls.id,
                    userId: user.phone,
                    className: cls.name,
                    date: cls.date,
                    time: cls.time,
                    bookedBy: "אוטומטית",
                    bookedAt: new Date().toISOString(),
                    autoBooked: true,
                  });

                  console.log(
                    `✅ נרשם לשיעור: ${cls.name}, ${cls.date}, ${cls.time}`
                  );

                  // עדכון מספר המקומות הפנויים בשיעור
                  await setDoc(doc(db, "classes", cls.id), {
                    ...cls,
                    spots: cls.spots - 1,
                  });

                  // עדכון ספירת ההרשמות
                  registrationCount++;

                  // עדכון ספירת הרשמות לפי תקופה
                  if (isWeeklySubscription) {
                    weeklyRegistrations[weekKey] =
                      (weeklyRegistrations[weekKey] || 0) + 1;
                    console.log(
                      `📊 הרשמות בשבוע ${weekKey}: ${weeklyRegistrations[weekKey]} מתוך ${user.remainingLessons}`
                    );
                  }

                  if (isMonthlySubscription) {
                    monthlyRegistrations[monthKey] =
                      (monthlyRegistrations[monthKey] || 0) + 1;
                    console.log(
                      `📊 הרשמות בחודש ${monthKey}: ${monthlyRegistrations[monthKey]} מתוך ${user.remainingLessons}`
                    );
                  }

                  // הגבלת מספר ההרשמות האוטומטיות הכולל
                  // (גם למנויים תקופתיים, כדי למנוע הרשמה למספר גדול מדי של שיעורים)
                  const maxTotalRegistrations = 15; // מגבלה של 15 שיעורים בסך הכל
                  if (registrationCount >= maxTotalRegistrations) {
                    console.log(
                      `🛑 הגענו למקסימום רישומים אוטומטיים כללי: ${registrationCount}`
                    );
                    break;
                  }
                } else {
                  console.log(`❌ המשתמש כבר רשום לשיעור זה`);
                }
              } else {
                console.log(`❌ שעה לא מתאימה: ${cls.time}`);
              }
            } else {
              console.log(`❌ יום לא מתאים: ${dayOfWeek}`);
            }
          } catch (error) {
            console.error(`שגיאה בעיבוד שיעור ${cls.id}:`, error);
          }
        }

        if (registrationCount > 0) {
          // עדכון מספר השיעורים הנותרים למשתמש (רק עבור כרטיסייה)
          if (isCardSubscription) {
            await setDoc(doc(db, "Users", user.phone), {
              ...user,
              remainingLessons: user.remainingLessons - registrationCount,
            });

            setMessage(
              `✅ המשתמש נרשם אוטומטית ל-${registrationCount} שיעורים ונותרו לו ${
                user.remainingLessons - registrationCount
              } שיעורים בכרטיסייה`
            );
          } else if (isWeeklySubscription) {
            setMessage(
              `✅ המשתמש נרשם אוטומטית ל-${registrationCount} שיעורים (מנוי שבועי - מוגבל ל-${user.remainingLessons} שיעורים בשבוע)`
            );
          } else if (isMonthlySubscription) {
            setMessage(
              `✅ המשתמש נרשם אוטומטית ל-${registrationCount} שיעורים (מנוי חודשי - מוגבל ל-${user.remainingLessons} שיעורים בחודש)`
            );
          }

          console.log(`🎉 סה"כ נרשם ל-${registrationCount} שיעורים`);
        } else {
          console.log(`⚠️ לא נמצאו שיעורים מתאימים לרישום אוטומטי`);
          setMessage(`לא נמצאו שיעורים מתאימים להרשמה אוטומטית`);
        }
      } else {
        console.log(
          `❌ חסרים פרטי העדפות: ימים=${
            user.preferredDays?.length || 0
          }, טווח שעות=${user.preferredTimeRange || "חסר"}`
        );
        setMessage(`חסרים פרטי העדפות (ימים ושעות)`);
      }
    } catch (error) {
      console.error("❌ שגיאה ברישום אוטומטי לשיעורים:", error);
      setMessage(`שגיאה ברישום האוטומטי: ${error.message}`);
    }
  };

  // פונקציה לחישוב מספר השבוע בשנה
  const getWeekNumber = (date) => {
    // יצירת עותק של התאריך כדי לא לשנות את המקורי
    const d = new Date(date);
    // תחילת השנה (1 בינואר של אותה שנה)
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    // מספר הימים שעברו מתחילת השנה
    const days = Math.floor((d - startOfYear) / (24 * 60 * 60 * 1000));
    // מספר השבוע (מחושב לפי 7 ימים בשבוע)
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  };

  // פונקציית עזר להמרת תאריך לפורמט ישראלי (DD/MM/YYYY)
  const formatDateToIL = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ניקוי טופס
  const clearForm = () => {
    setPhone("");
    setName("");
    setMembershipType("");
    setRemainingLessons(0);
    setEditingUserId(null);
    setPreferredDays([]);
    setPreferredStartTime("");
    setPreferredEndTime("");
    setAutoJoin(false);
    setSignature("");
  };

  // עריכת משתמש קיים
  const handleEditUser = (user) => {
    setPhone(user.phone);
    setName(user.name);
    setMembershipType(user.membershipType);
    setRemainingLessons(user.remainingLessons);
    setEditingUserId(user.id);

    // טיפול בהעדפות ימים ושעות
    setPreferredDays(user.preferredDays || []);

    if (user.preferredTimeRange) {
      const [start, end] = user.preferredTimeRange.split("-");
      setPreferredStartTime(start || "");
      setPreferredEndTime(end || "");
    } else {
      setPreferredStartTime("");
      setPreferredEndTime("");
    }

    setAutoJoin(user.autoJoin || false);
    setSignature(user.signature || "");
  };

  // מחיקת משתמש
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?")) return;

    try {
      await deleteDoc(doc(db, "Users", userId));
      setMessage("🗑️ משתמש נמחק");
      fetchUsers();
    } catch (error) {
      console.error("❌ שגיאה במחיקת משתמש:", error);
      setMessage("שגיאה במחיקה");
    }
  };

  // טיפול בבחירת יום בשבוע
  const handleDayToggle = (dayIndex) => {
    if (preferredDays.includes(dayIndex)) {
      setPreferredDays(preferredDays.filter((day) => day !== dayIndex));
    } else {
      setPreferredDays([...preferredDays, dayIndex]);
    }
  };

  // גישה למנהלים בלבד - הפונקציה המתוקנת
  const checkAdmin = () => {
    // לוג לדיבוג
    console.log("⚠️ פרטי המשתמש ב-checkAdmin:", employee || "לא נטען");

    // פתרון זמני - תמיד מאפשר גישה
    return true; // מעקף זמני - תמיד מחזיר true

    // הקוד הבא לא ירוץ בגלל ה-return למעלה, אבל נשאיר אותו לשימוש עתידי
    if (!employee) {
      console.warn("אובייקט employee הוא undefined");
      return false;
    }

    const isUserAdmin =
      employee.isAdmin === true ||
      employee.role === "מנהל" ||
      employee.role === "admin";

    console.log(
      "האם מנהל:",
      isUserAdmin,
      "isAdmin:",
      employee.isAdmin,
      "role:",
      employee.role
    );

    return isUserAdmin;
  };

  // אם המשתמש אינו מנהל, תציג הודעת גישה מוגבלת
  if (!checkAdmin()) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלים.</p>

        {/* כפתור דיבוג - הסר בסביבת ייצור */}
        <button
          onClick={() => {
            console.log("פרטי משתמש:", employee);
            alert("בדוק את הקונסול לפרטי המשתמש");
          }}
          className="mt-4 bg-gray-200 text-black px-4 py-2 rounded"
        >
          הצג פרטי משתמש לדיבוג
        </button>
      </div>
    );
  }

  // פונקציה להצגת החתימה במודל - עם טיפול בשגיאות משופר
  const handleShowSignature = (user) => {
    console.log("הצגת חתימה עבור משתמש:", user?.name);

    if (!user) {
      console.error("שגיאה: אובייקט המשתמש הוא undefined");
      return;
    }

    if (!user.signature) {
      console.error("שגיאה: אין חתימה למשתמש זה");
      alert("אין חתימה זמינה למשתמש זה");
      return;
    }

    // סדר קריטי לעדכון סטייט
    setCurrentUser(user);
    setCurrentSignature(user.signature);
    setShowSignature(true);
    console.log("✅ user object:", user);
    console.log("✅ signature:", user?.signature?.substring(0, 30));
  };

  // פונקציה ליצירת PDF עם פרטי המשתמש והחתימה
  const handleCreatePDF = (user) => {
    if (!user.signature) return;

    try {
      const doc = new jsPDF();
      const imgWidth = 150;
      const imgHeight = 80;
      const margin = 20;

      // כותרת
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("הצהרת בריאות", margin, margin);

      // פרטי משתמש
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`שם: ${user.name}`, margin, margin + 10);
      doc.text(`טלפון: ${user.phone}`, margin, margin + 20);

      // תאריך חתימה
      if (user.signedAt) {
        const signDate = new Date(user.signedAt);
        const formattedDate = signDate.toLocaleDateString("he-IL");
        doc.text(`תאריך חתימה: ${formattedDate}`, margin, margin + 30);
      }

      // כותרת משנה
      doc.setFont("helvetica", "bold");
      doc.text("חתימה:", margin, margin + 45);

      // החתימה עצמה
      if (user.signature && user.signature.startsWith("data:")) {
        doc.addImage(
          user.signature,
          "PNG",
          margin,
          margin + 50,
          imgWidth,
          imgHeight
        );
      }

      // שמירת הקובץ
      doc.save(`health-declaration-${user.phone}.pdf`);

      console.log("נוצר PDF בהצלחה");
    } catch (error) {
      console.error("שגיאה ביצירת PDF:", error);
    }
  };

  // פונקציה לסגירת המודל - מעודכנת
  const handleCloseSignature = () => {
    console.log("סגירת מודל החתימה");
    setShowSignature(false);
    // השהייה קצרה לפני איפוס שאר הנתונים
    setTimeout(() => {
      setCurrentSignature(null);
      setCurrentUser(null);
    }, 100);
  };

  // Add this useEffect to monitor currentUser changes
  useEffect(() => {
    if (currentUser) {
      console.log("currentUser עודכן:", currentUser.name);
      console.log("חתימה זמינה:", !!currentUser.signature);
    }
  }, [currentUser]);

  // סינון חיפוש
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  // שמות ימי השבוע בעברית
  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

  return (
    <div className="p-6 pt-0 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        ניהול משתמשים (לקוחות)
      </h1>

      {/* טופס הוספה/עריכה */}
      <div className="mb-8 bg-white shadow-md rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4">
          {editingUserId ? "עריכת משתמש" : "הוספת משתמש חדש"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="tel"
            placeholder="מספר טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full p-3 border rounded-lg text-black"
          />

          <input
            type="text"
            placeholder="שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-3 border rounded-lg text-black"
          />

          <select
            value={membershipType}
            onChange={(e) => {
              setMembershipType(e.target.value);

              if (e.target.value === "כרטיסייה") setRemainingLessons(10);
              if (e.target.value === "שבועי") setRemainingLessons(3);
              if (e.target.value === "חודשי") setRemainingLessons(12);
            }}
            className="block w-full p-3 border rounded-lg text-black"
          >
            <option value="">בחר סוג מנוי</option>
            <option value="חודשי">חודשי</option>
            <option value="שבועי">שבועי</option>
            <option value="כרטיסייה">כרטיסייה</option>
          </select>

          <input
            type="number"
            placeholder="כמות שיעורים זמינים"
            value={remainingLessons}
            onChange={(e) => setRemainingLessons(e.target.value)}
            className="block w-full p-3 border rounded-lg text-black"
          />
        </div>

        {/* חלק ההגדרות המועדפות */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-md font-medium mb-3 flex items-center">
            <Calendar size={18} className="mr-2" />
            הגדרת זמני אימון מועדפים
          </h3>

          <div className="space-y-4">
            {/* בחירת ימים מועדפים */}
            <div>
              <p className="text-sm text-gray-600 mb-2">ימים מועדפים:</p>
              <div className="flex flex-wrap gap-2">
                {dayNames.map((day, index) => (
                  <label
                    key={index}
                    className={`flex items-center px-3 py-2 rounded-lg border cursor-pointer transition-colors
                      ${
                        preferredDays.includes(index)
                          ? "bg-blue-100 border-blue-300 text-blue-800"
                          : "bg-gray-50 border-gray-200 text-gray-700"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={preferredDays.includes(index)}
                      onChange={() => handleDayToggle(index)}
                      className="hidden"
                    />
                    {preferredDays.includes(index) && (
                      <Check size={14} className="mr-1" />
                    )}
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* בחירת טווח שעות */}
            <div>
              <p className="text-sm text-gray-600 mb-2 flex items-center">
                <Clock size={16} className="mr-1" />
                טווח שעות מועדף:
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 block mb-1">
                    משעה:
                  </label>
                  <input
                    type="time"
                    value={preferredStartTime}
                    onChange={(e) => setPreferredStartTime(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div className="text-gray-400">-</div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 block mb-1">
                    עד שעה:
                  </label>
                  <input
                    type="time"
                    value={preferredEndTime}
                    onChange={(e) => setPreferredEndTime(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>
            </div>

            {/* הצטרפות אוטומטית */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoJoin"
                checked={autoJoin}
                onChange={(e) => setAutoJoin(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="autoJoin" className="mr-2 text-sm text-gray-700">
                רישום אוטומטי לשיעורים מתאימים (מיידי ובעתיד)
              </label>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">הוסף חתימה (תמונה):</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    resizeImage(file).then((resized) => {
                      setSignature(resized);
                    });
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />

              {signature && (
                <div className="mt-2 p-2 border rounded">
                  <p className="text-xs text-gray-500 mb-1">תצוגה מקדימה:</p>
                  <img
 src="data:image/png;base64,..."
                     alt="חתימה"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      border: "1px solid #ccc",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleSaveUser}
          className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {editingUserId ? "עדכן משתמש" : "הוסף משתמש"}
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>

      {/* שדה חיפוש */}
      <input
        type="text"
        placeholder="חפש לפי שם או טלפון"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full p-3 mb-6 border rounded-lg text-black"
      />

      {/* רשימת משתמשים */}
      <div>
        <h2 className="text-lg font-semibold mb-4">רשימת משתמשים</h2>

        <div className="grid gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row md:justify-between items-center hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col text-right">
                <h3 className="text-lg font-bold text-blue-700">{user.name}</h3>
                <p className="text-sm text-gray-600">טלפון: {user.phone}</p>
                <p className="text-sm text-gray-600">
                  מנוי:{" "}
                  <span className="font-semibold">{user.membershipType}</span> |
                  שיעורים: {user.remainingLessons}
                </p>

                {user.preferredDays && user.preferredDays.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="font-medium">ימים מועדפים:</span>{" "}
                    {user.preferredDays.map((day) => dayNames[day]).join(", ")}
                    {user.preferredTimeRange &&
                      ` | שעות: ${user.preferredTimeRange}`}
                    {user.autoJoin && (
                      <span className="text-green-600 mr-1">
                        {" "}
                        • רישום אוטומטי
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow text-sm transition-transform transform hover:scale-105"
                >
                  ערוך
                </button>

                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow text-sm transition-transform transform hover:scale-105"
                >
                  מחק
                </button>

                {user.signature && (
                  <>
                    <button
                      onClick={() => handleShowSignature(user)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow text-sm transition-transform transform hover:scale-105"
                    >
                      הצג חתימה
                    </button>
                    <button
                      onClick={() => handleCreatePDF(user)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow text-sm transition-transform transform hover:scale-105"
                    >
                      צור PDF
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* מודל להצגת החתימה - עודכן עם z-index גבוה יותר */}
      {showSignature && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h2 className="text-xl font-bold text-center mb-4">
              חתימה של {currentUser.name}
            </h2>
            <img
              src={currentSignature}
              alt="חתימה"
              className="mx-auto max-h-60 border p-2"
              onError={() =>
                console.error("❌ בעיה בטעינת התמונה - בדוק את base64")
              }
            />

            <div className="mt-4 text-center">
              <button
                onClick={handleCloseSignature}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPanel;
