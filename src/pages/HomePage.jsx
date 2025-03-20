import React, { useState, useEffect } from 'react';
import TopHeader from '../components/TopHeader';
import ClassCard from '../components/ClassCard';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

// ייבוא Framer Motion
import { motion } from 'framer-motion';

const HomePage = () => {
  // סטייט לשיעורים הקרובים
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // שליפת השיעורים מה-DB
  const fetchClasses = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'classes'));
      const classesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('🎯 שיעורים נטענו ל-HomePage:', classesData);
      setUpcomingClasses(classesData);
    } catch (error) {
      console.error('❌ שגיאה בטעינת שיעורים:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>טוען שיעורים...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <TopHeader title="ברוכים הבאים לסטודיו רוטשילד" />

      <div className="mt-4">
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="font-medium mb-2">המלצת היום:</p>
          {/* מציג את ההמלצה מהשיעור הראשון אם יש */}
          {upcomingClasses.length > 0 ? (
            <p>
              שיעור {upcomingClasses[0].name} עם {upcomingClasses[0].instructor} ב-{upcomingClasses[0].time}! מומלץ במיוחד למתחילים.
            </p>
          ) : (
            <p>אין שיעורים זמינים להמלצה כרגע.</p>
          )}
        </div>

        <h2 className="text-lg font-bold mb-3">שיעורים קרובים</h2>

        {upcomingClasses.length === 0 ? (
          <p className="text-gray-500">לא נמצאו שיעורים קרובים.</p>
        ) : (
          upcomingClasses.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ClassCard classInfo={cls} isBooking={false} />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default HomePage;
