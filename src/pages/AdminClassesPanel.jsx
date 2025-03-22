import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';

const AdminClassesPanel = ({ employee }) => {
  const [classes, setClasses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [spots, setSpots] = useState(10);
  const [instructorId, setInstructorId] = useState('');

  const [editingClassId, setEditingClassId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchInstructors();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(query(collection(db, 'classes'), orderBy('date')));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClasses(data);
    } catch (error) {
      console.error('❌ שגיאה בטעינת השיעורים:', error);
    }
    setLoading(false);
  };

  const fetchInstructors = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'Users'), where('isInstructor', '==', true)));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInstructors(data);
    } catch (error) {
      console.error('❌ שגיאה בטעינת המדריכים:', error);
    }
  };

  const openModalForAdd = () => {
    clearForm();
    setIsModalOpen(true);
  };

  const openModalForEdit = (cls) => {
    setName(cls.name);
    setDate(formatDate(cls.date));
    setTime(cls.time);
    setSpots(cls.spots);
    setInstructorId(cls.instructorId);
    setEditingClassId(cls.id);
    setIsModalOpen(true);
  };

  const handleSaveClass = async (closeAfterSave = false) => {
    if (!name || !date || !time || !instructorId || spots < 1) {
      setMessage('אנא מלא את כל השדות הנדרשים');
      return;
    }

    setLoading(true);

    try {
      const instructor = instructors.find(i => i.id === instructorId);
      const classData = {
        name,
        date: formatDateDisplay(date),
        time,
        instructor: instructor?.name || '',
        instructorId,
        spots: parseInt(spots),
        createdAt: new Date().toISOString()
      };

      if (editingClassId) {
        const classRef = doc(db, 'classes', editingClassId);
        await updateDoc(classRef, classData);
        setMessage('✔️ שיעור עודכן בהצלחה!');
      } else {
        await addDoc(collection(db, 'classes'), classData);
        setMessage('✔️ שיעור נוסף בהצלחה!');
      }

      clearForm();
      fetchClasses();

      if (closeAfterSave) setIsModalOpen(false);
    } catch (error) {
      console.error('❌ שגיאה בהוספת/עדכון שיעור:', error);
      setMessage('שגיאה בהוספת/עדכון שיעור');
    }

    setLoading(false);
  };

  const handleDeleteClass = async (classId) => {
    if (!window.confirm('האם למחוק את השיעור?')) return;

    setLoading(true);

    try {
      await deleteDoc(doc(db, 'classes', classId));
      setMessage('🗑️ שיעור נמחק');
      fetchClasses();
    } catch (error) {
      console.error('❌ שגיאה במחיקת שיעור:', error);
      setMessage('שגיאה במחיקה');
    }

    setLoading(false);
  };

  const clearForm = () => {
    setName('');
    setDate('');
    setTime('');
    setSpots(10);
    setInstructorId('');
    setEditingClassId(null);
    setMessage('');
  };

  if (employee?.role !== 'מנהל' && employee?.role !== 'מדריך') {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלים ומדריכים.</p>
      </div>
    );
  }

  return (
    <div className="p-6 pt-28 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">ניהול שיעורים</h1>

      {/* כפתור להוספת שיעור */}
      <div className="flex justify-end mb-6">
        <button
          onClick={openModalForAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          + הוסף שיעור
        </button>
      </div>

      {/* רשימת שיעורים */}
      <h2 className="text-lg font-semibold mb-4">רשימת שיעורים</h2>

      {loading ? (
        <div className="text-center text-gray-500 mt-6">טוען שיעורים...</div>
      ) : (
        <div className="grid gap-4">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row md:justify-between items-center hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col text-right">
                <h3 className="text-lg font-bold text-blue-700">{cls.name}</h3>
                <p className="text-sm text-gray-600">
                  מדריך: {cls.instructor} | תאריך: {cls.date} | שעה: {cls.time} | מקומות פנויים: {cls.spots}
                </p>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => openModalForEdit(cls)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow text-sm transition-transform transform hover:scale-105"
                >
                  ערוך
                </button>

                <button
                  onClick={() => handleDeleteClass(cls.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow text-sm transition-transform transform hover:scale-105"
                >
                  מחק
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal - POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl relative">
            <h2 className="text-xl font-bold mb-4">
              {editingClassId ? 'ערוך שיעור' : 'הוסף שיעור'}
            </h2>

            <div className="grid gap-4">
              <input
                type="text"
                placeholder="שם השיעור"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full p-3 border rounded-lg text-black"
              />

              <input
                type="date"
                value={formatDate(date)}
                onChange={(e) => setDate(formatDateDisplay(e.target.value))}
                className="block w-full p-3 border rounded-lg text-black"
              />

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="block w-full p-3 border rounded-lg text-black"
              />

              <select
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value)}
                className="block w-full p-3 border rounded-lg text-black"
              >
                <option value="">בחר מדריך</option>
                {instructors.map((instr) => (
                  <option key={instr.id} value={instr.id}>
                    {instr.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min={1}
                value={spots}
                onChange={(e) => setSpots(e.target.value)}
                placeholder="כמות מקומות פנויים"
                className="block w-full p-3 border rounded-lg text-black"
              />
            </div>

            {message && <p className="text-green-600 mt-4">{message}</p>}

            {/* כפתורים לפעולה */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => handleSaveClass(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
              >
                {editingClassId ? 'עדכן' : 'הוסף'}
              </button>

              <button
                onClick={() => handleSaveClass(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
              >
                {editingClassId ? 'עדכן וסגור' : 'הוסף וסגור'}
              </button>

              <button
                onClick={() => { setIsModalOpen(false); clearForm(); }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// תאריך לפורמט yyyy-mm-dd
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('/');
  return `${year}-${month}-${day}`;
};

// תאריך לפורמט dd/mm/yyyy
const formatDateDisplay = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

export default AdminClassesPanel;
