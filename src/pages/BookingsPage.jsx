import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const BookingsPage = ({ employee }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where('userId', '==', employee.phone));
      const querySnapshot = await getDocs(q);

      const bookingsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setBookings(bookingsList);
    } catch (error) {
      console.error('❌ שגיאה בטעינת ההזמנות:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      setMessage('ההזמנה בוטלה בהצלחה');
      fetchBookings();
    } catch (error) {
      console.error('❌ שגיאה בביטול ההזמנה:', error);
      setMessage('שגיאה בביטול ההזמנה');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>טוען הזמנות...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ההזמנות שלי</h1>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      {bookings.length === 0 ? (
        <p className="text-muted">אין לך הזמנות פעילות כרגע.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="bg-white shadow p-4 rounded relative">
              <h2 className="text-lg font-bold mb-2">{booking.className}</h2>
              <p>מדריך: {booking.instructor}</p>
              <p>תאריך: {booking.date}</p>
              <p>שעה: {booking.time}</p>

              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                בטל הזמנה
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingsPage;
