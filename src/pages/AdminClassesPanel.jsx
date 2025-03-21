import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const AdminClassesPanel = ({ employee }) => {
  const [classes, setClasses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [newClass, setNewClass] = useState({
    name: '',
    instructor: '',
    date: '',
    time: '',
    spots: 0,
  });
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // טוען את כל השיעורים
  const fetchClasses = async () => {
    try {
      let classesQuery;

      if (employee?.role === 'מנהל') {
        classesQuery = collection(db, 'classes');
      } else if (employee?.role === 'מדריך') {
        classesQuery = query(
          collection(db, 'classes'),
          where('instructorId', '==', employee.phone)
        );
      } else {
        setClasses([]);
        return;
      }

      const querySnapshot = await getDocs(classesQuery);
      const classesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setClasses(classesData);
    } catch (error) {
      console.error('❌ שגיאה בטעינת השיעורים:', error);
    }
  };

  // טוען את רשימת המדריכים
  const fetchInstructors = async () => {
    if (employee?.role !== 'מנהל') return;

    try {
      const querySnapshot = await getDocs(collection(db, 'Instructors'));
      const instructorsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInstructors(instructorsData);
    } catch (error) {
      console.error('❌ שגיאה בטעינת המדריכים:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchInstructors();
  }, []);

  // הוספת שיעור חדש
  const handleAddClass = async () => {
    const { name, instructor, date, time, spots } = newClass;

    if (!name || !date || !time || spots <= 0) {
      setMessage('נא למלא את כל השדות');
      return;
    }

    try {
      const instructorName =
        employee.role === 'מנהל'
          ? instructor
          : employee.name || employee.phone;

      const classToAdd = {
        name,
        instructor: instructorName,
        instructorId: employee.phone,
        date,
        time,
        spots: parseInt(spots),
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'classes'), classToAdd);

      setMessage('✔️ שיעור נוסף בהצלחה!');
      setNewClass({
        name: '',
        instructor: '',
        date: '',
        time: '',
        spots: 0,
      });
      setSelectedDate(null);
      fetchClasses();
    } catch (error) {
      console.error('❌ שגיאה בהוספת שיעור:', error);
      setMessage('שגיאה בהוספת שיעור');
    }
  };

  // מחיקת שיעור
  const handleDeleteClass = async (id, instructorId) => {
    if (employee.role !== 'מנהל' && instructorId !== employee.phone) {
      setMessage('אין לך הרשאות למחוק שיעור זה');
      return;
    }

    try {
      await deleteDoc(doc(db, 'classes', id));
      setMessage('🗑️ שיעור נמחק');
      fetchClasses();
    } catch (error) {
      console.error('❌ שגיאה במחיקת שיעור:', error);
      setMessage('שגיאה במחיקה');
    }
  };

  if (!employee || (employee.role !== 'מנהל' && employee.role !== 'מדריך')) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלים ומדריכים.</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        {employee.role === 'מנהל' ? 'ניהול כל השיעורים' : 'ניהול השיעורים שלי'}
      </h1>

      {/* טופס הוספת שיעור */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">הוספת שיעור חדש</h2>

        <input
          type="text"
          placeholder="שם השיעור"
          value={newClass.name}
          onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        {/* בחירת מדריך */}
        {employee.role === 'מנהל' ? (
          <select
            value={newClass.instructor}
            onChange={(e) =>
              setNewClass({ ...newClass, instructor: e.target.value })
            }
            className="block w-full p-2 mb-3 border rounded text-black"
          >
            <option value="">בחר מדריך</option>
            {instructors.map((instr) => (
              <option key={instr.id} value={instr.name}>
                {instr.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={employee.name || employee.phone}
            disabled
            className="block w-full p-2 mb-3 border rounded bg-gray-200 text-black"
          />
        )}

        {/* בחירת תאריך */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setNewClass({ ...newClass, date: format(date, 'dd/MM/yyyy') });
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText="בחר תאריך"
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        {/* בחירת שעה */}
        <input
          type="time"
          value={newClass.time}
          onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        {/* כמות מקומות */}
        <input
          type="number"
          placeholder="כמות מקומות פנויים"
          value={newClass.spots}
          onChange={(e) => setNewClass({ ...newClass, spots: e.target.value })}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        {/* כפתור הוספה */}
        <button
          onClick={handleAddClass}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          הוסף שיעור
        </button>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>

      {/* רשימת שיעורים */}
      <h2 className="text-lg font-bold mb-4">רשימת שיעורים</h2>

      <ul className="space-y-2">
        {classes.map((cls) => (
          <li
            key={cls.id}
            className="flex justify-between items-center p-4 bg-white shadow rounded"
          >
            <div>
              <p className="font-semibold">
                {cls.name} עם {cls.instructor}
              </p>
              <p className="text-sm text-gray-600">
                {cls.date} בשעה {cls.time} | מקומות פנויים: {cls.spots}
              </p>
            </div>

            {/* כפתור מחיקה - רק למנהל או למדריך שהוסיף */}
            {(employee.role === 'מנהל' || cls.instructorId === employee.phone) && (
              <button
                onClick={() => handleDeleteClass(cls.id, cls.instructorId)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                מחק
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminClassesPanel;
