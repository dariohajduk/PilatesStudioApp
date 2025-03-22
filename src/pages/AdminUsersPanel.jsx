import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';

const AdminUsersPanel = ({ employee }) => {
  const [users, setUsers] = useState([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [remainingLessons, setRemainingLessons] = useState(0);
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  // שלב ראשון: שליפת כל המשתמשים (לא מדריכים ומנהלים)
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      const usersData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => !user.isInstructor && !user.isAdmin);

      setUsers(usersData);
    } catch (error) {
      console.error('❌ שגיאה בטעינת המשתמשים:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // הוספת משתמש חדש או עדכון משתמש קיים
  const handleSaveUser = async () => {
    if (!phone || !name || !membershipType) {
      setMessage('נא למלא שם, טלפון וסוג מנוי');
      return;
    }

    try {
      const userRef = doc(db, 'Users', phone);

      await setDoc(userRef, {
        id: phone,
        phone,
        name,
        membershipType,
        remainingLessons: parseInt(remainingLessons, 10),
        completedLessons: 0,
        joinDate: new Date().toISOString(),
        isInstructor: false,
        isAdmin: false
      });

      setMessage(editingUserId ? '✔️ משתמש עודכן בהצלחה!' : '✔️ משתמש נוסף בהצלחה!');
      clearForm();
      fetchUsers();
    } catch (error) {
      console.error('❌ שגיאה בהוספת/עדכון משתמש:', error);
      setMessage('שגיאה בהוספת/עדכון משתמש');
    }
  };

  const clearForm = () => {
    setPhone('');
    setName('');
    setMembershipType('');
    setRemainingLessons(0);
    setEditingUserId(null);
  };

  // עריכת משתמש קיים
  const handleEditUser = (user) => {
    setPhone(user.phone);
    setName(user.name);
    setMembershipType(user.membershipType);
    setRemainingLessons(user.remainingLessons);
    setEditingUserId(user.id);
  };

  // מחיקת משתמש
  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'Users', userId));
      setMessage('🗑️ משתמש נמחק');
      fetchUsers();
    } catch (error) {
      console.error('❌ שגיאה במחיקת משתמש:', error);
      setMessage('שגיאה במחיקה');
    }
  };

  // בדיקת גישה למנהל בלבד
  if (employee?.role !== 'מנהל') {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלים.</p>
      </div>
    );
  }

  // חיפוש משתמשים
  const filteredUsers = users.filter(
    user => user.name.includes(search) || user.phone.includes(search)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ניהול משתמשים (לקוחות)</h1>

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
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border rounded text-black"
        />

        <select
          value={membershipType}
          onChange={(e) => {
            setMembershipType(e.target.value);

            // ברירת מחדל לכמות שיעורים
            if (e.target.value === 'כרטיסייה') setRemainingLessons(10);
            if (e.target.value === 'שבועי') setRemainingLessons(3);
            if (e.target.value === 'חודשי') setRemainingLessons(12);
          }}
          className="block w-full p-2 border rounded text-black"
        >
          <option value="">בחר סוג מנוי</option>
          <option value="חודשי">חודשי</option>
          <option value="שבועי">שבועי</option>
          <option value="כרטיסייה">כרטיסייה</option>
        </select>

        <input
          type="number"
          placeholder="כמות שיעורים זמינים"
          value={remainingLessons}
          onChange={(e) => setRemainingLessons(e.target.value)}
          className="block w-full p-2 border rounded text-black"
        />

        <button
          onClick={handleSaveUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingUserId ? 'עדכן משתמש' : 'הוסף משתמש'}
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
        <h2 className="text-lg font-bold mb-2">רשימת משתמשים</h2>
        <ul>
          {filteredUsers.map(user => (
            <li
              key={user.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <p><strong>{user.name}</strong> ({user.phone})</p>
                <p>מנוי: {user.membershipType} | שיעורים זמינים: {user.remainingLessons}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                >
                  ערוך
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
                >
                  מחק
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminUsersPanel;
