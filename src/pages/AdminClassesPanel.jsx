import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { format, addDays, isSameDay } from "date-fns"; // מייבא פונקציות נוספות מ-date-fns
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ==================== קומפוננטת פאנל ניהול שיעורים ====================
const AdminClassesPanel = ({ employee }) => {
  // ========== מצב (State) ==========
  // משתני State לניהול השיעורים
  const [classes, setClasses] = useState([]); // רשימת כל השיעורים
  const [loading, setLoading] = useState(true); // אינדיקטור לטעינה
  const [message, setMessage] = useState(""); // הודעת מערכת למשתמש
  const [isModalOpen, setIsModalOpen] = useState(false); // האם חלון המודל פתוח
  
  // משתני State לטופס הוספת/עריכת שיעור
  const [name, setName] = useState(""); // שם השיעור
  const [date, setDate] = useState(null); // תאריך השיעור
  const [time, setTime] = useState(""); // שעת השיעור
  const [spots, setSpots] = useState(10); // מספר מקומות פנויים
  const [instructorId, setInstructorId] = useState(""); // מזהה המדריך
  const [instructors, setInstructors] = useState([]); // רשימת המדריכים
  const [editingClassId, setEditingClassId] = useState(null); // מזהה השיעור שנערך כעת
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // האם להציג חלון אישור מחיקה
  const [deleteClassId, setDeleteClassId] = useState(null); // מזהה השיעור למחיקה
  
  // משתני State לשיעורים מחזוריים
  const [isRecurring, setIsRecurring] = useState(false); // האם השיעור מחזורי
  const [recurrenceEndDate, setRecurrenceEndDate] = useState(null); // תאריך סיום המחזוריות
  const [selectedDays, setSelectedDays] = useState([]); // הימים הנבחרים בשבוע

  // ========== אפקטים ==========
  // טעינת נתונים בעת טעינת הקומפוננטה
  useEffect(() => {
    fetchClasses(); // טעינת רשימת השיעורים
    fetchInstructors(); // טעינת רשימת המדריכים
  }, []);

  // ========== פונקציות עזר ==========
  // פונקציה להמרת תאריך לפורמט DD/MM/YYYY
  const formatDateToDDMMYYYY = (date) => {
    if (!date) return "";
    return format(date, "dd/MM/yyyy");
  };

  // פונקציה לאיפוס הטופס
  const clearForm = () => {
    setName(""); // איפוס שם השיעור
    setDate(null); // איפוס תאריך
    setTime(""); // איפוס שעה
    setSpots(10); // איפוס מספר מקומות לברירת מחדל
    setInstructorId(""); // איפוס מזהה מדריך
    setEditingClassId(null); // איפוס מזהה שיעור לעריכה
    setMessage(""); // איפוס הודעת מערכת
    
    // איפוס משתני שיעורים מחזוריים
    setIsRecurring(false);
    setRecurrenceEndDate(null);
    setSelectedDays([]);
  };

  // ========== פונקציות שליפת נתונים ==========
  // פונקציה לשליפת כל השיעורים
  const fetchClasses = async () => {
    setLoading(true); // הפעלת אינדיקטור טעינה
    try {
      // שליפת כל השיעורים ממסד הנתונים
      const querySnapshot = await getDocs(collection(db, "classes"));
      // המרת התוצאות למערך אובייקטים
      const classesData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // הוספת מזהה המסמך
        ...doc.data(), // הוספת כל הנתונים מהמסמך
      }));
      setClasses(classesData); // עדכון מצב רשימת השיעורים
    } catch (error) {
      // טיפול בשגיאות
      console.error("❌ שגיאה בטעינת השיעורים:", error);
    }
    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // פונקציה לשליפת כל המדריכים
  const fetchInstructors = async () => {
    try {
      // שליפת משתמשים שהם מדריכים
      const q = query(collection(db, "Users"), where("isInstructor", "==", true));
      const querySnapshot = await getDocs(q);
      // המרת התוצאות למערך אובייקטים
      const instructorsData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // מזהה המדריך (מספר טלפון)
        ...doc.data(), // נתוני המדריך
      }));
      console.log("📋 מדריכים שהתקבלו:", instructorsData);

      setInstructors(instructorsData); // עדכון מצב רשימת המדריכים
    } catch (error) {
      // טיפול בשגיאות
      console.error("❌ שגיאה בטעינת המדריכים:", error);
    }
  };

  // ========== פונקציות טיפול במודל ==========
  // פתיחת מודל לעריכת שיעור קיים
  const openModalForEdit = (cls) => {
    setName(cls.name); // הגדרת שם השיעור
    
    // טיפול בתאריך השיעור
    if (cls.date) {
      // פירוק תאריך בפורמט DD/MM/YYYY
      const [day, month, year] = cls.date.split("/");
      // יצירת אובייקט תאריך
      const parsedDate = new Date(`${year}-${month}-${day}`);

      // בדיקה שהתאריך חוקי
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate); // הגדרת תאריך השיעור
      } else {
        console.error("תאריך לא חוקי:", cls.date);
        setDate(null); // איפוס תאריך במקרה של תאריך לא חוקי
      }
    } else {
      // התראה אם אין תאריך בשיעור
      console.warn("אין תאריך בשיעור:", cls);
      setDate(null); // איפוס תאריך
    }
    
    setTime(cls.time); // הגדרת שעת השיעור
    setSpots(cls.spots); // הגדרת מספר המקומות הפנויים
    setInstructorId(cls.instructorId); // הגדרת מזהה המדריך
    setEditingClassId(cls.id); // הגדרת מזהה השיעור הנערך
    setIsModalOpen(true); // פתיחת המודל
  };

  // ========== פונקציות טיפול בשיעורים מחזוריים ==========
  // פונקציה ליצירת שיעורים מחזוריים
  const createRecurringClasses = async (baseClassData) => {
    // וידוא שנבחרו כל הנתונים הדרושים
    if (!date || !recurrenceEndDate || selectedDays.length === 0) {
      setMessage("אנא בחר תאריך התחלה, תאריך סיום וימים בשבוע"); // הודעת שגיאה
      return false;
    }

    // מעבר על כל התאריכים בטווח ויצירת שיעורים לימים הנבחרים
    let currentDate = new Date(date);
    const endDate = new Date(recurrenceEndDate);
    let successCount = 0; // ספירת שיעורים שנוצרו בהצלחה

    try {
      // המשך כל עוד התאריך הנוכחי לפני או שווה לתאריך הסיום
      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay(); // מספר היום בשבוע (0=ראשון, 1=שני, וכו')
        
        // אם היום הנוכחי נמצא ברשימת הימים הנבחרים
        if (selectedDays.includes(dayOfWeek)) {
          // יצירת אובייקט שיעור חדש
          const newClassData = {
            ...baseClassData,
            date: formatDateToDDMMYYYY(new Date(currentDate)), // הגדרת התאריך הנוכחי
          };
          
          // הוספת השיעור למסד הנתונים
          await addDoc(collection(db, "classes"), newClassData);
          successCount++;
        }
        
        // מעבר ליום הבא
        currentDate = addDays(currentDate, 1);
      }
      
      return successCount; // החזרת מספר השיעורים שנוצרו
    } catch (error) {
      console.error("❌ שגיאה ביצירת שיעורים מחזוריים:", error);
      return false;
    }
  };

  // ========== פונקציות טיפול בשיעורים ==========
  // שמירת שיעור חדש או עדכון שיעור קיים
  const handleSaveClass = async (closeAfterSave = false) => {
    // בדיקת תקינות הנתונים
    if (!name || !date || !time || !instructorId || spots < 1) {
      setMessage("אנא מלא את כל השדות הנדרשים"); // הצגת הודעת שגיאה
      return; // עצירת הפונקציה אם יש שדות חסרים
    }

    setLoading(true); // הפעלת אינדיקטור טעינה

    try {
      // מציאת אובייקט המדריך לפי מזהה
      const instructor = instructors.find((i) => i.id === instructorId);
      // בניית אובייקט נתוני השיעור
      const classData = {
        name, // שם השיעור
        date: formatDateToDDMMYYYY(date), // תאריך בפורמט DD/MM/YYYY
        time, // שעת השיעור
        instructor: instructor?.name || "", // שם המדריך
        instructorId, // מזהה המדריך
        spots: parseInt(spots), // מספר מקומות (המרה למספר)
        createdAt: new Date().toISOString(), // זמן יצירה
      };

      // בדיקה האם מדובר בשיעור מחזורי או שיעור רגיל
      if (isRecurring && !editingClassId) {
        // יצירת שיעורים מחזוריים
        const successCount = await createRecurringClasses(classData);
        
        if (successCount) {
          setMessage(`✔️ נוצרו ${successCount} שיעורים מחזוריים בהצלחה!`); // הודעת הצלחה
        } else {
          setMessage("❌ שגיאה ביצירת שיעורים מחזוריים"); // הודעת שגיאה
        }
      } else {
        // בדיקה האם מדובר בעריכה או ביצירה
        if (editingClassId) {
          // עדכון שיעור קיים
          await updateDoc(doc(db, "classes", editingClassId), classData);
          setMessage("✔️ שיעור עודכן בהצלחה!"); // הודעת הצלחה
        } else {
          // יצירת שיעור חדש
          await addDoc(collection(db, "classes"), classData);
          setMessage("✔️ שיעור נוסף בהצלחה!"); // הודעת הצלחה
        }
      }

      clearForm(); // איפוס הטופס
      fetchClasses(); // רענון רשימת השיעורים
      
      // סגירת המודל אם צוין שיש לסגור אחרי שמירה
      if (closeAfterSave) {
        setIsModalOpen(false);
      }
    } catch (error) {
      // טיפול בשגיאות
      console.error("❌ שגיאה בשמירת השיעור:", error);
      setMessage("❌ שגיאה בשמירת השיעור, נסה שוב"); // הודעת שגיאה
    }

    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // פונקציה להצגת חלון אישור מחיקת שיעור
  const confirmDeleteClass = (classId) => {
    setDeleteClassId(classId); // הגדרת מזהה השיעור למחיקה
    setShowDeleteConfirm(true); // הצגת חלון אישור המחיקה
  };

  // פונקציה למחיקת שיעור
  const handleDeleteClass = async () => {
    if (!deleteClassId) return; // בדיקה שיש מזהה שיעור למחיקה

    setLoading(true); // הפעלת אינדיקטור טעינה

    try {
      // מחיקת השיעור ממסד הנתונים
      await deleteDoc(doc(db, "classes", deleteClassId));
      setMessage("✔️ שיעור נמחק בהצלחה!"); // הודעת הצלחה
      fetchClasses(); // רענון רשימת השיעורים
    } catch (error) {
      // טיפול בשגיאות
      console.error("❌ שגיאה במחיקת השיעור:", error);
      setMessage("❌ שגיאה במחיקת השיעור, נסה שוב"); // הודעת שגיאה
    }

    setShowDeleteConfirm(false); // סגירת חלון אישור המחיקה
    setDeleteClassId(null); // איפוס מזהה השיעור למחיקה
    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // ========== פונקציה לטיפול בבחירת ימים בשבוע ==========
  // פונקציה לטיפול בשינוי בחירת יום בשבוע
  const handleDayToggle = (dayIndex) => {
    if (selectedDays.includes(dayIndex)) {
      // אם היום כבר נבחר - מסיר אותו
      setSelectedDays(selectedDays.filter(day => day !== dayIndex));
    } else {
      // אם היום לא נבחר - מוסיף אותו
      setSelectedDays([...selectedDays, dayIndex]);
    }
  };

  // ========== רינדור ממשק המשתמש ==========
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">ניהול שיעורים</h1>
      
      {/* כפתור להוספת שיעור חדש */}
      <button
        onClick={() => {
          clearForm(); // איפוס הטופס לפני פתיחתו
          setIsModalOpen(true); // פתיחת המודל
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        + הוסף שיעור חדש
      </button>
      
      {/* הודעת מערכת */}
      {message && <div className="my-2 text-blue-500">{message}</div>}
      
      {/* אינדיקטור טעינה */}
      {loading && <p className="text-gray-500">טוען...</p>}
      
      {/* רשימת השיעורים */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white shadow rounded p-4 relative">
            <h2 className="text-lg font-bold">{cls.name}</h2>
            <p>תאריך: {cls.date}</p>
            <p>שעה: {cls.time}</p>
            <p>מדריך: {cls.instructor}</p>
            <p>מקומות: {cls.spots}</p>
            
            {/* כפתורי עריכה ומחיקה */}
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => openModalForEdit(cls)}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded"
              >
                ערוך
              </button>
              <button
                onClick={() => confirmDeleteClass(cls.id)}
                className="bg-red-100 text-red-600 px-3 py-1 rounded"
              >
                מחק
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* מודל להוספה/עריכת שיעור */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] flex flex-col">
            <h2 className="text-xl font-bold mb-4">
              {editingClassId ? "עריכת שיעור" : "הוספת שיעור חדש"}
            </h2>
            
            {/* טופס להוספה/עריכת שיעור עם גלילה */}
            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
              {/* שם השיעור */}
              <div>
                <label className="block mb-1">שם השיעור:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              
              {/* תאריך השיעור */}
              <div>
                <label className="block mb-1">תאריך:</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full border p-2 rounded"
                  placeholderText="בחר תאריך"
                />
              </div>
              
              {/* שעת השיעור */}
              <div>
                <label className="block mb-1">שעה:</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              
              {/* מספר מקומות */}
              <div>
                <label className="block mb-1">מקומות:</label>
                <input
                  type="number"
                  min="1"
                  value={spots}
                  onChange={(e) => setSpots(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
              
              {/* בחירת מדריך */}
              <div>
                <label className="block mb-1">מדריך:</label>
                <select
                  value={instructorId}
                  onChange={(e) => setInstructorId(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">בחר מדריך</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* אפשרות לשיעור מחזורי - רק ביצירת שיעור חדש */}
              {!editingClassId && (
                <div className="border-t pt-3">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="isRecurring"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="isRecurring" className="font-bold">שיעור מחזורי</label>
                  </div>
                  
                  {/* אפשרויות שיעור מחזורי */}
                  {isRecurring && (
                    <div className="bg-gray-50 p-3 rounded space-y-3">
                      {/* בחירת ימים בשבוע */}
                      <div>
                        <label className="block mb-2 font-medium">בחר ימים בשבוע:</label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { index: 0, name: "ראשון" },
                            { index: 1, name: "שני" },
                            { index: 2, name: "שלישי" },
                            { index: 3, name: "רביעי" },
                            { index: 4, name: "חמישי" },
                            { index: 5, name: "שישי" },
                            { index: 6, name: "שבת" },
                          ].map((day) => (
                            <label key={day.index} className="flex items-center bg-white px-2 py-1 rounded border">
                              <input
                                type="checkbox"
                                checked={selectedDays.includes(day.index)}
                                onChange={() => handleDayToggle(day.index)}
                                className="mr-1"
                              />
                              <span>{day.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* תאריך סיום המחזוריות */}
                      <div>
                        <label className="block mb-1">תאריך סיום:</label>
                        <DatePicker
                          selected={recurrenceEndDate}
                          onChange={(date) => setRecurrenceEndDate(date)}
                          dateFormat="dd/MM/yyyy"
                          className="w-full border p-2 rounded"
                          placeholderText="בחר תאריך סיום"
                          minDate={date} // לא ניתן לבחור תאריך לפני תאריך ההתחלה
                        />
                      </div>
                      
                      {/* הסבר למשתמש */}
                      <p className="text-sm text-gray-500">
                        יצירת שיעור מחזורי תוסיף שיעורים נפרדים בימים הנבחרים בין תאריך ההתחלה לסיום.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* הודעת מערכת */}
              {message && <div className="text-blue-500 my-2">{message}</div>}
            </div>
            
            {/* כפתורי פעולה - קבועים בתחתית המודל */}
            <div className="flex justify-between mt-6 pt-4 border-t sticky bottom-0 bg-white">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                ביטול
              </button>
              <button
                onClick={() => handleSaveClass(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "שומר..." : isRecurring && !editingClassId ? "צור שיעורים מחזוריים" : "שמור"}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* חלון אישור מחיקה */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">אישור מחיקה</h2>
            <p>האם אתה בטוח שברצונך למחוק את השיעור?</p>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                ביטול
              </button>
              <button
                onClick={handleDeleteClass}
                className="bg-red-600 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "מוחק..." : "מחק"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClassesPanel;
