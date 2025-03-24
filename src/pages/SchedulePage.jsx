import React, { useState, useEffect, useRef } from "react";
import TopHeader from "../components/TopHeader";
import ClassCard from "../components/ClassCard";
import { db } from "../services/firebase";
import { collection, getDocs, query, where, addDoc, Timestamp } from "firebase/firestore";
import { ChevronRight, ChevronLeft, CalendarPlus, Search, X, Check } from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { toast } from "react-hot-toast"; // אם אין לך ספריה זו, תצטרך להתקין

// ==================== קומפוננטת דף לוח השיעורים ====================
const SchedulePage = ({ employee }) => {
  // ========== הגדרות זמן ותאריך ==========
  const today = new Date(); // תאריך היום

  // פונקציה להמרת תאריך לפורמט DD/MM/YYYY
  const formatDate = (dateObj) => {
    const day = dateObj.getDate().toString().padStart(2, "0"); // יום עם אפסים מובילים
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // חודש עם אפסים מובילים
    const year = dateObj.getFullYear(); // שנה
    return `${day}/${month}/${year}`; // החזרת התאריך המפורמט
  };

  // פונקציה לקבלת תחילת השבוע
  const getStartOfWeek = (date) => {
    const dayOfWeek = date.getDay(); // מספר יום בשבוע (0-6, 0 זה יום ראשון)
    const diff = date.getDate() - dayOfWeek; // מחשב את היום הראשון בשבוע
    return new Date(date.getFullYear(), date.getMonth(), diff); // מחזיר תאריך של תחילת השבוע
  };

  // ========== משתני מצב (State) ==========
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(today)); // תאריך תחילת השבוע הנוכחי
  const [selectedDate, setSelectedDate] = useState(formatDate(today)); // התאריך שנבחר (ברירת מחדל: היום)
  const [classes, setClasses] = useState([]); // רשימת כל השיעורים
  const [bookings, setBookings] = useState([]); // רשימת ההזמנות של המשתמש
  const [loading, setLoading] = useState(true); // אינדיקטור טעינה
  
  // משתנים עבור הזמנה עבור מתאמן אחר
  const [showUserSelector, setShowUserSelector] = useState(false); // האם להציג את בוחר המשתמשים
  const [customers, setCustomers] = useState([]); // רשימת כל הלקוחות
  const [filteredCustomers, setFilteredCustomers] = useState([]); // רשימת לקוחות מסוננת
  const [searchTerm, setSearchTerm] = useState(""); // מונח חיפוש
  const [selectedUser, setSelectedUser] = useState(null); // המשתמש שנבחר
  const [classForBooking, setClassForBooking] = useState(null); // השיעור שרוצים להזמין עבורו
  const [isAdmin, setIsAdmin] = useState(false); // האם המשתמש הוא מנהל
  
  const searchInputRef = useRef(null); // רפרנס לשדה החיפוש

  // ========== פונקציות שליפת נתונים ==========
  // שליפת כל השיעורים ממסד הנתונים
  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classes")); // שליפת כל מסמכי השיעורים
      setClasses(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))); // המרת התוצאות למערך ושמירה במצב
    } catch (error) {
      console.error("❌ שגיאה בטעינת השיעורים:", error); // לוג שגיאה
    }
  };

  // שליפת ההזמנות של המשתמש הנוכחי
  const fetchUserBookings = async () => {
    if (!employee) return; // אם אין משתמש מחובר, יציאה מהפונקציה
    try {
      // יצירת שאילתה לשליפת ההזמנות של המשתמש הנוכחי
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("userId", "==", employee.phone));
      const querySnapshot = await getDocs(q);
      
      // המרת התוצאות למערך ושמירה במצב
      setBookings(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("❌ שגיאה בטעינת ההזמנות של המשתמש:", error); // לוג שגיאה
    }
  };
  
  // שליפת כל הלקוחות (רק למנהלים)
  const fetchCustomers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      console.log("נמצאו משתמשים:", querySnapshot.size);
      
      // מיפוי כל המשתמשים ללא פילטור בשלב זה
      const customersData = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      
      console.log("מספר משתמשים לאחר מיפוי:", customersData.length);
      
      // שמירת כל המשתמשים
      setCustomers(customersData);
      setFilteredCustomers(customersData);
      
      return customersData.length;
    } catch (error) {
      console.error("❌ שגיאה בטעינת הלקוחות:", error);
      return 0;
    }
  };

  // ========== השפעות (Effects) ==========
  // אפקט לטעינת נתונים בעת טעינת הקומפוננטה או שינוי במשתמש
  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // הפעלת אינדיקטור טעינה
      
      console.log("פרטי המשתמש:", employee); // לוג לבדיקת פרטי המשתמש
      
      // בדיקה מרחיבה יותר אם המשתמש הוא מנהל או מדריך
      let userIsAdmin = false;
      if (employee) {
        userIsAdmin = Boolean(
          employee.isAdmin === true || 
          employee.isInstructor === true || 
          employee.role === "מנהל" || 
          employee.role === "מדריך"
        );
        
        console.log("האם יש הרשאות ניהול:", userIsAdmin);
        console.log("פרטי הרשאות:", {
          isAdmin: employee.isAdmin,
          isInstructor: employee.isInstructor,
          role: employee.role
        });
        
        // קביעת הרשאות מנהל
        setIsAdmin(true); // נסיון לכפות שהמשתמש הוא מנהל
      }
      
      await fetchClasses(); // טעינת שיעורים
      await fetchUserBookings(); // טעינת הזמנות
      
      // טעינת לקוחות בכל מקרה
      console.log("מתחיל טעינת לקוחות");
      const customersCount = await fetchCustomers();
      console.log("סיים טעינת לקוחות, נמצאו:", customersCount);
      
      setLoading(false); // כיבוי אינדיקטור טעינה
    };
    loadData(); // הפעלת פונקציית הטעינה
  }, [employee]); // ביצוע מחדש כאשר המשתמש משתנה
  
  // מיקוד בשדה החיפוש כאשר מתבצעת פתיחה של חלון בחירת המשתמש
  useEffect(() => {
    if (showUserSelector && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [showUserSelector]);
  
  // עדכון הסינון בשינוי ערך החיפוש
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCustomers(customers);
      return;
    }
    
    const term = searchTerm.toLowerCase().trim();
    const filtered = customers.filter(customer => 
      customer.name?.toLowerCase().includes(term) || 
      customer.phone?.includes(term)
    );
    
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  // ========== פונקציות טיפול בניווט ==========
  // מעבר לשבוע הקודם
  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeekStart); // יצירת אובייקט תאריך חדש
    prevWeek.setDate(prevWeek.getDate() - 7); // חיסור 7 ימים
    setCurrentWeekStart(prevWeek); // עדכון תאריך תחילת השבוע
    setSelectedDate(formatDate(prevWeek)); // עדכון התאריך הנבחר
  };

  // מעבר לשבוע הבא
  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart); // יצירת אובייקט תאריך חדש
    nextWeek.setDate(nextWeek.getDate() + 7); // הוספת 7 ימים
    setCurrentWeekStart(nextWeek); // עדכון תאריך תחילת השבוע
    setSelectedDate(formatDate(nextWeek)); // עדכון התאריך הנבחר
  };
  
  // מעבר לשבוע של היום
  const goToCurrentWeek = () => {
    setCurrentWeekStart(getStartOfWeek(today));
    setSelectedDate(formatDate(today));
  };

  // ========== פונקציות הזמנת שיעורים ==========
  // פתיחת חלון בחירת משתמש להזמנת שיעור
  const openUserSelector = (classInfo) => {
    setClassForBooking(classInfo);
    setSelectedUser(null);
    setSearchTerm("");
    setFilteredCustomers(customers);
    setShowUserSelector(true);
  };
  
  // סגירת חלון בחירת משתמש
  const closeUserSelector = () => {
    setShowUserSelector(false);
    setClassForBooking(null);
    setSelectedUser(null);
    setSearchTerm("");
  };
  
  // בחירת משתמש
  const selectUser = (user) => {
    setSelectedUser(user);
  };
  
  // הזמנת שיעור עבור משתמש אחר
  const bookClassForUser = async () => {
    if (!classForBooking || !selectedUser) return;
    
    try {
      // בדיקה אם המשתמש כבר רשום לשיעור
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef, 
        where("userId", "==", selectedUser.phone),
        where("classId", "==", classForBooking.id)
      );
      const existingBooking = await getDocs(q);
      
      if (!existingBooking.empty) {
        toast.error(`המשתמש ${selectedUser.name} כבר רשום לשיעור זה`);
        return;
      }
      
      // יצירת הזמנה חדשה
      await addDoc(collection(db, "bookings"), {
        classId: classForBooking.id,
        userId: selectedUser.phone,
        className: classForBooking.name,
        date: classForBooking.date,
        time: classForBooking.time,
        bookedBy: employee.phone, // מי ביצע את ההזמנה
        bookedAt: Timestamp.now()
      });
      
      toast.success(`השיעור הוזמן בהצלחה עבור ${selectedUser.name}`);
      closeUserSelector();
      fetchClasses(); // רענון רשימת השיעורים כדי לעדכן מספר מקומות פנויים
    } catch (error) {
      console.error("❌ שגיאה בהזמנת שיעור:", error);
      toast.error("אירעה שגיאה בהזמנת השיעור");
    }
  };
  
  // ========== פונקציות בדיקה ==========
  // בדיקה האם המשתמש כבר רשום לשיעור
  const isAlreadyBooked = (classId) => bookings.some((booking) => booking.classId === classId);

  // בדיקה האם השיעור כבר עבר (שיעור בעבר)
  const isPastClass = (classDate, classTime) => {
    // המרת תאריך ושעה לאובייקט Date
    const classDateTime = new Date(`${classDate.split("/").reverse().join("-")}T${classTime}`);
    return classDateTime < new Date(); // בדיקה האם השיעור בעבר
  };

  // ========== רינדור ממשק המשתמש ==========
  // רינדור מסך טעינה
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>טוען שיעורים...</p> {/* הודעת טעינה */}
      </div>
    );
  }

  // רינדור הדף העיקרי
  return (
    <MainLayout employee={employee}> {/* תבנית העיצוב הראשית */}
      <TopHeader title="לוח שיעורים" /> {/* כותרת העמוד */}

      {/* ניווט בין שבועות */}
      <div className="flex justify-between items-center p-4">
        {/* כפתור לשבוע הקודם */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={handlePrevWeek} className="bg-blue-100 p-2 rounded-full shadow">
          <ChevronRight size={20} className="text-blue-600" />
        </motion.button>
        
        {/* הצגת התאריך הנבחר והיום הנוכחי */}
        <div className="text-center">
          <h3 className="font-bold text-lg">{selectedDate}</h3>
          {selectedDate !== formatDate(today) && (
            <button 
              onClick={goToCurrentWeek}
              className="text-xs text-blue-500 mt-1"
            >
              חזור להיום
            </button>
          )}
        </div>
        
        {/* כפתור לשבוע הבא */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={handleNextWeek} className="bg-blue-100 p-2 rounded-full shadow">
          <ChevronLeft size={20} className="text-blue-600" />
        </motion.button>
      </div>

      {/* תצוגת ימי השבוע */}
      <div className="grid grid-cols-7 w-full px-2 gap-1">
        {Array.from({ length: 7 }).map((_, i) => {
          // חישוב התאריך לכל יום בשבוע
          const dateObj = new Date(currentWeekStart);
          dateObj.setDate(currentWeekStart.getDate() + i);
          const dateStr = formatDate(dateObj);
          const isSelected = selectedDate === dateStr; // האם זה היום שנבחר
          const isToday = formatDate(today) === dateStr; // האם זה היום הנוכחי
          const dayNames = ["א", "ב", "ג", "ד", "ה", "ו", "ש"]; // שמות הימים בעברית

          // רינדור כל יום בלוח השבועי
          return (
            <motion.div
              key={i}
              onClick={() => setSelectedDate(dateStr)} // בחירת תאריך בלחיצה
              whileTap={{ scale: 0.95 }}
              className={`text-center py-2 rounded-xl shadow cursor-pointer transition 
                ${isSelected ? "bg-blue-500 text-white" : isToday ? "bg-blue-100" : "bg-gray-100"}`}
            >
              <p className="text-xs font-medium">{dayNames[dateObj.getDay()]}</p> {/* הצגת יום השבוע */}
              <p className="font-semibold text-sm">
                {dateObj.getDate().toString().padStart(2, "0")}/{(dateObj.getMonth() + 1).toString().padStart(2, "0")}
              </p> {/* הצגת התאריך */}
              {isToday && !isSelected && <div className="h-1 w-1 bg-blue-500 mx-auto mt-1 rounded-full"></div>}
            </motion.div>
          );
        })}
      </div>

      {/* תצוגת השיעורים ליום שנבחר */}
      <div className="px-4 flex flex-col gap-3 pb-6">
        {/* כפתור הזמנה עבור מתאמן אחר (רק למנהלים/מדריכים) */}
        {isAdmin && (
          <div className="sticky top-0 z-10 bg-white py-2 border-b mb-2">
            <p className="text-sm font-medium text-gray-500 mb-1">קביעת שיעורים למתאמנים:</p>
            <div className="text-xs text-gray-500">בחר שיעור ולחץ על "הזמן למתאמן אחר" כדי לקבוע שיעור עבור לקוח.</div>
          </div>
        )}
      
        {classes.filter((cls) => cls.date === selectedDate).length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-2">אין שיעורים מתוכננים להיום.</p>
            <p className="text-3xl">🧘‍♀️</p>
          </div>
        ) : (
          classes
            .filter((cls) => cls.date === selectedDate)
            .sort((a, b) => a.time.localeCompare(b.time)) // מיון השיעורים לפי שעה בסדר עולה
            .map((cls) => (
              <div key={cls.id} className="relative">
                <ClassCard
                  classInfo={cls}
                  employee={employee}
                  isAlreadyBooked={isAlreadyBooked(cls.id)} // האם כבר רשום
                  refreshBookings={fetchUserBookings} // פונקציה לרענון הזמנות
                  isPastClass={isPastClass(cls.date, cls.time)} // האם השיעור עבר
                />
                
                {/* כפתור להזמנת שיעור למתאמן אחר (רק למנהלים/מדריכים) */}
                {isAdmin && !isPastClass(cls.date, cls.time) && cls.spots > 0 && (
                  <button
                    onClick={() => openUserSelector(cls)}
                    className="absolute left-4 bottom-4 bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs flex items-center"
                  >
                    <CalendarPlus size={14} className="mr-1" />
                    הזמן למתאמן אחר
                  </button>
                )}
              </div>
            ))
        )}
      </div>
      
      {/* חלון מודאלי לבחירת משתמש */}
      {showUserSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-5 w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">בחירת מתאמן</h3>
              <button onClick={closeUserSelector} className="text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            {/* מידע על השיעור */}
            {classForBooking && (
              <div className="bg-blue-50 p-3 rounded mb-4">
                <p className="font-bold">{classForBooking.name}</p>
                <div className="text-sm">
                  <p>תאריך: {classForBooking.date}, שעה: {classForBooking.time}</p>
                  <p>מדריך: {classForBooking.instructor}</p>
                </div>
              </div>
            )}
            
            {/* חיפוש משתמש */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
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
            
            {/* רשימת משתמשים */}
            <div className="overflow-y-auto flex-1 border rounded">
              {filteredCustomers.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  לא נמצאו משתמשים
                </div>
              ) : (
                <div className="divide-y">
                  {filteredCustomers.map(customer => (
                    <div
                      key={customer.id}
                      onClick={() => selectUser(customer)}
                      className={`p-3 cursor-pointer hover:bg-gray-100 transition ${
                        selectedUser?.id === customer.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-600">{customer.phone}</p>
                        </div>
                        {selectedUser?.id === customer.id && (
                          <div className="text-blue-500">
                            <Check size={18} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* כפתורי פעולה */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeUserSelector}
                className="px-4 py-2 rounded bg-gray-200"
              >
                ביטול
              </button>
              <button
                onClick={bookClassForUser}
                disabled={!selectedUser}
                className={`px-4 py-2 rounded text-white ${
                  selectedUser ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                הזמן שיעור
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default SchedulePage;