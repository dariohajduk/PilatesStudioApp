import React, { useState } from 'react';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const EmployeeLogin = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    try {
      // גישה למסמך בתוך הקולקשן Users
      const employeeRef = doc(db, 'Users', phone);
      const docSnap = await getDoc(employeeRef);

      if (!docSnap.exists()) {
        setError('מספר לא קיים במערכת. פנה למנהל.');
        return;
      }

      const employeeData = docSnap.data();

      // קובע את role לפי isAdmin
      const role = employeeData.isAdmin ? 'מנהל' : 'עובד';

      // שמירת הנתונים ב-localStorage
      localStorage.setItem('employeePhone', employeeData.phone);
      localStorage.setItem('employeeRole', role);

      // עדכון הסטייט באפליקציה הראשית
      onLogin({
        phone: employeeData.phone,
        role: role,
      });

      console.log(`✅ התחברות ${role}:`, employeeData);
    } catch (error) {
      console.error('❌ שגיאה בהתחברות:', error);
      setError('שגיאה בהתחברות');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">התחברות למערכת</h1>

      <input
        type="tel"
        placeholder="מספר טלפון (ללא +972)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full max-w-xs p-2 mb-3 border rounded text-black"
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        התחבר
      </button>
    </div>
  );
};

export default EmployeeLogin;
