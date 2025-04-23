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

import Logo from '../assets/logo.png'; // תוודא שהנתיב נכון

/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
/**
 * TODO: תאר את הפונקציה Header
 */
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

          listenToBookings(user);
        }
      } catch (error) {
        console.error('❌ שגיאה בטעינת פרטי משתמש:', error);
      }

      setIsLoading(false);
    };

    fetchUserData();

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

        {/* שורה עליונה - לוגו בעיגול לבן + שם משתמש + תפקיד */}
        <div className="w-full flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-full p-1 shadow-md">
              <img
                src={Logo}
                alt="Milan Pilates Logo"
                className="h-10 w-10 object-contain rounded-full"
              />
            </div>
            <h1 className="text-lg font-bold text-white">Milan Pilates</h1>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-sm">
              שלום,{" "}
              <span className="font-semibold underline">
                {userData.name}
              </span>{" "}
              👋
            </span>
            <span className="text-xs text-gray-200">{employee.role}</span>
          </div>
        </div>

        {/* שורה תחתונה - סוג מנוי + כמה שיעורים נשארו */}
        {isLoading ? (
          <div className="animate-pulse text-sm">טוען...</div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2 w-full">
            <div className="bg-white text-blue-600 px-3 py-1 rounded-lg shadow-sm text-sm font-semibold">
              מנוי: {userData.membershipType}
            </div>
            <div className={`px-3 py-1 rounded-lg shadow-sm text-white text-sm font-semibold ${getBadgeColor()}`}>
              נשארו לך {remainingLessons} מתוך {maxLessons} שיעורים
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
