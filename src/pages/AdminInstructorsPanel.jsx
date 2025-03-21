// ניהול מדריכים (מגיע במקום ניהול עובדים)
import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

const AdminInstructorsPanel = ({ employee }) => {
  const [instructors, setInstructors] = useState([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // טעינת כל המדריכים
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
    fetchInstructors();
  }, []);

  // הוספת מדריך חדש
  const handleAddInstructor = async () => {
    if (!phone || !name) {
      setMessage('נא להזין שם ומספר טלפון');
      return;
    }

    try {
      const instructorRef = doc(db, 'Instructors', phone);
      await setDoc(instructorRef, {
        id: phone,
        name,
        phone,
        createdAt: new Date().toISOString(),
      });

      setMessage('✔️ מדריך נוסף בהצלחה!');
      setPhone('');
      setName('');
      fetchInstructors();
    } catch (error) {
      console.error('❌ שגיאה בהוספת מדריך:', error);
      setMessage('שגיאה בהוספת מדריך');
    }
  };

  // מחיקת מדריך
  const handleDeleteInstructor = async (instructorId) => {
    try {
      await deleteDoc(doc(db, 'Instructors', instructorId));
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
        <h1 className="text-xl font-bold">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלים.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ניהול מדריכים</h1>

      <div className="mb-6 grid gap-3">
        <input
          type="tel"
          placeholder="מספר טלפון"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="block w-full p-2 border rounded text-black"
        />

        <input
          type="text"
          placeholder="שם המדריך"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border rounded text-black"
        />

        <button
          onClick={handleAddInstructor}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          הוסף מדריך
        </button>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>

      <h2 className="text-lg font-bold mb-2">רשימת מדריכים</h2>
      <ul>
        {instructors.map(instructor => (
          <li key={instructor.id} className="flex justify-between items-center p-2 border-b">
            <div>
              <p><strong>{instructor.name}</strong> ({instructor.phone})</p>
            </div>
            <button
              onClick={() => handleDeleteInstructor(instructor.id)}
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

export default AdminInstructorsPanel;
