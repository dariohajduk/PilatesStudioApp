import React, { useState } from 'react';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Logo from '../assets/logo.png'; // ייבוא הלוגו

const EmployeeLogin = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    try {
      const userRef = doc(db, 'Users', phone);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        setError('מספר לא קיים במערכת. פנה למנהל.');
        return;
      }

      const userData = docSnap.data();

      const role = userData.isAdmin
        ? 'מנהל'
        : userData.isInstructor
        ? 'מדריך'
        : 'משתמש';

      localStorage.setItem('employeePhone', userData.phone);
      localStorage.setItem('employeeRole', role);

      onLogin({
        phone: userData.phone,
        role: role,
      });

      console.log(`✅ התחברות ${role}:`, userData);
    } catch (error) {
      console.error('❌ שגיאה בהתחברות:', error);
      setError('שגיאה בהתחברות');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {/* רקע עם הלוגו */}
      <div className="absolute inset-0 opacity-10 flex justify-center items-center pointer-events-none z-0">
        <img
          src={Logo}
          alt="Logo Background"
          className="w-3/4 h-auto object-contain"
        />
      </div>

      {/* תוכן הטופס */}
      <div className="relative z-10 flex flex-col items-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">התחברות למערכת</h1>

        <input
          type="tel"
          placeholder="מספר טלפון (ללא קידומת +972)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-3 border rounded text-black"
        />

        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

        <button
          onClick={handleLogin}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          התחבר
        </button>
      </div>
    </div>
  );
};

export default EmployeeLogin;
