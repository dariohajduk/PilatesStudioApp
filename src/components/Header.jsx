import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';

const Header = ({ employee }) => {
  const [userData, setUserData] = useState(null);
  const [remainingLessons, setRemainingLessons] = useState(0);
  const [maxLessons, setMaxLessons] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  let unsubscribeFromBookings = null;

  useEffect(() => {
    if (!employee) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, 'Users', employee.phone);
        const userSnap = await getDoc(userRef, { source: 'server' });

        if (userSnap.exists()) {
          const user = userSnap.data();
          setUserData(user);
          setMaxLessons(user.remainingLessons);

          // מאזין להזמנות בלייב
          listenToBookings(user);
        }
      } catch (error) {
        console.error('❌ שגיאה בטעינת פרטי משתמש:', error);
      }

      setIsLoading(false);
    };

    fetchUserData();

    // ניקוי מאזין ב-unmount
    return () => {
      if (unsubscribeFromBookings) {
        unsubscribeFromBookings();
      }
    };
  }, [employee]);

  const listenToBookings = (user) => {
    if (!user) return;

    const bookingsRef = collection(db, 'bookings');
    const q = query(bookingsRef, where('userId', '==', employee.phone));

    unsubscribeFromBookings = onSnapshot(q, (snapshot) => {
      const allBookings = snapshot.docs.map(doc => doc.data());
      calculateRemainingLessons(user, allBookings);
    });
  };

  const calculateRemainingLessons = (user, allBookings) => {
    const today = new Date();
    const membershipType = user.membershipType;

    if (membershipType === 'שבועי') {
      const currentWeekBookings = allBookings.filter((b) => {
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

      const lessonsLeft = user.remainingLessons - currentWeekBookings.length;
      setRemainingLessons(lessonsLeft);
    }

    if (membershipType === 'חודשי') {
      const currentMonthBookings = allBookings.filter((b) => {
        const [day, month, year] = b.date.split('/');
        const bookingDate = new Date(`${year}-${month}-${day}`);

        return (
          bookingDate.getMonth() === today.getMonth() &&
          bookingDate.getFullYear() === today.getFullYear()
        );
      });

      const lessonsLeft = user.remainingLessons - currentMonthBookings.length;
      setRemainingLessons(lessonsLeft);
    }

    if (membershipType === 'כרטיסייה') {
      setRemainingLessons(user.remainingLessons);
    }
  };

  const getBadgeColor = () => {
    if (remainingLessons > (maxLessons * 0.5)) return 'bg-green-500';
    if (remainingLessons > 0) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!employee || !userData) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-l from-blue-600 to-blue-500 text-white shadow-md">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:justify-between items-center px-4 py-3">
        {isLoading ? (
          <div className="animate-pulse text-sm">טוען...</div>
        ) : (
          <>
            <div className="text-lg font-semibold flex items-center gap-2">
              👋 שלום, <span className="underline">{userData.name}</span>
            </div>

            <div className="mt-2 md:mt-0 flex items-center gap-2 text-sm">
              <div className="bg-white text-blue-600 px-2 py-1 rounded-lg shadow-sm">
                מנוי: {userData.membershipType}
              </div>
              <div className={`px-2 py-1 rounded-lg shadow-sm text-white ${getBadgeColor()}`}>
                נשארו לך {remainingLessons} מתוך {maxLessons} שיעורים
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
