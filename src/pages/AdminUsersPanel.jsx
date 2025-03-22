import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
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

  // שליפת כל המשתמשים (לא מדריכים ולא מנהלים)
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

  // הוספה/עדכון של משתמש
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

  // ניקוי טופס
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
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש?')) return;

    try {
      await deleteDoc(doc(db, 'Users', userId));
      setMessage('🗑️ משתמש נמחק');
      fetchUsers();
    } catch (error) {
      console.error('❌ שגיאה במחיקת משתמש:', error);
      setMessage('שגיאה במחיקה');
    }
  };

  // גישה למנהלים בלבד
  if (employee?.isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלים.</p>
      </div>
    );
  }

  // סינון חיפוש
  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  return (
    <div className="p-6 pt-28 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">ניהול משתמשים (לקוחות)</h1>

      {/* טופס הוספה/עריכה */}
      <div className="mb-10 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">{editingUserId ? 'עריכת משתמש' : 'הוספת משתמש חדש'}</h2>

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

          <select
            value={membershipType}
            onChange={(e) => {
              setMembershipType(e.target.value);

              if (e.target.value === 'כרטיסייה') setRemainingLessons(10);
              if (e.target.value === 'שבועי') setRemainingLessons(3);
              if (e.target.value === 'חודשי') setRemainingLessons(12);
            }}
            className="block w-full p-3 border rounded-lg text-black"
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
            className="block w-full p-3 border rounded-lg text-black"
          />
        </div>

        <button
          onClick={handleSaveUser}
          className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          {editingUserId ? 'עדכן משתמש' : 'הוסף משתמש'}
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>

      {/* שדה חיפוש */}
      <input
        type="text"
        placeholder="חפש לפי שם או טלפון"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full p-3 mb-6 border rounded-lg text-black"
      />

      {/* רשימת משתמשים */}
      <div>
        <h2 className="text-lg font-semibold mb-4">רשימת משתמשים</h2>

        <div className="grid gap-4">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row md:justify-between items-center hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col text-right">
                <h3 className="text-lg font-bold text-blue-700">{user.name}</h3>
                <p className="text-sm text-gray-600">טלפון: {user.phone}</p>
                <p className="text-sm text-gray-600">
                  מנוי: <span className="font-semibold">{user.membershipType}</span> | שיעורים: {user.remainingLessons}
                </p>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow text-sm transition-transform transform hover:scale-105"
                >
                  ערוך
                </button>

                <button
                  onClick={() => handleDeleteUser(user.id)}
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

export default AdminUsersPanel;
