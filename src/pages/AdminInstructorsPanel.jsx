import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

const AdminInstructorsPanel = ({ employee }) => {
  const [instructors, setInstructors] = useState([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const fetchInstructors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Instructors'));
      const instructorsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInstructors(instructorsData);
    } catch (error) {
      console.error('❌ שגיאה בטעינת המדריכים:', error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleAddInstructor = async () => {
    if (!phone || !name) {
      setMessage('נא להזין שם ומספר טלפון');
      return;
    }

    try {
      const instructorRef = doc(db, 'Instructors', phone);
      await setDoc(instructorRef, {
        id: phone,
        phone,
        name,
        createdAt: new Date().toISOString(),
      });

      // שמירה גם ב-Users
      const userRef = doc(db, 'Users', phone);
      await setDoc(userRef, {
        id: phone,
        phone,
        name,
        isInstructor: true,
        isAdmin: false,
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

  const handleDeleteInstructor = async (id) => {
    try {
      await deleteDoc(doc(db, 'Instructors', id));
      await deleteDoc(doc(db, 'Users', id)); // מוחק גם מה-Users
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
        <p>עמוד זה זמין רק למנהלי מערכת.</p>
      </div>
    );
  }

  const filteredInstructors = instructors.filter(instr =>
    instr.name.includes(search) || instr.phone.includes(search)
  );

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
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          הוסף מדריך
        </button>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>

      <input
        type="text"
        placeholder="חפש לפי שם או טלפון"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full p-2 mb-4 border rounded text-black"
      />

      <div>
        <h2 className="text-lg font-bold mb-2">רשימת מדריכים</h2>
        <ul>
          {filteredInstructors.map(instr => (
            <li key={instr.id} className="flex justify-between items-center p-2 border-b">
              <div>
                <p><strong>{instr.name}</strong> ({instr.phone})</p>
              </div>
              <button
                onClick={() => handleDeleteInstructor(instr.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
              >
                מחק
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminInstructorsPanel;
