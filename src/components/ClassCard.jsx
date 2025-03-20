import React, { useState } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

// נניח שאתה מעביר את classInfo ואת המשתמש הנוכחי (employee)
const ClassCard = ({ classInfo, employee }) => {
  const [message, setMessage] = useState('');

    const handleBooking = async () => {
      if (!employee) {
        setMessage('❗ עליך להתחבר כדי להזמין מקום');
        return;
      }
    
      try {
        const classRef = doc(db, 'classes', classInfo.id);
        const classSnap = await getDoc(classRef);
        const currentClass = classSnap.data();
    
        if (!currentClass || currentClass.spots <= 0) {
          setMessage('❗ אין יותר מקומות פנויים');
          return;
        }
    
        // מוסיף את ההזמנה ל-Collection 'bookings'
        await addDoc(collection(db, 'bookings'), {
          userId: employee.phone,
          classId: classInfo.id,
          name: classInfo.name,
          instructor: classInfo.instructor,
          date: classInfo.date,
          time: classInfo.time,
          createdAt: new Date(),
        });
    
        // מעדכן את כמות המקומות - מוריד מקום אחד
        await updateDoc(classRef, {
          spots: currentClass.spots - 1, // 👈 הקטנת הכמות ב-1
        });
    
        setMessage('✔️ נרשמת בהצלחה!');
    
      } catch (error) {
        console.error('❌ שגיאה ברישום לשיעור:', error);
        setMessage('❌ שגיאה ברישום. נסה שוב');
      }
    };
    

  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow relative mb-4">
      <h2 className="text-lg font-bold mb-2">{classInfo.name}</h2>
      <p>מדריך: {classInfo.instructor}</p>
      <p>תאריך: {classInfo.date}</p>
      <p>שעה: {classInfo.time}</p>
      <p>מקומות פנויים: {classInfo.spots}</p>

      {message && <p className="text-green-400 mt-2">{message}</p>}

      <button
        onClick={handleBooking}
        disabled={classInfo.spots <= 0}
        className={`mt-3 px-4 py-2 rounded ${
          classInfo.spots > 0
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {classInfo.spots > 0 ? 'הזמן מקום' : 'אין מקומות'}
      </button>
    </div>
  );
};

export default ClassCard;
