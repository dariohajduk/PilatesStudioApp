import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

// נתונים לדוגמה - שיעורים
const upcomingClasses = [
  {
    name: 'פילאטיס מכשירים',
    instructor: 'מיכל',
    time: '09:00',
    date: '14/03/2025',
    spots: 3,
  },
  {
    name: 'פילאטיס מזרן',
    instructor: 'דנה',
    time: '17:30',
    date: '14/03/2025',
    spots: 5,
  },
  {
    name: 'פילאטיס מכשירים',
    instructor: 'רותי',
    time: '10:15',
    date: '15/03/2025',
    spots: 2,
  },
];

// נתונים לדוגמה - הזמנות
const myBookings = [
  {
    userId: 'user123',
    name: 'פילאטיס מזרן',
    instructor: 'דנה',
    time: '17:30',
    date: '21/03/2025',
  },
  {
    userId: 'user123',
    name: 'פילאטיס מכשירים',
    instructor: 'מיכל',
    time: '09:00',
    date: '28/03/2025',
  },
];

// פונקציה להעלאת השיעורים ל-Collection בשם "classes"
const uploadClasses = async () => {
  try {
    const classesCollection = collection(db, 'classes');
    for (let cls of upcomingClasses) {
      await addDoc(classesCollection, cls);
      console.log(`✅ שיעור "${cls.name}" נוסף בהצלחה`);
    }
  } catch (error) {
    console.error('❌ שגיאה בהעלאת שיעורים:', error);
  }
};

// פונקציה להעלאת ההזמנות ל-Collection בשם "bookings"
const uploadBookings = async () => {
  try {
    const bookingsCollection = collection(db, 'bookings');
    for (let booking of myBookings) {
      await addDoc(bookingsCollection, booking);
      console.log(`✅ הזמנה לשיעור "${booking.name}" נוספה בהצלחה`);
    }
  } catch (error) {
    console.error('❌ שגיאה בהעלאת הזמנות:', error);
  }
};

// קריאה לפונקציות (מריץ את הכל)
const runUpload = async () => {
  await uploadClasses();
  await uploadBookings();
};

// מריץ בפועל
runUpload();
