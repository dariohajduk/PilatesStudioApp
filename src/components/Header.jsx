import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

const Header = ({ employee }) => {
  const [userData, setUserData] = useState(null);
  const [remainingLessons, setRemainingLessons] = useState(0);
  const [maxLessons, setMaxLessons] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!employee) return;

      setLoading(true);

      try {
        const userRef = doc(db, 'Users', employee.phone);
        const userSnap = await getDoc(userRef, { source: 'server' });

        if (userSnap.exists()) {
          const user = userSnap.data();
          setUserData(user);

          const bookingsRef = collection(db, 'bookings');
          const q = query(bookingsRef, where('userId', '==', employee.phone));
          const querySnapshot = await getDocs(q);
          const allBookings = querySnapshot.docs.map(doc => doc.data());

          const membershipType = user.membershipType;
          const maxLessons = user.remainingLessons;
          setMaxLessons(maxLessons);

          const today = new Date();

          if (membershipType === 'שבועי') {
            const currentWeekBookings = allBookings.filter(b => {
              const [day, month, year] = b.date.split('/');
              const bookingDate = new Date(`${year}-${month}-${day}`);

              const weekStart = new Date(today);
              weekStart.setDate(today.getDate() - today.getDay());
              weekStart.setHours(0, 0, 0, 0);

              const weekEnd = new Date(weekStart);
              weekEnd.setDate(weekStart.getDate() + 6);
              weekEnd.setHours(23, 59, 59, 999);

              return bookingDate >= weekStart && bookingDate <= weekEnd;
            });

            const lessonsLeft = maxLessons - currentWeekBookings.length;
            setRemainingLessons(lessonsLeft);
          }

          if (membershipType === 'חודשי') {
            const currentMonthBookings = allBookings.filter(b => {
              const [day, month, year] = b.date.split('/');
              const bookingDate = new Date(`${year}-${month}-${day}`);

              return (
                bookingDate.getMonth() === today.getMonth() &&
                bookingDate.getFullYear() === today.getFullYear()
              );
            });

            const lessonsLeft = maxLessons - currentMonthBookings.length;
            setRemainingLessons(lessonsLeft);
          }

          if (membershipType === 'כרטיסייה') {
            setRemainingLessons(user.remainingLessons);
          }
        }
      } catch (error) {
        console.error('❌ שגיאה בטעינת מידע משתמש:', error);
      }

      setLoading(false);
    };

    fetchUserInfo();
  }, [employee]);

  if (!employee || !userData) return null;

  const getBadgeColor = () => {
    if (remainingLessons > (maxLessons * 0.5)) return 'bg-green-500';
    if (remainingLessons > 0) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex justify-center bg-gradient-to-l from-blue-600 to-blue-500 text-white py-3 shadow-md">
      <div className="w-full max-w-4xl flex flex-col md:flex-row md:justify-between items-center px-4">
        <div className="text-lg font-semibold flex items-center gap-2">
          👋 שלום, <span className="underline">{userData.name}</span>
        </div>

        {loading ? (
          <div className="mt-2 md:mt-0 animate-pulse text-sm">טוען מידע...</div>
        ) : (
          <div className="mt-2 md:mt-0 flex items-center gap-2 text-sm">
            <div className="bg-white text-blue-600 px-2 py-1 rounded-lg shadow-sm">
              מנוי: {userData.membershipType}
            </div>
            <div className={`px-2 py-1 rounded-lg shadow-sm text-white ${getBadgeColor()}`}>
              נשארו לך {remainingLessons} מתוך {maxLessons} שיעורים
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
