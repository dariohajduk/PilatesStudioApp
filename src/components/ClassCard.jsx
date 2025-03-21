import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

const ClassCard = ({ classInfo, employee, isAlreadyBooked, refreshBookings, isPastClass, handleCancelBooking }) => {
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

  const classDateTime = new Date(`${classInfo.date.split('/').reverse().join('-')}T${classInfo.time}`);
  const now = new Date();
  const hoursDifference = (classDateTime - now) / (1000 * 60 * 60);

  return (
    <div className="bg-white shadow p-4 rounded relative">
      <h2 className="text-lg font-bold mb-2">{classInfo.name}</h2>
      <p>מדריך: {classInfo.instructor}</p>
      <p>תאריך: {classInfo.date}</p>
      <p>שעה: {classInfo.time}</p>

      {isPastClass ? (
        <p className="text-red-500">השיעור עבר</p>
      ) : (
        <>
          {isAlreadyBooked ? (
            <>
              {hoursDifference < 5 ? (
                <p className="text-red-500">לא ניתן לבטל</p>
              ) : (
                <button
                  onClick={() => handleCancelBooking(classInfo.id)}
                  className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  בטל הזמנה
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => handleBooking(classInfo.id)}
              className="absolute top-4 left-4 px-3 py-1 rounded text-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              הירשם
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ClassCard;
