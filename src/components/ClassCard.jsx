import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
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
} from 'firebase/firestore';

const ClassCard = ({
  classInfo,
  employee,
  isAlreadyBooked,
  refreshBookings,
  isPastClass,
}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [totalSpots, setTotalSpots] = useState(0);

  useEffect(() => {
    const calcRegistered = async () => {
      try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where('classId', '==', classInfo.id));
        const querySnapshot = await getDocs(q);

        const registered = querySnapshot.docs.length;
        const spotsLeft = classInfo.spots;

        setRegisteredCount(registered);
        setTotalSpots(registered + spotsLeft);
      } catch (error) {
        console.error('❌ שגיאה בחישוב רשומים:', error);
      }
    };

    calcRegistered();
  }, [classInfo]);

  const handleBooking = async () => {
    if (!employee) {
      setMessage('❗ עליך להתחבר כדי להזמין מקום');
      return;
    }

    if (isAlreadyBooked) {
      setMessage('❗ כבר נרשמת לשיעור הזה');
      return;
    }

    if (isPastClass) {
      setMessage('❗ לא ניתן להירשם לשיעור שהסתיים');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const classRef = doc(db, 'classes', classInfo.id);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      if (!currentClass || currentClass.spots <= 0) {
        setMessage('❗ אין יותר מקומות פנויים');
        setLoading(false);
        return;
      }

      await addDoc(collection(db, 'bookings'), {
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

      setMessage('✔️ נרשמת בהצלחה!');
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error('❌ שגיאה בהרשמה:', error);
      setMessage('❌ שגיאה בהרשמה. נסה שוב');
    }

    setLoading(false);
  };

  const handleCancelBooking = async () => {
    if (!employee) return;

    setLoading(true);

    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('userId', '==', employee.phone),
        where('classId', '==', classInfo.id)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage('❗ לא נמצאה שיעור לביטול');
        setLoading(false);
        return;
      }

      const bookingDoc = querySnapshot.docs[0];
      await deleteDoc(doc(db, 'bookings', bookingDoc.id));

      const classRef = doc(db, 'classes', classInfo.id);
      const classSnap = await getDoc(classRef);
      const currentClass = classSnap.data();

      await updateDoc(classRef, {
        spots: currentClass.spots + 1,
      });

      setMessage('✔️ השיעור בוטל בהצלחה');
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error('❌ שגיאה בביטול השיעור:', error);
      setMessage('❌ שגיאה בביטול השיעור');
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
            message.includes('✔️') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}

      {!employee && (
        <p className="text-red-400 mt-2">🔒 התחברות נדרשת להירשום לשיעור</p>
      )}

      {employee && !isAlreadyBooked && !isPastClass && (
        <button
          onClick={handleBooking}
          disabled={classInfo.spots <= 0 || loading}
          className={`mt-3 px-4 py-2 rounded transition-all duration-200 w-full ${
            classInfo.spots > 0
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-400 cursor-not-allowed text-white'
          } ${loading ? 'opacity-50' : ''}`}
        >
          {loading
            ? 'שולח בקשה...'
            : classInfo.spots > 0
            ? 'הזמן מקום'
            : 'אין מקומות פנויים'}
        </button>
      )}

      {employee && isAlreadyBooked && (
        <button
          onClick={handleCancelBooking}
          disabled={loading}
          className="mt-3 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white w-full"
        >
          {loading ? 'מבטל...' : 'בטל שיעור'}
        </button>
      )}

      {isPastClass && (
        <p className="text-gray-500 text-sm mt-2">🕒 השיעור הסתיים</p>
      )}
    </div>
  );
};

export default ClassCard;
