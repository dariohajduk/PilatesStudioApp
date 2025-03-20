import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

const AdminPanel = ({ employee }) => {
  const [employees, setEmployees] = useState([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // טוען את רשימת העובדים מה-DB
  const fetchEmployees = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const employeesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployees(employeesData);
    } catch (error) {
      console.error('❌ שגיאה בטעינת העובדים:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // הוספת עובד חדש
  const handleAddEmployee = async () => {
    if (!phone || !name) {
      setMessage('נא להזין שם ומספר טלפון');
      return;
    }

    try {
      const employeeRef = doc(db, 'employees', phone);
      await setDoc(employeeRef, {
        name,
        phone,
        role: 'עובד',
        createdAt: new Date(),
      });

      setMessage('✔️ עובד נוסף בהצלחה!');
      setPhone('');
      setName('');
      fetchEmployees();
    } catch (error) {
      console.error('❌ שגיאה בהוספת עובד:', error);
      setMessage('שגיאה בהוספת עובד');
    }
  };

  // מחיקת עובד
  const handleDeleteEmployee = async (phone) => {
    try {
      await deleteDoc(doc(db, 'employees', phone));
      setMessage('🗑️ עובד נמחק');
      fetchEmployees();
    } catch (error) {
      console.error('❌ שגיאה במחיקת עובד:', error);
      setMessage('שגיאה במחיקה');
    }
  };

  // בודקים אם המשתמש מנהל
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
      <h1 className="text-2xl font-bold mb-6">פאנל ניהול עובדים</h1>

      {/* טופס הוספת עובד */}
      <div className="mb-6">
        <input
          type="tel"
          placeholder="מספר טלפון (+972...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        <input
          type="text"
          placeholder="שם העובד"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 mb-3 border rounded text-black"
        />

        <button
          onClick={handleAddEmployee}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          הוסף עובד
        </button>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>

      {/* רשימת עובדים */}
      <div>
        <h2 className="text-lg font-bold mb-2">רשימת עובדים</h2>
        <ul>
          {employees.map(emp => (
            <li key={emp.phone} className="flex justify-between items-center p-2 border-b">
              <span>{emp.name} ({emp.phone})</span>
              <button
                onClick={() => handleDeleteEmployee(emp.phone)}
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

export default AdminPanel;
