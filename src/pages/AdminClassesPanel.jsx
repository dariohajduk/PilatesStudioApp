import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
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

  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'classes'));
      const classesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classesData);
    } catch (error) {
      console.error('❌ שגיאה בטעינת השיעורים:', error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Instructors'));
      const instructorsData = querySnapshot.docs.map(doc => ({
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

  const handleAddClass = async () => {
    const { name, instructor, date, time, spots } = newClass;

    if (!name || !instructor || !date || !time || spots <= 0) {
      setMessage('נא למלא את כל השדות');
      return;
    }

    try {
      await addDoc(collection(db, 'classes'), {
        name,
        instructor,
        date,
        time,
        spots: parseInt(spots),
        createdAt: new Date(),
      });

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

  const handleDeleteClass = async (id) => {
    try {
      await deleteDoc(doc(db, 'classes', id));
      setMessage('🗑️ שיעור נמחק');
      fetchClasses();
    } catch (error) {
      console.error('❌ שגיאה במחיקת שיעור:', error);
      setMessage('שגיאה במחיקה');
    }
  };

  if (employee?.role !== 'מנהל') {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלי מערכת.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ניהול שיעורים</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="שם השיעור"
          value={newClass.name}
          onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        <select
          value={newClass.instructor}
          onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })}
          className="block w-full p-2 mb-3 border rounded text-black"
        >
          <option value="">בחר מדריך</option>
          {instructors.map(instr => (
            <option key={instr.id} value={instr.name}>{instr.name}</option>
          ))}
        </select>

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

        <input
          type="time"
          value={newClass.time}
          onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        <input
          type="number"
          placeholder="כמות מקומות פנויים"
          value={newClass.spots}
          onChange={(e) => setNewClass({ ...newClass, spots: e.target.value })}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        <button
          onClick={handleAddClass}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          הוסף שיעור
        </button>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>

      <h2 className="text-lg font-bold mb-2">רשימת שיעורים</h2>
      <ul>
        {classes.map(cls => (
          <li key={cls.id} className="flex justify-between items-center p-2 border-b">
            <div>
              <p><strong>{cls.name}</strong> עם {cls.instructor}</p>
              <p>{cls.date} בשעה {cls.time} | מקומות פנויים: {cls.spots}</p>
            </div>
            <button
              onClick={() => handleDeleteClass(cls.id)}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
            >
              מחק
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminClassesPanel;
