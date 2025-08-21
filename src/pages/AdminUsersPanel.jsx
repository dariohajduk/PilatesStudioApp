import React, { useEffect, useMemo, useRef, useState } from "react";
import { db } from "../services/firebase";
import "../styles/animations.css";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  addDoc,
  getDoc,
  deleteField,
  orderBy,
  limit as fbLimit,
  startAfter,
} from "firebase/firestore";
import { Calendar, ChevronDown, ChevronUp, RefreshCw, Upload, Plus, ArrowLeft } from "lucide-react";
import jsPDF from "jspdf";

/** הקטנת תמונת חתימה לפני שמירה */
const resizeImage = (file, maxWidth = 300) =>
  new Promise((resolve) => {
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
        const resizedBase64 = canvas.toDataURL("image/png", 0.8);
        resolve(resizedBase64);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

/** דיבאונס לערך (לשיפור ביצועים בחיפוש) */
const useDebouncedValue = (value, ms = 300) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
};

/** שלד טעינה */
const SkeletonCard = () => (
  <div className="animate-pulse bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
    <div className="h-3 bg-gray-100 rounded w-2/3 mb-2" />
    <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
    <div className="flex gap-2 justify-end">
      <div className="h-8 w-16 bg-gray-200 rounded" />
      <div className="h-8 w-16 bg-gray-200 rounded" />
    </div>
  </div>
);

const AdminUsersPanel = ({ employee }) => {
  const navigate = useNavigate();

  // UI
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);

  // נתוני משתמשים
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);

  // פאג'ינציה
  const PAGE_SIZE = 40;
  const lastDocRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [serverSearchActive, setServerSearchActive] = useState(false);

  // טופס
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [remainingLessons, setRemainingLessons] = useState(0);
  const [weeklyLimit, setWeeklyLimit] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  // העדפות
  const [preferredDays, setPreferredDays] = useState([]);
  const [preferredStartTime, setPreferredStartTime] = useState("");
  const [preferredEndTime, setPreferredEndTime] = useState("");
  const [autoJoin, setAutoJoin] = useState(false);

  // חתימה
  const [showSignature, setShowSignature] = useState(false);
  const [currentSignature, setCurrentSignature] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [signature, setSignature] = useState("");

  // שמירה: עוזר ל־QA — ולידציה בסיסית
  const assertValidUser = (u) => {
    console.assert(!!u.phone && !!u.name, "User must have phone + name");
    if (u.membershipType === "שבועי" || u.membershipType === "חודשי") {
      console.assert(
        typeof u.weeklyLimit === "string" || typeof u.weeklyLimit === "number",
        "weeklyLimit must exist (string/number) for weekly/monthly"
      );
    }
  };

  /** טעינת עמוד ראשון */
  const fetchFirstPage = async () => {
    setLoading(true);
    setServerSearchActive(false);
    try {
      // נטען רק לקוחות (ננסה לסנן בשרת אם יש שדות; אם חסר, נסנן בצד לקוח)
      const baseQ = query(
        collection(db, "Users"),
        orderBy("name"), // אם אין name בדוק ע"פ phone: החלף ל-orderBy("phone")
        fbLimit(PAGE_SIZE)
      );
      const snap = await getDocs(baseQ);

      let list = [];
      snap.forEach((docSnap) => {
        const user = { id: docSnap.id, ...docSnap.data() };
        // סינון לקוחות בלבד בצד לקוח (למקרה וחסרים שדות בדאטה):
        if (user.isInstructor || user.isAdmin) return;

        list.push({
          autoJoin: !!user.autoJoin,
          completedLessons: user.completedLessons ?? 0,
          id: user.id ?? user.phone,
          isAdmin: !!user.isAdmin,
          isInstructor: !!user.isInstructor,
          joinDate: user.joinDate ?? new Date().toISOString(),
          membershipType: user.membershipType ?? "",
          name: user.name ?? "",
          nameLower: user.nameLower ?? (user.name ? user.name.toLowerCase() : ""),
          phone: user.phone ?? "",
          preferredDays: user.preferredDays ?? [],
          preferredTimeRange: user.preferredTimeRange ?? "",
          remainingLessons: user.remainingLessons ?? 0,
          signature: user.signature ?? "",
          signedAt: user.signedAt ?? null,
          weeklyLimit:
            user.weeklyLimit != null
              ? String(user.weeklyLimit)
              : String(user.remainingLessons ?? 0),
        });
      });

      setUsers(list);
      lastDocRef.current = snap.docs[snap.docs.length - 1] || null;
      setHasMore(!!lastDocRef.current);
      setUpdatedAt(new Date());
    } catch (e) {
      console.error("❌ fetchFirstPage:", e);
      setMessage("שגיאה בטעינת משתמשים");
    } finally {
      setLoading(false);
    }
  };

  /** טעינת עוד עמוד */
  const fetchNextPage = async () => {
    if (!hasMore || !lastDocRef.current || serverSearchActive) return;
    setLoadingMore(true);
    try {
      const q2 = query(
        collection(db, "Users"),
        orderBy("name"),
        startAfter(lastDocRef.current),
        fbLimit(PAGE_SIZE)
      );
      const snap = await getDocs(q2);
      const appended = [];
      snap.forEach((docSnap) => {
        const user = { id: docSnap.id, ...docSnap.data() };
        if (user.isInstructor || user.isAdmin) return;
        appended.push({
          autoJoin: !!user.autoJoin,
          completedLessons: user.completedLessons ?? 0,
          id: user.id ?? user.phone,
          isAdmin: !!user.isAdmin,
          isInstructor: !!user.isInstructor,
          joinDate: user.joinDate ?? new Date().toISOString(),
          membershipType: user.membershipType ?? "",
          name: user.name ?? "",
          nameLower: user.nameLower ?? (user.name ? user.name.toLowerCase() : ""),
          phone: user.phone ?? "",
          preferredDays: user.preferredDays ?? [],
          preferredTimeRange: user.preferredTimeRange ?? "",
          remainingLessons: user.remainingLessons ?? 0,
          signature: user.signature ?? "",
          signedAt: user.signedAt ?? null,
          weeklyLimit:
            user.weeklyLimit != null
              ? String(user.weeklyLimit)
              : String(user.remainingLessons ?? 0),
        });
      });
      setUsers((prev) => [...prev, ...appended]);
      lastDocRef.current = snap.docs[snap.docs.length - 1] || null;
      setHasMore(!!lastDocRef.current);
      setUpdatedAt(new Date());
    } catch (e) {
      console.error("❌ fetchNextPage:", e);
      setMessage("שגיאה בטעינת עוד משתמשים");
    } finally {
      setLoadingMore(false);
    }
  };

  /** רענון */
  const refreshAll = async () => {
    setMessage("");
    lastDocRef.current = null;
    await fetchFirstPage();
  };

  useEffect(() => {
    fetchFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** חיפוש: קודם נסיון בשרת (טלפון מדויק, nameLower-prefix), אם לא — סינון לקוח */
  useEffect(() => {
    const doServerSearch = async (term) => {
      if (!term || term.length < 2) {
        setServerSearchActive(false);
        return refreshAll();
      }
      setLoading(true);
      setServerSearchActive(true);
      setHasMore(false);
      try {
        const resultsMap = new Map();

        // 1) טלפון מדויק
        const byPhoneQ = query(collection(db, "Users"), where("phone", "==", term));
        const byPhoneSnap = await getDocs(byPhoneQ);
        byPhoneSnap.forEach((docSnap) => {
          const u = { id: docSnap.id, ...docSnap.data() };
          if (u.isInstructor || u.isAdmin) return;
          resultsMap.set(u.phone || u.id, u);
        });

        // 2) nameLower prefix (דורש שנכתוב nameLower בשמירה/ייבוא)
        const lower = term.toLowerCase();
        // הערה: כדי שה־orderBy nameLower יעבוד, יש לוודא שהשדה קיים במסמכים או שיהיה אינדקס
        const byNameQ = query(
          collection(db, "Users"),
          orderBy("nameLower"),
          // Firestore prefix: startAt(lower) endAt(lower + '\uf8ff')
          // אם חסר אינדקס - יתבקש יצירתו בקונסול
          // למניעת בעיה, נעטוף ב-try/catch
        );
        try {
          const byNameSnap = await getDocs(byNameQ);
          byNameSnap.forEach((docSnap) => {
            const u = { id: docSnap.id, ...docSnap.data() };
            if (u.isInstructor || u.isAdmin) return;
            const nl =
              (u.nameLower ?? (u.name ? String(u.name).toLowerCase() : "")) || "";
            if (nl.startsWith(lower)) {
              resultsMap.set(u.phone || u.id, u);
            }
          });
        } catch (e) {
          // אם אין אינדקס / שגיאה — נתעלם ונמשיך לסינון לקוח (למטה)
          console.warn("nameLower server search skipped:", e?.message);
        }

        let list = Array.from(resultsMap.values()).map((user) => ({
          autoJoin: !!user.autoJoin,
          completedLessons: user.completedLessons ?? 0,
          id: user.id ?? user.phone,
          isAdmin: !!user.isAdmin,
          isInstructor: !!user.isInstructor,
          joinDate: user.joinDate ?? new Date().toISOString(),
          membershipType: user.membershipType ?? "",
          name: user.name ?? "",
          nameLower: user.nameLower ?? (user.name ? user.name.toLowerCase() : ""),
          phone: user.phone ?? "",
          preferredDays: user.preferredDays ?? [],
          preferredTimeRange: user.preferredTimeRange ?? "",
          remainingLessons: user.remainingLessons ?? 0,
          signature: user.signature ?? "",
          signedAt: user.signedAt ?? null,
          weeklyLimit:
            user.weeklyLimit != null
              ? String(user.weeklyLimit)
              : String(user.remainingLessons ?? 0),
        }));

        // אם לא החזיר — ננסה סינון לוקאלי על מה שכבר נטען
        if (list.length === 0) {
          list = users.filter(
            (u) =>
              (u.name || "").toLowerCase().includes(lower) ||
              (u.phone || "").includes(term)
          );
        }

        setUsers(list);
        setUpdatedAt(new Date());
      } catch (e) {
        console.error("❌ server search:", e);
        setMessage("שגיאה בחיפוש");
      } finally {
        setLoading(false);
      }
    };

    doServerSearch(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  /** שמירה/עדכון משתמש – כולל nameLower + מחיקה מותנית weeklyLimit */
  const handleSaveUser = async () => {
    setMessage("");
    if (!phone || !name || !membershipType) {
      setMessage("נא למלא שם, טלפון וסוג מנוי");
      return;
    }
    const numericRemaining = parseInt(remainingLessons, 10) || 0;
    const shouldHaveWeeklyLimit = membershipType === "שבועי" || membershipType === "חודשי";
    const weeklyLimitValue = shouldHaveWeeklyLimit
      ? String(weeklyLimit || numericRemaining)
      : deleteField();

    try {
      const userRef = doc(db, "Users", phone);
      const userData = {
        id: phone,
        phone,
        name,
        nameLower: String(name).toLowerCase(), // לשאילתות מהירות
        joinDate: new Date().toISOString(),
        isInstructor: false,
        isAdmin: false,
        membershipType,
        remainingLessons: numericRemaining,
        completedLessons: 0,
        weeklyLimit: weeklyLimitValue,
        preferredDays: preferredDays || [],
        preferredTimeRange:
          preferredStartTime && preferredEndTime ? `${preferredStartTime}-${preferredEndTime}` : "",
        autoJoin: !!autoJoin,
        signature: signature || "",
        signedAt: signature ? new Date().toISOString() : null,
      };

      assertValidUser(userData);
      await setDoc(userRef, userData, { merge: true });

      // רישום אוטומטי — נשמר 1:1
      if (autoJoin && preferredDays.length > 0) {
        await registerToMatchingClasses({
          ...userData,
          weeklyLimit: shouldHaveWeeklyLimit ? userData.weeklyLimit : "",
        });
      }
      setMessage(editingUserId ? "✔️ המשתמש עודכן" : "✔️ המשתמש נוסף");
      clearForm();
      await refreshAll();
    } catch (error) {
      console.error("❌ שגיאה בהוספת/עדכון משתמש:", error);
      setMessage("שגיאה בהוספת/עדכון משתמש");
    }
  };

  /** רישום אוטומטי — נשמר */
  const registerToMatchingClasses = async (user) => {
    try {
      const isWeeklySubscription = user.membershipType === "שבועי";
      const isMonthlySubscription = user.membershipType === "חודשי";
      const isCardSubscription = user.membershipType === "כרטיסייה";

      if (isCardSubscription && user.remainingLessons <= 0) {
        setMessage(`למשתמש ${user.name} אין שיעורים נותרים בכרטיסייה`);
        return;
      }

      const classesSnapshot = await getDocs(collection(db, "classes"));
      const allClasses = classesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const userBookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", user.phone)
      );
      const userBookingsSnapshot = await getDocs(userBookingsQuery);
      const userBookings = userBookingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const futureClasses = allClasses.filter((cls) => {
        try {
          const [day, month, year] = cls.date.split("/").map(Number);
          const classDate = new Date(year, month - 1, day);
          classDate.setHours(0, 0, 0, 0);
          return classDate >= today && cls.spots > 0;
        } catch {
          return false;
        }
      });

      let classesByWeek = {};
      let classesByMonth = {};
      let bookingsByWeek = {};
      let bookingsByMonth = {};
      if (isWeeklySubscription || isMonthlySubscription) {
        futureClasses.forEach((cls) => {
          const [d, m, y] = cls.date.split("/").map(Number);
          const classDate = new Date(y, m - 1, d);
          if (isWeeklySubscription) {
            const w = getWeekNumber(classDate);
            const wk = `${y}-${w}`;
            if (!classesByWeek[wk]) classesByWeek[wk] = [];
            classesByWeek[wk].push(cls);
          }
          if (isMonthlySubscription) {
            const mk = `${y}-${m}`;
            if (!classesByMonth[mk]) classesByMonth[mk] = [];
            classesByMonth[mk].push(cls);
          }
        });

        userBookings.forEach((b) => {
          const [d, m, y] = b.date.split("/").map(Number);
          const bookingDate = new Date(y, m - 1, d);
          if (bookingDate < today) return;
          if (isWeeklySubscription) {
            const w = getWeekNumber(bookingDate);
            const wk = `${y}-${w}`;
            if (!bookingsByWeek[wk]) bookingsByWeek[wk] = [];
            bookingsByWeek[wk].push(b);
          }
          if (isMonthlySubscription) {
            const mk = `${y}-${m}`;
            if (!bookingsByMonth[mk]) bookingsByMonth[mk] = [];
            bookingsByMonth[mk].push(b);
          }
        });
      }

      let registrationCount = 0;
      let weeklyRegistrations = {};
      let monthlyRegistrations = {};

      if (user.preferredDays?.length > 0 && user.preferredTimeRange) {
        const [startTime, endTime] = user.preferredTimeRange.split("-");
        const startParts = startTime.split(":").map(Number);
        const endParts = endTime.split(":").map(Number);
        const startMinutes = startParts[0] * 60 + startParts[1];
        const endMinutes = endParts[0] * 60 + endParts[1];

        for (const cls of futureClasses) {
          try {
            const [d, m, y] = cls.date.split("/").map(Number);
            const classDate = new Date(y, m - 1, d);
            const weekNumber = getWeekNumber(classDate);
            const weekKey = `${y}-${weekNumber}`;
            const monthKey = `${y}-${m}`;

            if (isWeeklySubscription) {
              const existingWeekly = (bookingsByWeek[weekKey] || []).length;
              const newWeekly = weeklyRegistrations[weekKey] || 0;
              const totalWeekly = existingWeekly + newWeekly;
              const limit = Number(user.remainingLessons) || 0;
              if (totalWeekly >= limit) continue;
            }
            if (isMonthlySubscription) {
              const existingMonthly = (bookingsByMonth[monthKey] || []).length;
              const newMonthly = monthlyRegistrations[monthKey] || 0;
              const totalMonthly = existingMonthly + newMonthly;
              const limit = Number(user.remainingLessons) || 0;
              if (totalMonthly >= limit) continue;
            }
            if (isCardSubscription && registrationCount >= user.remainingLessons) break;

            const dayOfWeek = classDate.getDay();
            if (user.preferredDays.includes(dayOfWeek)) {
              const [h, mm] = cls.time.split(":").map(Number);
              const classMinutes = h * 60 + mm;
              if (classMinutes >= startMinutes && classMinutes <= endMinutes) {
                const bookingsQuery = query(
                  collection(db, "bookings"),
                  where("userId", "==", user.phone),
                  where("classId", "==", cls.id)
                );
                const exists = await getDocs(bookingsQuery);
                if (exists.empty) {
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
                  await setDoc(doc(db, "classes", cls.id), { ...cls, spots: cls.spots - 1 });
                  registrationCount++;
                  if (isWeeklySubscription) {
                    weeklyRegistrations[weekKey] = (weeklyRegistrations[weekKey] || 0) + 1;
                  }
                  if (isMonthlySubscription) {
                    monthlyRegistrations[monthKey] = (monthlyRegistrations[monthKey] || 0) + 1;
                  }
                  if (registrationCount >= 15) break; // תקרה בטיחותית
                }
              }
            }
          } catch (err) {
            console.error(`שגיאה בעיבוד שיעור ${cls.id}:`, err);
          }
        }

        if (registrationCount > 0) {
          if (isCardSubscription) {
            await setDoc(
              doc(db, "Users", user.phone),
              { ...user, remainingLessons: user.remainingLessons - registrationCount },
              { merge: true }
            );
            setMessage(
              `✅ נרשמו ${registrationCount} שיעורים (כרטיסייה). נותרו ${user.remainingLessons - registrationCount}.`
            );
          } else if (isWeeklySubscription) {
            setMessage(`✅ נרשמו ${registrationCount} שיעורים (שבועי)`);
          } else if (isMonthlySubscription) {
            setMessage(`✅ נרשמו ${registrationCount} שיעורים (חודשי)`);
          }
        } else {
          setMessage(`לא נמצאו שיעורים מתאימים להרשמה אוטומטית`);
        }
      } else {
        setMessage(`חסרים פרטי העדפות (ימים ושעות)`);
      }
    } catch (error) {
      console.error("❌ שגיאה ברישום אוטומטי לשיעורים:", error);
      setMessage(`שגיאה ברישום האוטומטי: ${error.message}`);
    }
  };

  const getWeekNumber = (date) => {
    const d = new Date(date);
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    const days = Math.floor((d - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  };

  const clearForm = () => {
    setPhone("");
    setName("");
    setMembershipType("");
    setRemainingLessons(0);
    setWeeklyLimit("");
    setEditingUserId(null);
    setPreferredDays([]);
    setPreferredStartTime("");
    setPreferredEndTime("");
    setAutoJoin(false);
    setSignature("");
  };

  /** עריכה */
  const handleEditUser = (user) => {
    if (!user) return;
    setPhone(user.phone || "");
    setName(user.name || "");
    setMembershipType(user.membershipType || "");
    setRemainingLessons(user.remainingLessons ?? 0);
    if (user.membershipType === "שבועי" || user.membershipType === "חודשי") {
      setWeeklyLimit(
        user.weeklyLimit != null ? String(user.weeklyLimit) : String(user.remainingLessons ?? "")
      );
    } else {
      setWeeklyLimit("");
    }
    setPreferredDays(Array.isArray(user.preferredDays) ? user.preferredDays : []);
    if (user.preferredTimeRange && typeof user.preferredTimeRange === "string") {
      const [start, end] = user.preferredTimeRange.split("-");
      setPreferredStartTime(start || "");
      setPreferredEndTime(end || "");
    } else {
      setPreferredStartTime("");
      setPreferredEndTime("");
    }
    setAutoJoin(!!user.autoJoin);
    setSignature(user.signature || "");
    setEditingUserId(user.id || user.phone);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** מחיקה */
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?")) return;
    try {
      await deleteDoc(doc(db, "Users", userId));
      setMessage("🗑️ משתמש נמחק");
      await refreshAll();
    } catch (error) {
      console.error("❌ שגיאה במחיקת משתמש:", error);
      setMessage("שגיאה במחיקה");
    }
  };

  /** חתימה — טעינה עצלה מה־employees אם חסרה */
  const handleShowSignature = async (user) => {
    if (!user) return;
    let sig = user.signature;
    let signedAt = user.signedAt || null;

    if (!sig && user.phone) {
      try {
        const employeeDoc = await getDoc(doc(db, "employees", user.phone));
        if (employeeDoc.exists()) {
          const employeeData = employeeDoc.data();
          sig = employeeData.signature || "";
          signedAt = signedAt || employeeData.signedAt || null;
        }
      } catch (e) {
        console.warn("לא ניתן להביא חתימה מ-employees:", e?.message);
      }
    }

    if (!sig) {
      alert("אין חתימה זמינה למשתמש זה");
      return;
    }
    setCurrentUser({ ...user, signedAt });
    setCurrentSignature(sig);
    setShowSignature(true);
  };

  /** יצירת PDF */
  const handleCreatePDF = (user) => {
    if (!user?.signature) return;
    try {
      const docx = new jsPDF();
      const imgWidth = 150;
      const imgHeight = 80;
      const margin = 20;

      docx.setFont("helvetica", "bold");
      docx.setFontSize(16);
      docx.text("הצהרת בריאות", margin, margin);

      docx.setFont("helvetica", "normal");
      docx.setFontSize(12);
      docx.text(`שם: ${user.name}`, margin, margin + 10);
      docx.text(`טלפון: ${user.phone}`, margin, margin + 20);

      if (user.signedAt) {
        const signDate = new Date(user.signedAt);
        const formattedDate = signDate.toLocaleDateString("he-IL");
        docx.text(`תאריך חתימה: ${formattedDate}`, margin, margin + 30);
      }

      docx.setFont("helvetica", "bold");
      docx.text("חתימה:", margin, margin + 45);

      if (user.signature && user.signature.startsWith("data:")) {
        docx.addImage(user.signature, "PNG", margin, margin + 50, imgWidth, imgHeight);
      }

      docx.save(`health-declaration-${user.phone}.pdf`);
    } catch (error) {
      console.error("שגיאה ביצירת PDF:", error);
    }
  };

  const handleCloseSignature = () => {
    setShowSignature(false);
    setTimeout(() => {
      setCurrentSignature(null);
      setCurrentUser(null);
    }, 100);
  };

  /** העלאת JSON — כותב גם nameLower ומוחק weeklyLimit כשכרטיסייה */
  const handleUploadJSON = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const jsonData = JSON.parse(e.target.result);
        const parsedUsers = Array.isArray(jsonData) ? jsonData : Object.values(jsonData);
        for (const user of parsedUsers) {
          if (!user.phone || !user.name) continue;
          const userRef = doc(db, "Users", user.phone);
          const rl = user.remainingLessons ?? 0;
          const isWeeklyOrMonthly = user.membershipType === "שבועי" || user.membershipType === "חודשי";

          await setDoc(
            userRef,
            {
              id: user.phone,
              phone: user.phone,
              name: user.name,
              nameLower: String(user.name).toLowerCase(),
              membershipType: user.membershipType || "",
              remainingLessons: rl,
              weeklyLimit: isWeeklyOrMonthly ? String(user.weeklyLimit ?? rl ?? 0) : deleteField(),
              preferredDays: user.preferredDays || [],
              preferredTimeRange: user.preferredTimeRange || "",
              autoJoin: !!user.autoJoin,
              signature: user.signature || "",
              signedAt: user.signedAt || null,
              isInstructor: !!user.isInstructor,
              isAdmin: !!user.isAdmin,
              completedLessons: user.completedLessons ?? 0,
              joinDate: user.joinDate ?? new Date().toISOString(),
            },
            { merge: true }
          );
        }
        setMessage("✔️ משתמשים נוספו/עודכנו בהצלחה");
        await refreshAll();
      };
      reader.readAsText(file);
    } catch (error) {
      console.error("❌ שגיאה בהעלאת JSON:", error);
      setMessage("שגיאה בהעלאת JSON");
    }
  };

  const checkAdmin = () => true;
  if (!checkAdmin()) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלים.</p>
      </div>
    );
  }

  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

  /** סינון לקוח משלים (כשserverSearchActive=false) */
  const filteredUsers = useMemo(() => {
    if (serverSearchActive || !debouncedSearch || debouncedSearch.length < 2) return users;
    const lower = debouncedSearch.toLowerCase();
    return users.filter(
      (u) => (u.name || "").toLowerCase().includes(lower) || (u.phone || "").includes(debouncedSearch)
    );
  }, [users, debouncedSearch, serverSearchActive]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* סרגל עליון דביק */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 py-3">
          <h1 className="text-2xl font-bold text-blue-700">ניהול משתמשים (לקוחות)</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setShowForm((v) => !v);
                if (showAdvanced) setShowAdvanced(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow inline-flex items-center gap-1"
            >
              <Plus size={16} />
              {showForm ? "סגור טופס" : "הוסף משתמש"}
            </button>

            <label className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow cursor-pointer inline-flex items-center gap-2">
              <Upload size={16} />
              העלה JSON
              <input type="file" accept=".json" onChange={handleUploadJSON} className="hidden" />
            </label>

            <button
              onClick={refreshAll}
              disabled={loading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-full shadow-sm inline-flex items-center gap-2"
              title="רענון נתונים"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              רענן
            </button>

            <button
              onClick={() => navigate("/admin")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-full shadow-sm inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              חזרה
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 pb-3">
          <input
            type="text"
            placeholder="חפש לפי שם או טלפון (מ־2 תווים)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
          />
          <div className="text-xs text-gray-500 shrink-0">
            סה״כ: <span className="font-bold">{filteredUsers.length}</span>
            {updatedAt && (
              <span className="ml-2">עודכן {updatedAt.toLocaleTimeString("he-IL")}</span>
            )}
          </div>
        </div>
      </div>

      {/* הודעת מערכת */}
      {message && <div className="my-2 text-blue-600">{message}</div>}

      {/* טופס */}
      {showForm && (
        <div className="bg-white shadow rounded-xl p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">
            {editingUserId ? "עריכת משתמש" : "הוספת משתמש חדש"}
          </h2>

          <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
            <input
              type="tel"
              placeholder="מספר טלפון"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="שם מלא"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            />

            <select
              value={membershipType}
              onChange={(e) => {
                const v = e.target.value;
                setMembershipType(v);
                if (v === "כרטיסייה") {
                  setRemainingLessons(10);
                  setWeeklyLimit("");
                }
                if (v === "שבועי") {
                  setRemainingLessons(3);
                  setWeeklyLimit("3");
                }
                if (v === "חודשי") {
                  setRemainingLessons(12);
                  setWeeklyLimit("12");
                }
              }}
              className="w-full p-2 border rounded-md text-sm"
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
              onChange={(e) => {
                const val = e.target.value;
                setRemainingLessons(val);
                if (membershipType === "שבועי" || membershipType === "חודשי") {
                  setWeeklyLimit(String(val ?? ""));
                }
              }}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="mt-3 flex items-center gap-1 text-sm text-blue-700 hover:underline hover:text-blue-800"
          >
            {showAdvanced ? (
              <>
                הסתר הגדרות מתקדמות <ChevronUp size={16} />
              </>
            ) : (
              <>
                הצג הגדרות מתקדמות <ChevronDown size={16} />
              </>
            )}
          </button>

          {showAdvanced && (
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
              <h3 className="text-sm font-medium flex items-center">
                <Calendar size={16} className="mr-2" />
                הגדרת זמני אימון מועדפים
              </h3>

              <div className="flex flex-wrap gap-2">
                {["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"].map((day, index) => (
                  <label
                    key={index}
                    className={`cursor-pointer px-3 py-1 border rounded-full text-sm ${
                      preferredDays.includes(index)
                        ? "bg-blue-100 border-blue-300 text-blue-800"
                        : "bg-gray-50 border-gray-200 text-gray-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={preferredDays.includes(index)}
                      onChange={() =>
                        preferredDays.includes(index)
                          ? setPreferredDays(preferredDays.filter((d) => d !== index))
                          : setPreferredDays([...preferredDays, index])
                      }
                    />
                    {day}
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">משעה:</label>
                  <input
                    type="time"
                    value={preferredStartTime}
                    onChange={(e) => setPreferredStartTime(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">עד שעה:</label>
                  <input
                    type="time"
                    value={preferredEndTime}
                    onChange={(e) => setPreferredEndTime(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>

              <label className="flex items-center text-sm gap-2">
                <input type="checkbox" checked={autoJoin} onChange={(e) => setAutoJoin(e.target.checked)} />
                רישום אוטומטי לשיעורים מתאימים (מיידי ובעתיד)
              </label>

              <div>
                <p className="text-sm text-gray-600 mb-1">הוסף חתימה (תמונה):</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      resizeImage(file).then((resized) => setSignature(resized));
                    }
                  }}
                />
              </div>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSaveUser}
              className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {editingUserId ? "עדכן משתמש" : "הוסף משתמש"}
            </button>
            <button onClick={clearForm} className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md">
              נקה טופס
            </button>
          </div>

          {message && <p className="mt-3 text-green-600 text-sm">{message}</p>}
        </div>
      )}

      {/* רשימת משתמשים */}
      {loading && users.length === 0 ? (
        <div className="grid gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-blue-800 truncate">{user.name}</h3>
                <span className="text-xs text-gray-500">טלפון: {user.phone}</span>
              </div>

              <div className="text-sm text-gray-700">
                סוג מנוי: <span className="font-medium">{user.membershipType || "—"}</span> | שיעורים:{" "}
                <span className="font-medium">{user.remainingLessons}</span>
                {(user.membershipType === "שבועי" || user.membershipType === "חודשי") && (
                  <>
                    {" "}
                    | WeeklyLimit: <span className="font-medium">{String(user.weeklyLimit)}</span>
                  </>
                )}
              </div>

              {user.preferredDays?.length > 0 && (
                <div className="text-xs text-gray-600">
                  <span className="font-medium">העדפות:</span>{" "}
                  {user.preferredDays.map((d) => dayNames[d]).join(", ")}
                  {user.preferredTimeRange && ` (${user.preferredTimeRange})`}
                  {user.autoJoin && <span className="text-green-600 ml-2">• רישום אוטומטי</span>}
                </div>
              )}

              <div className="flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => handleShowSignature(user)}
                  className="text-sm bg-white border hover:bg-gray-50 text-gray-700 py-1 px-3 rounded"
                >
                  חתימה
                </button>
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                >
                  ערוך
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                >
                  מחק
                </button>
              </div>
            </div>
          ))}

          {/* פאג'ינציה */}
          {!serverSearchActive && hasMore && (
            <div className="flex justify-center my-4">
              <button
                onClick={fetchNextPage}
                disabled={loadingMore}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded"
              >
                {loadingMore ? "טוען..." : "טען עוד"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* מודל חתימה */}
      {showSignature && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow w-[90%] max-w-xl">
            <h3 className="text-lg font-bold mb-2">חתימה – {currentUser?.name}</h3>
            {currentSignature ? (
              <img alt="signature" src={currentSignature} className="w-full h-auto border rounded" />
            ) : (
              <p className="text-sm text-gray-500">אין חתימה להצגה</p>
            )}
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => currentUser && handleCreatePDF({ ...currentUser, signature: currentSignature })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                יצוא PDF
              </button>
              <button onClick={handleCloseSignature} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded">
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
