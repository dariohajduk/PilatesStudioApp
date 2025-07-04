const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const moment = require('moment-timezone'); // לניהול זמן אזורי

// אתחול Firebase Admin
initializeApp({
  credential: cert({
    projectId: 'your-project-id',
    clientEmail: 'your-client-email',
    privateKey: 'your-private-key'.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore();

// טווח שבוע הבא: מיום חמישי הבא ועד מוצאי שבת 23:00 (שעון ישראל)
function getNextWeekRange() {
  const now = moment().tz('Asia/Jerusalem');

  // יום חמישי הבא (4 = חמישי)
  let nextThursday = now.clone().day(4);
  if (now.day() >= 4) {
    // אם היום חמישי או אחרי, ניקח את חמישי הבא בשבוע הבא
    nextThursday.add(7, 'days');
  }
  nextThursday.startOf('day');

  // מוצאי שבת (שבת בערב) של אותו השבוע (6 = שבת)
  let nextSaturdayNight = nextThursday.clone().day(6).endOf('day'); // מוצאי שבת

  return {
    start: nextThursday.toDate(),
    end: nextSaturdayNight.toDate(),
  };
}

async function cancelLowAttendanceClasses() {
  const { start, end } = getNextWeekRange();

  console.log(`בודק שיעורים בין ${start} ל-${end}`);

  // שליפת כל השיעורים בין התאריכים
  const classesSnapshot = await db.collection('classes')
    .where('dateAsTimestamp', '>=', Timestamp.fromDate(start))
    .where('dateAsTimestamp', '<=', Timestamp.fromDate(end))
    .get();

  if (classesSnapshot.empty) {
    console.log('לא נמצאו שיעורים לטווח התאריכים');
    return;
  }

  for (const classDoc of classesSnapshot.docs) {
    const cls = classDoc.data();
    const classId = classDoc.id;

    // שליפת מספר המשתתפות לשיעור
    const bookingsSnapshot = await db.collection('bookings')
      .where('classId', '==', classId)
      .get();

    const numParticipants = bookingsSnapshot.size;
    console.log(`שיעור ${cls.name} (${classId}) עם ${numParticipants} משתתפות`);

    if (numParticipants < 3) {
      // ביטול השיעור
      await classDoc.ref.update({
        cancelled: true,
        cancelReason: 'חוסר מתאמנות (פחות מ-3 מתאמנות בשבוע הבא)',
        cancelledAt: FieldValue.serverTimestamp(),
      });
      console.log(`שיעור ${cls.name} בוטל`);

      // החזרת שיעורים למתאמנות (כל משתתפת תקבל +1 לשיעורים השבועיים שלה)
      for (const bookingDoc of bookingsSnapshot.docs) {
        const booking = bookingDoc.data();
        const userRef = db.collection('Users').doc(booking.userId);

        // עדכון שדה remainingLessons למתאמנת
        await userRef.update({
          remainingLessons: FieldValue.increment(1),
        });

        // מחיקת ההזמנה לשיעור זה
        await bookingDoc.ref.delete();
      }
    }
  }

  console.log('בדיקת ביטולי שיעורים הושלמה');
}

// להריץ את הפונקציה
cancelLowAttendanceClasses().catch(console.error);
