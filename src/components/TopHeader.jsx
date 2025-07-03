import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const TopHeader = ({ title, userData, employee, allClasses }) => {
  const [weekly, setWeekly] = useState(0);
  const [last2Months, setLast2Months] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [instructorCount, setInstructorCount] = useState(0);

  const isInstructor = userData?.isInstructor === true;
  const isAdmin = userData?.isAdmin === true;

  useEffect(() => {
    if (!isInstructor || !employee || !allClasses || allClasses.length === 0) return;

    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startOf2MonthsAgo = new Date(now);
    startOf2MonthsAgo.setMonth(now.getMonth() - 2);
    startOf2MonthsAgo.setDate(1);
    startOf2MonthsAgo.setHours(0, 0, 0, 0);

    const weeklyCount = allClasses.filter((cls) => {
      if (cls.instructorName !== employee.name) return false;
      const clsDate = new Date(`${cls.date.split("/").reverse().join("-")}T${cls.time}`);
      return clsDate >= startOfWeek && clsDate <= endOfWeek;
    }).length;

    const last2MonthsCount = allClasses.filter((cls) => {
      if (cls.instructorName !== employee.name) return false;
      const clsDate = new Date(`${cls.date.split("/").reverse().join("-")}T${cls.time}`);
      return clsDate >= startOf2MonthsAgo && clsDate <= now;
    }).length;

    setWeekly(weeklyCount);
    setLast2Months(last2MonthsCount);
  }, [isInstructor, allClasses, employee]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "Users"));
        const users = usersSnap.docs.map((doc) => doc.data());

        const nonAdminUsers = users.filter((u) => u.isAdmin !== true);
        const instructors = nonAdminUsers.filter((u) => u.isInstructor === true);
        const regularUsers = nonAdminUsers.filter((u) => u.isInstructor !== true);

        setUserCount(regularUsers.length);
        setInstructorCount(instructors.length);
      } catch (error) {
        console.error("שגיאה בטעינת נתוני משתמשים:", error);
      }
    };

    if (isAdmin) {
      fetchUserStats();
    }
  }, [isAdmin]);

  return (
    <header className="bg-blue-600 text-white px-4 py-2 shadow-md flex justify-between items-center flex-wrap gap-2">
      <h1 className="text-xl font-bold">{title}</h1>

      {userData && isInstructor && (
        <div className="bg-white text-blue-600 font-semibold py-1 px-3 rounded-lg text-sm text-right">
          מדריך | {weekly} שיעורים השבוע | {last2Months} בחודשיים האחרונים
        </div>
      )}

      {userData && isAdmin && (
        <div className="bg-white text-blue-600 font-semibold py-1 px-3 rounded-lg text-sm text-right">
          מנהל | {userCount} לקוחות | {instructorCount} מדריכים
        </div>
      )}

      {userData && !isInstructor && !isAdmin && (
        <div className="bg-red-500 text-white font-semibold py-1 px-3 rounded-lg text-sm">
          נשארו לך {userData.remainingClasses || 0} מתוך {userData.totalClasses || 0} שיעורים
        </div>
      )}
    </header>
  );
};

export default TopHeader;
