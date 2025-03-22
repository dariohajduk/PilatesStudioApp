import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc
} from 'firebase/firestore';

const AdminInstructorsPanel = ({ employee }) => {
  const [instructors, setInstructors] = useState([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [editingInstructorId, setEditingInstructorId] = useState(null);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  // שליפת כל המדריכים
  const fetchInstructors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      const instructorsData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.isInstructor);

      setInstructors(instructorsData);
    } catch (error) {
      console.error('❌ שגיאה בטעינת המדריכים:', error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  // הוספה/עדכון מדריך
  const handleSaveInstructor = async () => {
    if (!phone || !name) {
      setMessage('נא למלא שם ומספר טלפון');
      return;
    }

    try {
      const instructorRef = doc(db, 'Users', phone);

      await setDoc(instructorRef, {
        id: phone,
        phone,
        name,
        membershipType: '',
        remainingLessons: 0,
        completedLessons: 0,
        joinDate: new Date().toISOString(),
        isInstructor: true,
        isAdmin: false
      });

      setMessage(editingInstructorId ? '✔️ מדריך עודכן בהצלחה!' : '✔️ מדריך נוסף בהצלחה!');
      clearForm();
      fetchInstructors();
    } catch (error) {
      console.error('❌ שגיאה בהוספת/עדכון מדריך:', error);
      setMessage('שגיאה בהוספת/עדכון מדריך');
    }
  };

  const clearForm = () => {
    setPhone('');
    setName('');
    setEditingInstructorId(null);
  };

  const handleEditInstructor = (instructor) => {
    setPhone(instructor.phone);
    setName(instructor.name);
    setEditingInstructorId(instructor.id);
  };

  const handleDeleteInstructor = async (instructorId) => {
    if (!window.confirm('האם למחוק את המדריך?')) return;

    try {
      await deleteDoc(doc(db, 'Users', instructorId));
      setMessage('🗑️ מדריך נמחק');
      fetchInstructors();
    } catch (error) {
      console.error('❌ שגיאה במחיקת מדריך:', error);
      setMessage('שגיאה במחיקה');
    }
  };

  if (employee?.role !== 'מנהל') {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלים.</p>
      </div>
    );
  }

  const filteredInstructors = instructors.filter(
    instructor => instructor.name.includes(search) || instructor.phone.includes(search)
  );

  return (
    <div className="p-6 pt-28 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">ניהול מדריכים</h1>

      <div className="mb-10 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">{editingInstructorId ? 'עריכת מדריך' : 'הוספת מדריך חדש'}</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="tel"
            placeholder="מספר טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full p-3 border rounded-lg text-black"
          />

          <input
            type="text"
            placeholder="שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-3 border rounded-lg text-black"
          />
        </div>

        <button
          onClick={handleSaveInstructor}
          className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {editingInstructorId ? 'עדכן מדריך' : 'הוסף מדריך'}
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>

      <input
        type="text"
        placeholder="חפש לפי שם או טלפון"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full p-3 mb-6 border rounded-lg text-black"
      />

      <div>
        <h2 className="text-lg font-semibold mb-4">רשימת מדריכים</h2>

        <div className="grid gap-4">
          {filteredInstructors.map(instructor => (
            <div
              key={instructor.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row md:justify-between items-center hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col text-right">
                <h3 className="text-lg font-bold text-blue-700">{instructor.name}</h3>
                <p className="text-sm text-gray-600">טלפון: {instructor.phone}</p>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleEditInstructor(instructor)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow text-sm transition-transform transform hover:scale-105"
                >
                  ערוך
                </button>

                <button
                  onClick={() => handleDeleteInstructor(instructor.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow text-sm transition-transform transform hover:scale-105"
                >
                  מחק
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminInstructorsPanel;
