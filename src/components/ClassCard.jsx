import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

const ClassCard = ({ classInfo, employee, isAlreadyBooked, refreshBookings }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    // אם אין עובד מחובר
    if (!employee) {
      setMessage('❗ עליך להתחבר כדי להזמין מקום');
      return;
    }

    // אם כבר רשום
    if (isAlreadyBooked) {
      setMessage('❗ כבר נרשמת לשיעור הזה');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // בדיקת כמות מקומות בזמן אמת
      const classRef = doc(db, 'classes', classInfo.id);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      if (!currentClass || currentClass.spots <= 0) {
        setMessage('❗ אין יותר מקומות פנויים');
        setLoading(false);
        return;
      }

      // הוספת הזמנה
      await addDoc(collection(db, 'bookings'), {
        userId: employee.phone,
        classId: classInfo.id,
        name: classInfo.name,
        instructor: classInfo.instructor,
        date: classInfo.date,
        time: classInfo.time,
        createdAt: new Date(),
      });

      // עדכון מקומות פנויים בשיעור
      await updateDoc(classRef, {
        spots: currentClass.spots - 1,
      });

      setMessage('✔️ נרשמת בהצלחה!');

      // רענון ההזמנות במסך הראשי כדי לשקף שהמשתמש רשום
      if (refreshBookings) {
        await refreshBookings();
      }
    } catch (error) {
      console.error('❌ שגיאה ברישום לשיעור:', error);
      setMessage('❌ שגיאה ברישום. נסה שוב');
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow relative mb-4">
      <h2 className="text-lg font-bold mb-2">{classInfo.name}</h2>
      <p>מדריך: {classInfo.instructor}</p>
      <p>תאריך: {classInfo.date}</p>
      <p>שעה: {classInfo.time}</p>
      <p>מקומות פנויים: {classInfo.spots}</p>

      {message && (
        <p className={`mt-2 ${message.includes('✔️') ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}

      {/* אם אין עובד מחובר */}
      {!employee && (
        <p className="text-red-400 mt-2">🔒 יש להתחבר כדי להזמין מקום</p>
      )}

      {/* אם כבר רשום */}
      {employee && isAlreadyBooked && (
        <p className="text-green-400 mt-2">כבר נרשמת לשיעור זה ✅</p>
      )}

      {/* כפתור הרשמה */}
      {employee && !isAlreadyBooked && (
        <button
          onClick={handleBooking}
          disabled={classInfo.spots <= 0 || loading}
          className={`mt-3 px-4 py-2 rounded transition-all duration-200 ${
            classInfo.spots > 0
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          } ${loading ? 'opacity-50' : ''}`}
        >
          {loading
            ? 'מבצע רישום...'
            : classInfo.spots > 0
            ? 'הזמן מקום'
            : 'אין מקומות פנויים'}
        </button>
      )}
    </div>
  );
};

export default ClassCard;
